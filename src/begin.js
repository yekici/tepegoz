/*
* Yasin Ekici 2016
* */

(function (scope) {
    'use strict'

    var t;

    t = scope.t = scope.Tepegoz = function () {};

    t.console = true;
    t.empty = function () {};

    t.log = t.console ? console.log.bind(window) : t.empty;
    t.trace = t.console ? console.trace.bind(window) : t.empty;
    t.assert = t.console ? console.assert.bind(window) : t.empty;
    t.warn = t.console ? console.warn.bind(window) : t.empty;
    t.group = t.console ? function (name  , fn) {
        console.group(name);
        fn.call(this);
        console.groupEnd(name);
    } : t.empty;
    t.time = t.console ? function (name  , fn) {
        console.time(name);
        fn.call(this);
        console.timeEnd(name);
    } : t.empty;


    //Sınama sistemi
    var _testList = {};

    t.testStatus = 1; // 2olunca test lerin adlarınıda yazar
    t.testMode = 0;

    t.test = function (name , fn , pr) {
        _testList[name] = fn;
        if (t.testStatus || pr) {
            t.execute(name);
        }
    };

    t.execute = function (name) {
        if (t.testStatus == 2) t.log('begin::' + name);
        _testList[name].call(t , name);
        if (t.testStatus == 2) t.log('end::' + name);
    };


//})(window);


