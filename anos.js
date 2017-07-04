'use strict';
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['anos'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('anos'));
    } else {
        root.anos = factory(root.anos);
    }
}(this, function(anos) {
    function ve(m) {
        var e = new Error(m);
        e.name = 'ValueError';
        return e;
    }
    function vd(a) {
        if (Object.prototype.toString.call(a) === '[object Date]') {
            if (isNaN(a.getMonth())) {
                return { s: false, e: a + ' is an invalid date.' };
            }
            return { s: true };
        }
        return { s: false, e: a + ' is not a date object.' };
    }
    function diff(a, b) {
        var _avd = vd(a); if (!_avd.s) { throw ve(_avd.e); }
        var _bvd = vd(b); if (!_bvd.s) { throw ve(_bvd.e); }
        var diff = { d: 0, m: 0, y: 0 };
        var aYear = a.getUTCFullYear(), aMonth = a.getUTCMonth(), aDays = a.getUTCDate();
        var bYear = b.getUTCFullYear(), bMonth = b.getUTCMonth(), bDays = b.getUTCDate();
        var dYear, dMonth, dDays;
        if (bDays < aDays) {
            bDays = parseInt(bDays) + 30;
            bMonth = parseInt(bMonth) - 1;
        }
        dDays = bDays - aDays;
        if (bMonth < aMonth) {
            bMonth = parseInt(bMonth) + 12;
            bYear = bYear - 1;
        }
        dMonth = bMonth - aMonth;
        dYear = bYear - aYear;
        return { y: dYear, m: dMonth, d: dDays };
    }
    function age(b) {
        return d(b, new Date());
    }
    return {
        age: age,
        diff: diff
    }
}));