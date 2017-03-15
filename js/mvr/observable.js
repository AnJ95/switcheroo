window.app = window.app || {};
window.app.mvr = window.app.mvr || {};

window.app.model.Observable = window.app.mvr.Extendable.extend({

  // assert: observers have notify() method.
  observers : [],

  notifyObservers : function() {
    $.each(observers, function(i, observer) {
      observer.notify();
    });
  }

});
