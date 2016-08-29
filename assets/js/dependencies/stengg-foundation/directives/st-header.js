/// <reference path="../../../typings/browser.d.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var $module = angular.module('st.foundation');
        function STHeaderDirectiveLinkFn($scope, $element, $attrs) {
        }
        foundation.STHeaderDirectiveLinkFn = STHeaderDirectiveLinkFn;
        function STHeaderDirective() {
            return {
                restrict: 'AE',
                replace: true,
                transclude: true,
                scope: {},
                templateUrl: 'templates/dependencies/stengg-foundation/st-header.html',
                link: STHeaderDirectiveLinkFn
            };
        }
        ;
        STHeaderDirective.$inject = [];
        $module.directive('stHeader', STHeaderDirective);
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-header.js.map