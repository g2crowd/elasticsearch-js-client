do ($ = jQuery, ES = Elastic) ->
  registered = {}

  class ES.DuplicateModelError extends Error
    constructor: (name) ->
      @message = "#{name} is already registered"

  class ES.Model
    @deserialize: (hits) ->
      $.extend(true, { id: hit['_id'] }, hit._source) for hit in hits

    constructor: (name, env, @attributes) ->
      @indexName = "#{name}_#{env}"
      @storedFields = (item.name for item in @selectAttribute('stored', true))
      @textFields = (item.name for item in @selectAttribute('type', 'text'))

    searchPath: ->
      "/#{@indexName}/_search"

    selectAttribute: (key, value) ->
      item for item in @attributes when item[key] == value

  class ES.Registry
    constructor: (@url, @userinfo, @env) ->
      @registered = {}

    register: (name, attributes) ->
      throw new ES.DuplicateModelError(name) if @registered[name]
      @registered[name] = new ES.Model(name, @env, attributes)

    get: (name) ->
      @registered[name]
