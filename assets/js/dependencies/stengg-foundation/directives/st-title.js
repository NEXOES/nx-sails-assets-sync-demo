/// <reference path="../../../typings/browser.d.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var $module = angular.module('st.foundation');
        function STTitleDirectiveLinkFn($scope, $element, $attrs) {
        }
        foundation.STTitleDirectiveLinkFn = STTitleDirectiveLinkFn;
        function STTitleDirective() {
            return {
                restrict: 'AE',
                replace: true,
                transclude: true,
                scope: {},
                template: '<h1 class="st-title" ng-transclude></h1>',
                link: STTitleDirectiveLinkFn
            };
        }
        ;
        STTitleDirective.$inject = [];
        $module.directive('stTitle', STTitleDirective);
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-title.js.map