/// <reference path="../../../typings/browser.d.ts" />

module st.foundation {

    var $module:ng.IModule = angular.module('st.foundation');


    interface ISTFilterInputScope extends ng.IScope {
        property:string;
        value:string;
        $model:any;
        placeholder?:string
    }


    class STFilterInputController {
        constructor(private $scope:ISTFilterInputScope, private $q:ng.IQService, private $http:ng.IHttpService, private $parse:ng.IParseService) {
            var ctrl:STFilterInputController = this;

            _.defaults($scope, {
                value: '',
                $model: {},
                placeholder: 'Enter '+ $scope.property
            });
        }

        public onValueChange(value:string) : void {
            var $scope:ISTFilterInputScope = this.$scope;
            $scope.$model = _.set({}, $scope.property, value);
        }
    }
    STFilterInputController.$inject = ['$scope', '$q', '$http', '$parse'];


    function STFilterInputDirective($parse:ng.IParseService):ng.IDirective {
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

            link: function ($scope:ISTFilterInputScope, $element:JQuery, $attrs:ng.IAttributes, controllers:Array<any>) {

                $attrs.$observe('stFilterProperty', function (stFilterProperty:string):void {
                    $scope.property = stFilterProperty;
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
    STFilterInputDirective.$inject = ['$parse'];

    $module.directive('stFilterInput', STFilterInputDirective);
}
