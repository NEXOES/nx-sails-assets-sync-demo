/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="st-uuid.ts" />

module st.foundation {

    var $module:ng.IModule = angular.module('st.foundation');

    export interface ISTSelectedItemChangeScope extends ng.IScope {
        expr:string;
    }

    export class STSelectedItemChangeController {

        constructor(private $scope:ISTSelectedItemChangeScope) {
        }

        public onChange(data:any) : void {
            this.$scope.$eval(this.$scope.expr, {$data:data});
        }
    }
    STSelectedItemChangeController.$inject = ['$scope'];

    export function STSelectedItemChangeDirective():ng.IDirective {
        return {

            restrict: 'A',

            scope: false,

            controller: STSelectedItemChangeController,

            link: function ($scope:ISTSelectedItemChangeScope, $element:JQuery, $attrs:ng.IAttributes) {

                $attrs.$observe('stSelectedItemChange', function (expr:string) : void {
                    $scope.expr = expr;
                });
            }
        };
    };
    STSelectedItemChangeDirective.$inject = [];

    $module.directive('stSelectedItemChange', STSelectedItemChangeDirective);
}