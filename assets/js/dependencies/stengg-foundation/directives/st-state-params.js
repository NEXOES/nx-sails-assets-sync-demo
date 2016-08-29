/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="st-uuid.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var $module = angular.module('st.foundation');
        var STStateParamsController = (function () {
            function STStateParamsController($scope, $http, $q) {
                this.$scope = $scope;
                this.$http = $http;
                this.$q = $q;
                var ctrl = this;
            }
            return STStateParamsController;
        }());
        foundation.STStateParamsController = STStateParamsController;
        STStateParamsController.$inject = ['$scope', '$http', '$q'];
        function STStateParamsDirective($stateParams) {
            return {
                restrict: 'AE',
                require: ['ngModel'],
                scope: {
                    stParamKey: '@'
                },
                controller: STStateParamsController,
                link: function ($scope, $element, $attrs, controllers) {
                    $scope.$watch('stParamKey', function (stParamKey) {
                        if (stParamKey) {
                            $scope.$model = $stateParams[stParamKey];
                        }
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
        foundation.STStateParamsDirective = STStateParamsDirective;
        ;
        STStateParamsDirective.$inject = ['$stateParams'];
        $module.directive('stStateParams', STStateParamsDirective);
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-state-params.js.map