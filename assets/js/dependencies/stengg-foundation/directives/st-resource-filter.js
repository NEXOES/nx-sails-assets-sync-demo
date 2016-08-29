/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="st-resource.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var $module = angular.module('st.foundation');
        function STResourceFilterDirective($parse) {
            return {
                restrict: 'AE',
                require: ['ngModel', '^stResource'],
                scope: false,
                link: function ($scope, $element, $attrs, controllers) {
                    var ngModelCtrl = controllers[0];
                    var filterCtrl = controllers[1];
                    ngModelCtrl.$formatters.push(function (modelValue) {
                        return modelValue;
                    });
                    ngModelCtrl.$parsers.push(function (viewValue) {
                        return viewValue;
                    });
                    $scope.$watch('resourceFilter', function (value) {
                        ngModelCtrl.$setViewValue(value);
                    });
                    ngModelCtrl.$render = function () {
                        filterCtrl.setResourceFilter(ngModelCtrl.$viewValue);
                    };
                }
            };
        }
        ;
        STResourceFilterDirective.$inject = ['$parse'];
        $module.directive('stResourceFilter', STResourceFilterDirective);
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-resource-filter.js.map