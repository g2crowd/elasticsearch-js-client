do (ES = Elastic, $ = jQuery) ->
  class ES.Client
    constructor: (@query, @opts = {}) ->
      @transport = @opts.transport || $

    send: (opts = {}) ->
      @transport.ajax
        url: @opts.url
        type: 'POST'
        data: JSON.stringify(@query.toJSON())
        dataType: 'json'
        headers:
          Authorization: 'Basic ' + btoa(@opts.userinfo)
        success: (data) ->
          return unless opts.success

          docs = data.hits.hits
          opts.success ES.Model.deserialize(docs), data
        error: opts.error
