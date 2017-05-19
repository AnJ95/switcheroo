window.app = window.app || {};
window.app.views = window.app.views || {};

window.app.mvr.View = window.app.mvr.Extendable.extend({

  /*
  Template method that should return the views specific html code that may or
  may not be dependent on the given model.
  Is called in renderInitial().
  */
  template : function (model) {
    return "If you see this, a view did not overwrite the template function";
  },


  /*
  List of every childView, is automatically filled.
  */
  children : {},


  /*
  This views parenting JQuery object.
  */
  $el : undefined,


  /*
  Reference to this Views model or undefined.
  */
  model : undefined,


  /*
  Setter for this Views model.
  */
  setModel : function(model) {
    this.model = model;
    return this;
  },

  /*
  Internally used storage for the renderStyle of this View.
  */
  renderStyle : "insert",

  /*
  Define how to render this View.
  insert (default):     the content of this View is inserted into $el
  replace:              the upmost element of the content replaces $el
  */
  setRenderStyle : function(renderStyle) {
    this.renderStyle = renderStyle;
    return this;
  },


  /*
  Defines which Model/Collection should be automatically fetched upon
  initialization given a name or undefined.
  */
  requireModel : undefined,


  /*
  List of to creating ChildViews. Each element of the array represents one View
  and can hold the following settings:
    viewClass:      The class of the view to be rendered
    selector:       The JQery selector to the element that should be the
                    ChildViews parenting element (=$el).
                    Must be existent in this Views DOM structure.
    renderStyle:    The renderStyle of the children, see setRenderStyle()
    model:          The instance of the Model/Collection for the ChildView
  */
  childViewDefinitions : [],

  clickRequests : [],


  /*
  Creates a new instance from a class.
  */
  new : function ($el) {
    // Use default new-method
    var instance = window.app.mvr.Extendable.new.call(this);

    instance.$el = $el;

    if (this.requireModel !== undefined) {
      // Get Model/Collection from ModelManager
      // Data will be asynchronously populated
      // Start listening to Models/Collections changes
      var model = window.app.ModelManager.require(instance.requireModel).attachObserver(instance);
    }

    return instance;
  },

  /*
  Part of Observer-Contract.
  Is called when a significant cahnge in the Model/Collection occured.
  Rerenders the View.
  */
  notify : function () {
    this.renderUpdate();
  },

  /*
  Initial render method that uses the template and the Model/Collection to fill
  the $el with contents.
  Also calls renderInitialChildren that may render ChildViews as specified in
  childViewDefinitions.
  */
  renderInitial : function () {
    var resultingHtml = this.template(this.model);

    switch (this.renderStyle) {
      case "insert":
        this.$el.html(resultingHtml);
        break;
      case "replace":
        // ASSERT: There is one parenting object!
        var resultingDom = $.parseHTML(resultingHtml)[0];
        var resulting$ = $(resultingDom);
        this.$el.replaceWith(resulting$);
        this.$el = resulting$;

        break;
      default:
        this.error("Invalid renderStyle: " + this.renderStyle);
    }

    this.renderInitialChildren();

    this.attachClickRequests();

    return this;
  },

  attachClickRequests : function () {
    var that = this;
    $.each(this.clickRequests, function(i, clickRequest) {
      var $trigger = (clickRequest.selector === "") ? that.$el : that.$el.find(clickRequest.selector);

      $trigger.on("click", function() {

        var handler = clickRequest.handler;
        if (handler !== undefined) {
          handler.call(that);
        }

        if (clickRequest.requestName !== undefined) {
          var reqName = clickRequest.requestName.call(that);
          if (reqName !== "") {
            var reqData = clickRequest.requestData.call(that);
            var modelNameToUpdate = clickRequest.modelNameToUpdate.call(that);
            request(
              reqName,
              reqData,
              function (result) {
                if (modelNameToUpdate !== "") {
                  window.app.mvr.ModelManager.require(modelNameToUpdate).update(result);
                }
              }
            );
          }
        }

      }); // /.on("click")
    }); // /.each(clickRequests)
  },

  detachClickRequests : function () {
    var that = this;
    $.each(this.clickRequests, function(i, clickRequest) {
      var $trigger = (clickRequest.selector === "") ? that.$el : that.$el.find(selector);
      $trigger.off("click");
    });
  },

  /*
  Renders every ChildView as specified in childViewDefinitions.
  */
  renderInitialChildren : function () {
    var that = this;

    $.each(this.children, function(i, child) {
      child.destroy();
    });

    $.each(this.childViewDefinitions, function(i, def) {

      var view = def.viewClass
        .new(that.$el.find(def.selector))
        .setRenderStyle(def.renderStyle || "insert");

      if (def.model !== undefined) {
        view.setModel(def.model);
        def.model.attachObserver(view);
      }

      that.children[i] = view;

      view.renderInitial();
    });
  },


  /*
  Updates the View after initialization. Is the normal renderInitial by default,
  but can be altered to only change relevant elements or trigger animations
  instead of re-rendering the whole thing.
  */
  renderUpdate : function () {
    this.renderInitial();
    return this;
  },

  destroy : function () {
    $.each(this.children, function(i, child) {
      child.destroy();
    });

    this.detachClickRequests();

    var that = this;
    if (this.model !== undefined && this.model.detachObserver !== undefined) {
        this.model.detachObserver(this);
    }

  }

});
