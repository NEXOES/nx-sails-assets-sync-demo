/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="st-resource.ts" />

module st.foundation {

    var $module:ng.IModule = angular.module('st.foundation');


    function STResourceFilterDirective($parse:ng.IParseService):ng.IDirective {
        return {

            restrict: 'AE',

            require: ['ngModel', '^stResource'],

            scope: false,

            link: function ($scope:ng.IScope, $element:JQuery, $attrs:ng.IAttributes, controllers:Array<any>) {

                var ngModelCtrl:ng.INgModelController = controllers[0];
                var filterCtrl:STResourceController = controllers[1];

                ngModelCtrl.$formatters.push(function (modelValue:string) {
                    return modelValue;
                });

                ngModelCtrl.$parsers.push(function (viewValue) {
                    return viewValue;
                });

                $scope.$watch('resourceFilter', function (value:any) {
                    ngModelCtrl.$setViewValue(value);
                });

                ngModelCtrl.$render = function () {
                    filterCtrl.setResourceFilter(ngModelCtrl.$viewValue);
                };

                
            }
        };
    };
    STResourceFilterDirective.$inject = ['$parse'];

    $module.directive('stResourceFilter', STResourceFilterDirective);
}