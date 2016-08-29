/// <reference path="../../typings/browser.d.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var $module = angular.module('st.foundation');
        var RunFn = function ($window) {
        };
        RunFn.$inject = ['$window'];
        $module.run(RunFn);
        $module.run([
            '$mdAria',
            function ($mdAria) {
            }
        ]);
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-foundation.run.js.map