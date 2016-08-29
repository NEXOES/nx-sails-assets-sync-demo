/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="st-uuid.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var $module = angular.module('st.foundation');
        function STInjectorDirective($injector) {
            return {
                restrict: 'E',
                scope: false,
                link: function ($scope, $element, $attrs) {
                    $attrs.$observe('stName', function (name) {
                        var $model = $injector.get(name);
                        _.set($scope, name, $model);
                    });
                }
            };
        }
        foundation.STInjectorDirective = STInjectorDirective;
        ;
        STInjectorDirective.$inject = ['$injector'];
        $module.directive('stInjector', STInjectorDirective);
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-injector.js.map