/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="../../../index.d.ts" />

module st.foundation {

    var $module:ng.IModule = angular.module('st.foundation');

    export interface ISTDatetimeInputScope extends ng.IScope {
        $model:any;
    }

    export class STDatetimeInputController {
        constructor(private $scope:ISTDatetimeInputScope) {
        }
    }
    STDatetimeInputController.$inject = ['$scope'];

    export function STDatetimeInputDirective():ng.IDirective {
        return {

            restrict: 'AE',
            transclude: true,
            replace: true,

            require: ['ngModel'],

            scope: {
                placeholder: '='
            },

            template: '' +
            '<div>' +
            '   <nx-datetime-picker model="$model">' +
            '   </nx-datetime-picker>' +
            '</div>',

            controller: STDatetimeInputController,

            link: function ($scope:ISTDatetimeInputScope, $element:JQuery, $attrs:ng.IAttributes, $ctrls:Array<any>) {

                var ngModelCtrl:ng.INgModelController = $ctrls[0];

                $scope.$watch('$model', function (value:any) {
                    ngModelCtrl.$setViewValue(value);
                });

                ngModelCtrl.$render = function () {
                    $scope.$model = ngModelCtrl.$viewValue;
                };
            }
        };
    };
    STDatetimeInputDirective.$inject = [];

    $module.directive('stDatetimeInput', STDatetimeInputDirective);
}