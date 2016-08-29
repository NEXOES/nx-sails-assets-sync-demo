/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="st-uuid.ts" />

module st.foundation {

    var $module:ng.IModule = angular.module('st.foundation');


    export interface ISTStateParamsScope extends ng.IScope {
        $model:any;
        stParamKey:string;
    }


    export class STStateParamsController {

        constructor(private $scope:ISTStateParamsScope, private $http:ng.IHttpService, private $q:ng.IQService) {
            var ctrl:STStateParamsController = this;
        }
    }
    STStateParamsController.$inject = ['$scope', '$http', '$q'];


    export function STStateParamsDirective($stateParams:ng.ui.IStateParamsService):ng.IDirective {
        return {

            restrict: 'AE',

            require: ['ngModel'],

            scope: {
                stParamKey: '@'
            },

            controller: STStateParamsController,

            link: function ($scope:ISTStateParamsScope, $element:JQuery, $attrs:ng.IAttributes, controllers:Array<any>) {

                $scope.$watch('stParamKey', function(stParamKey:string) : void {
                    if(stParamKey) {
                        $scope.$model = $stateParams[stParamKey];
                    }
                });

                var ngModelCtrl:ng.INgModelController = controllers[0];

                ngModelCtrl.$formatters.push(function (modelValue:string) {
                    return modelValue;
                });

                ngModelCtrl.$parsers.push(function (viewValue) {
                    return viewValue;
                });

                $scope.$watch('$model', function (value:any) {
                    ngModelCtrl.$setViewValue(value);
                });

                ngModelCtrl.$render = function () {
                    $scope.$model = ngModelCtrl.$viewValue;
                };
            }
        };
    };
    STStateParamsDirective.$inject = ['$stateParams'];

    $module.directive('stStateParams', STStateParamsDirective);
}