/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="../../../index.d.ts" />

module st.foundation {

    var $module:ng.IModule = angular.module('st.foundation');

    export class STSaveModeController {

        private changeListener:Function;

        public saveMode:string;
        public resourceCtrl:STResourceController;

        constructor(private $scope:ng.IScope) {
        }

        public $apply():STSaveModeController {
            var ctrl:STSaveModeController = this;

            if (ctrl.saveMode && ctrl.resourceCtrl) {

                (ctrl.changeListener || _.noop)();

                switch (ctrl.saveMode) {
                    case 'auto':
                    case 'change':
                        ctrl.changeListener = ctrl.resourceCtrl.$scope.$on('change', function ():void {
                            ctrl.resourceCtrl.save();
                        });
                        break;
                    case 'manual':
                    default:
                        break;
                }
            }

            return this;
        }

        public $trigger():STSaveModeController {
            var ctrl:STSaveModeController = this;

            return ctrl;
        }

        public setSaveMode(saveMode:string):STSaveModeController {
            var ctrl:STSaveModeController = this;

            ctrl.saveMode = saveMode;
            ctrl.$apply();

            return ctrl;
        }

        public setResourceCtrl(resourceCtrl:STResourceController):STSaveModeController {
            var ctrl:STSaveModeController = this;

            ctrl.resourceCtrl = resourceCtrl;
            ctrl.$apply();

            return ctrl;
        }
    }
    STSaveModeController.$inject = ['$scope'];

    export function STSaveModeDirective():ng.IDirective {
        return {

            restrict: 'A',

            require: ['stSaveMode', 'stResource'],

            scope: false,

            controller: STSaveModeController,

            link: function ($scope:ng.IScope, $element:JQuery, $attrs:ng.IAttributes, $ctrls:Array<any>) {

                var stSaveCtrl:STSaveModeController = $ctrls[0];

                stSaveCtrl.setResourceCtrl($ctrls[1]);

                $attrs.$observe('stSaveMode', function (saveMode:string):void {
                    stSaveCtrl.setSaveMode(saveMode);
                });
            }
        };
    };
    STSaveModeDirective.$inject = [];

    $module.directive('stSaveMode', STSaveModeDirective);
}