do (ES = Elastic) ->
  class ES.Query
    constructor: (@model, fn) ->
      @musts = []
      @shoulds = []
      @filters = []
      @mustNots = []
      @sorts = []
      @booster = null
      @from = 0
      @size = 10
      fn(this) if fn

    must: (value) ->
      @musts.push(value)
      this

    should: (value) ->
      @shoulds.push(value)
      this

    filter: (value) ->
      @filters.push(value)
      this

    must_not: (value) ->
      @mustNots.push(value)
      this

    sort: (value) ->
      @sorts.push(value)
      this

    # { field: 'name', modifier: 'log1p', factor: 1 }
    boost: (opts) ->
      @booster = opts

    paginate: (opts) ->
      @size = parseInt(opts.per || 10, 10)
      @from = (parseInt(opts.page || 1, 10) - 1) * @size

    wrapInBoost: (query) ->
      if !@booster
        query: query
      else
        query:
          function_score:
            query: query
            field_value_factor: @booster

    toJSON: ->
      query = @wrapInBoost
        bool:
          must: @musts
          should: @shoulds
          filter: @filters
          must_not: @mustNots

      $.extend query,
        sort: @sorts
        from: @from
        size: @size
        _source: @model.storedFields
