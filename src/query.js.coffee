do (ES = Elastic) ->
  class ES.Query
    constructor: (@model, fn) ->
      @musts = []
      @filters = []
      @mustNots = []
      @sorts = []
      @from = 0
      @size = 10
      fn(this) if fn

    must: (value) ->
      @musts.push(value)
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

    paginate: (opts) ->
      @size = parseInt(opts.per || 10, 10)
      @from = (parseInt(opts.page || 1, 10) - 1) * @size

    toJSON: ->
      query:
        bool:
          must: @musts
          filter: @filters
          must_not: @mustNots
      sort: @sorts
      from: @from
      size: @size
      _source: @model.storedFields
