/// <reference path="../../../typings/browser.d.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var $module = angular.module('st.foundation');
        var STFilterInputController = (function () {
            function STFilterInputController($scope, $q, $http, $parse) {
                this.$scope = $scope;
                this.$q = $q;
                this.$http = $http;
                this.$parse = $parse;
                var ctrl = this;
                _.defaults($scope, {
                    value: '',
                    $model: {},
                    placeholder: 'Enter ' + $scope.property
                });
            }
            STFilterInputController.prototype.onValueChange = function (value) {
                var $scope = this.$scope;
                $scope.$model = _.set({}, $scope.property, value);
            };
            return STFilterInputController;
        }());
        STFilterInputController.$inject = ['$scope', '$q', '$http', '$parse'];
        function STFilterInputDirective($parse) {
            return {
                restrict: 'AE',
                replace: true,
                require: ['ngModel'],
                templateUrl: 'templates/dependencies/stengg-foundation/st-filter-input.html',
                scope: {
                    placeholder: '@?'
                },
                controller: STFilterInputController,
                controllerAs: 'ctrl',
                link: function ($scope, $element, $attrs, controllers) {
                    $attrs.$observe('stFilterProperty', function (stFilterProperty) {
                        $scope.property = stFilterProperty;
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
        STFilterInputDirective.$inject = ['$parse'];
        $module.directive('stFilterInput', STFilterInputDirective);
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-filter-input.js.map