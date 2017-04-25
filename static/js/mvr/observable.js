window.app = window.app || {};
window.app.mvr = window.app.mvr || {};

window.app.mvr.Observable = window.app.mvr.Extendable.extend({

  /*
  List of observers that mus hold a notify() method
  */
  observers : new Array(),


  /*
  Calls each observers notify() method
  */
  notifyObservers : function () {
    $.each(this.observers, function(i, observer) {
      observer.notify.call(observer);
    });
  },


  /*
  Adds an observer to the list that will be notified upon
  calling notifyObservers()
  */
  attachObserver : function (observer) {
    // Add reference this.observers->observer
    Array.prototype.push.call(this.observers, observer)
    // Add reference observer.model->this
    observer.model = this;
    return this;
  },

  /*
  Removes all observers from the list that will be notified upon
  calling notifyObservers()
  */
  detachObservers : function (observer) {
    this.observers = new Array();
    return this;
  }

});
