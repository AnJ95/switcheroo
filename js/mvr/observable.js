window.app = window.app || {};
window.app.mvr = window.app.mvr || {};

window.app.mvr.Observable = window.app.mvr.Extendable.extend({

  // assert: observers have notify() method.
  observers : [],

  notifyObservers : function () {
    $.each(this.observers, function(i, observer) {
      observer.notify.call(observer);
    });
  },

  attachObserver : function (observer) {
    // Add reference this.observers->observer
    this.observers[this.observers.length] = observer;
    
    // Add reference observer.model->this
    observer.model = this;

    return this;
  }

});
