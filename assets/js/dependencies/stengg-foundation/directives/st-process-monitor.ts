/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="../../../index.d.ts" />

module st.foundation {

    var $module:ng.IModule = angular.module('st.foundation');


    export class STProcessMonitorController implements IProcessMonitorController {

        public $processHost:any;

        constructor(private $scope:ng.IScope) {
        }

        public push() : void {
            this.$processHost.$process++;
        }

        public pop() : void {
            var ctrl:STProcessMonitorController = this;
            ctrl.$processHost.$process--;
        }
    }
    STProcessMonitorController.$inject = ['$scope'];


    export function STProcessMonitorDirective():ng.IDirective {
        return {

            restrict: 'A',

            scope: false,

            require: ['stProcessMonitor'],

            controller: STProcessMonitorController,

            link: function ($scope:ng.IScope, $element:JQuery, $attrs:ng.IAttributes, $ctrls:Array<any>) {

                var ctrl:STProcessMonitorController = $ctrls[0];

                $attrs.$observe('stProcessMonitor', function($processHost:string) : void {
                    $scope.$watch($processHost, function($processHost:any) : void {
                        ctrl.$processHost = $processHost;
                    })
                })
            }
        };
    };
    STProcessMonitorDirective.$inject = [];

    $module.directive('stProcessMonitor', STProcessMonitorDirective);
}