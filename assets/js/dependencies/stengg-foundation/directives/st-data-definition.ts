/// <reference path="../../../typings/browser.d.ts" />

module st.foundation.data {

    var $module:ng.IModule = angular.module('st.foundation');


    export interface ISTDataDefinitionController {
        $render:Function;
    }

    export class STDataDefinitionController implements ISTDataDefinitionController {

        public $render:Function;

        constructor(private $scope:ng.IScope, private DS:any) {
        }

        public setDataDefinitionName(dataDefinitionName:string) : void {
            var ctrl:STDataDefinitionController = this;
            var dataDefinition:any = ctrl.DS.definitions[dataDefinitionName];
            (ctrl.$render || _.noop)(dataDefinition);
        }
    }
    STDataDefinitionController.$inject = ['$scope', 'DS'];


    export function STDataDefinitionDirective():ng.IDirective {
        return {

            restrict: 'A',

            scope: false,

            controller: STDataDefinitionController,

            link: function ($scope:ng.IScope, $element:JQuery, $attrs:ng.IAttributes, ctrl:STDataDefinitionController) {
                $attrs.$observe('stDataDefinition', function (dataDefinitionName:string):void {
                    if (dataDefinitionName) {
                        ctrl.setDataDefinitionName(dataDefinitionName);
                    }
                })
            }
        };
    };
    STDataDefinitionDirective.$inject = [];

    $module.directive('stDataDefinition', STDataDefinitionDirective);
}