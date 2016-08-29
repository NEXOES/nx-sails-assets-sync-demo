/// <reference path="../../../typings/browser.d.ts" />

module st.foundation.uuid {

    var $module:ng.IModule = angular.module('st.foundation');


    export interface ISTUUIDScope extends ng.IScope {
        uuid:string;
    }


    export interface ISTUUIDController {
        $render:Function;
    }

    export class STUUIDController implements ISTUUIDController {

        private uuid:string;

        public $render:Function;

        constructor(private $scope:ISTUUIDScope) {
            var ctrl:STUUIDController = this;
        }

        public setViewValue(uuid:string):void {
            var ctrl:STUUIDController = this;
            ctrl.uuid = uuid;
            (ctrl.$render || _.noop)(uuid);
        }
    }
    STUUIDController.$inject = ['$scope'];


    export function STUUIDDirective():ng.IDirective {
        return {

            restrict: 'A',

            scope: false,

            controller: STUUIDController,

            link: function ($scope:ISTUUIDScope, $element:JQuery, $attrs:ng.IAttributes, ctrl:STUUIDController) {
                $attrs.$observe('stUuid', function (uuid:string):void {
                    if (uuid) {
                        ctrl.setViewValue(uuid);
                    }
                })
            }
        };
    };
    STUUIDDirective.$inject = [];

    $module.directive('stUuid', STUUIDDirective);
}