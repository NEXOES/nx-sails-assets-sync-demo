/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="st-property-inspector.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var propertyInspector;
        (function (propertyInspector) {
            var row;
            (function (row) {
                var $module = angular.module('st.foundation');
                var STPropertyInspectorRowController = (function () {
                    function STPropertyInspectorRowController($scope) {
                        this.$scope = $scope;
                    }
                    return STPropertyInspectorRowController;
                }());
                row.STPropertyInspectorRowController = STPropertyInspectorRowController;
                STPropertyInspectorRowController.$inject = ['$scope'];
                function STPropertyInspectorRowDirective($parse) {
                    return {
                        restrict: 'AE',
                        replace: true,
                        transclude: true,
                        require: ['ngModel'],
                        scope: {
                            property: '@'
                        },
                        controller: STPropertyInspectorRowController,
                        controllerAs: 'ctrl',
                        templateUrl: 'templates/dependencies/stengg-foundation/st-property-inspector-row.html',
                        link: function ($scope, $element, $attrs, controllers) {
                            $attrs.$observe('stPropertyName', function (stPropertyNameExpr) {
                                var propertyName = $scope.$parent[stPropertyNameExpr];
                                $scope.property = st.foundation.propertyInspector.Property.getByPropertyName(propertyName);
                            });
                            var ngModelCtrl = controllers[0];
                            ngModelCtrl.$formatters.push(function (modelValue) {
                                return modelValue;
                            });
                            ngModelCtrl.$parsers.push(function (viewValue) {
                                return viewValue;
                            });
                            $scope.$watch('$model', function (value) {
                                ngModelCtrl.$setViewValue(value);
                            });
                            ngModelCtrl.$render = function () {
                                $scope.$model = ngModelCtrl.$viewValue;
                            };
                        }
                    };
                }
                ;
                STPropertyInspectorRowDirective.$inject = ['$parse'];
                $module.directive('stPropertyInspectorRow', STPropertyInspectorRowDirective);
            })(row = propertyInspector.row || (propertyInspector.row = {}));
        })(propertyInspector = foundation.propertyInspector || (foundation.propertyInspector = {}));
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-property-inspector-row.js.map