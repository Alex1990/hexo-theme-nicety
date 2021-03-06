/**
 * Alex Chao's blog
 * 2015-03-07
 */

(function() {

  // Shortand
  var doc = document;
  var docEl = doc.documentElement;

  // Helper
  var trim = function(str) {
    if (str.trim) {
      return str.trim();
    } else {
      return str = str.replace(/^\s+/, '').replace(/\s+$/, '');
    }
  };

  var id = function(id) {
    return doc.getElementById(id);
  };

  var log = function() {};
  var debug = location.hash === '#debug' ? true : false;

  if (debug) {
    if (window.console && console.log) {
      log = function() {
        console.log.apply(console, arguments);
      };
    }
  }

  var addEvent;
  var removeEvent;

  if (doc.addEventListener) {
    addEvent = function(elem, type, listener) {
      elem.addEventListener(type, listener, false);
    };
    removeEvent = function(elem, type, listener) {
      elem.removeEventListener(type, listener, false);
    };
  } else if (doc.attachEvent) {
    addEvent = function(elem, type, listener) {
      elem[type + listener] = function() {
        var e = window.event;
        e.target = e.srcElement;
        e.preventDefault = function() {
          e.returnValue = false;
        };
        e.stopPropagation = function() {
          e.cancelBubble = true;
        };
        listener.call(elem, e);
      };
      elem.attachEvent('on' + type, elem[type + listener]);
    };
    removeEvent = function(elem, type, listener) {
      elem.detachEvent('on' + type, elem[type + listener]);
    };
  }

  var hasClass;
  var addClass;
  var removeClass;

  if (docEl.classList) {

    hasClass = function(elem, className) {
      return elem.classList.contains(className);
    };

    addClass = function(elem, className) {
      elem.classList.add(className);
    };

    removeClass = function(elem, className) {
      elem.classList.remove(className);
    };

  } else {

    hasClass = function(elem, className) {
      var re = new RegExp('(^|\\s+)' + className + '(\\s+|$)');
      return re.test(elem.className);
    };

    addClass = function(elem, className) {
      if (!hasClass(elem, className)) {
        elem.className += ' ' + className;
      }
    };

    removeClass = function(elem, className) {
      var re;
      if (hasClass(elem, className)) {
        re = new RegExp('(^|\\s+)' + className + '(\\s+|$)');
        elem.className = trim(elem.className.replace(re, ' '));
      }
    };
  }

  var toggleClass = function(elem, className) {
    if (hasClass(elem, className)) {
      removeClass(elem, className);
    } else {
      addClass(elem, className);
    }
  };

  /**
   * Search form
   */

  function initSearchForm() {
    var searchBtn = id('search-btn');
    var searchInput = id('keywords');
    var hideClass = 'hidden';

    addEvent(searchBtn, 'click', function(e) {
      log('search button click');
      e.stopPropagation();

      if (trim(searchInput.value) === '') {
        e.preventDefault();

        if (hasClass(searchInput, hideClass)) {
          removeClass(searchInput, hideClass);
          searchInput.focus();
        } else {
          addClass(searchInput, hideClass);
          searchInput.blur();
        }
      }
    });

    addEvent(searchInput, 'click', function(e) {
      e.stopPropagation();
    });

    addEvent(doc, 'click', function() {
      log('document click');
      addClass(searchInput, hideClass);
    });
  }


  /**
   * Sidebar off-canvas
   */

  function initSidebar() {
    var sidebarTrigger = id('sidebar-toggle');
    var bd = doc.body;

    addEvent(sidebarTrigger, 'click', function(e) {
      log('sidebar-toggle click');
      e.stopPropagation();
      toggleClass(bd, 'sidebar-active');
      log('body.className: ' + bd.className);
    });

    var main = id('main');

    addEvent(main, 'click', function() {
      log('main click');
      removeClass(bd, 'sidebar-active');
      log('body.className: ' + bd.className);
    });
  }

  /**
   * All init function
   */

  initSearchForm();
  initSidebar();

})();
