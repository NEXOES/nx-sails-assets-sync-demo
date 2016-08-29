/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="st-property-inspector.ts" />

module st.foundation.propertyInspector.row {

    var $module:ng.IModule = angular.module('st.foundation');


    export interface ISTPropertyInspectorRowScope extends ng.IScope {
        $model:any;
        property:any;
    }

    export class STPropertyInspectorRowController {
        constructor(private $scope:ISTPropertyInspectorRowScope) {
        }
    }
    STPropertyInspectorRowController.$inject = ['$scope'];

    function STPropertyInspectorRowDirective($parse:ng.IParseService):ng.IDirective {

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

            link: function ($scope:ISTPropertyInspectorRowScope, $element:JQuery, $attrs:ng.IAttributes, controllers:Array<any>) {

                $attrs.$observe('stPropertyName', function (stPropertyNameExpr:string):void {
                    var propertyName:string = $scope.$parent[stPropertyNameExpr];
                    $scope.property = st.foundation.propertyInspector.Property.getByPropertyName(propertyName);
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
    STPropertyInspectorRowDirective.$inject = ['$parse'];

    $module.directive('stPropertyInspectorRow', STPropertyInspectorRowDirective);
}