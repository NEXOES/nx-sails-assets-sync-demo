/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="../../../index.d.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var $module = angular.module('st.foundation');
        var STSaveModeController = (function () {
            function STSaveModeController($scope) {
                this.$scope = $scope;
            }
            STSaveModeController.prototype.$apply = function () {
                var ctrl = this;
                if (ctrl.saveMode && ctrl.resourceCtrl) {
                    (ctrl.changeListener || _.noop)();
                    switch (ctrl.saveMode) {
                        case 'auto':
                        case 'change':
                            ctrl.changeListener = ctrl.resourceCtrl.$scope.$on('change', function () {
                                ctrl.resourceCtrl.save();
                            });
                            break;
                        case 'manual':
                        default:
                            break;
                    }
                }
                return this;
            };
            STSaveModeController.prototype.$trigger = function () {
                var ctrl = this;
                return ctrl;
            };
            STSaveModeController.prototype.setSaveMode = function (saveMode) {
                var ctrl = this;
                ctrl.saveMode = saveMode;
                ctrl.$apply();
                return ctrl;
            };
            STSaveModeController.prototype.setResourceCtrl = function (resourceCtrl) {
                var ctrl = this;
                ctrl.resourceCtrl = resourceCtrl;
                ctrl.$apply();
                return ctrl;
            };
            return STSaveModeController;
        }());
        foundation.STSaveModeController = STSaveModeController;
        STSaveModeController.$inject = ['$scope'];
        function STSaveModeDirective() {
            return {
                restrict: 'A',
                require: ['stSaveMode', 'stResource'],
                scope: false,
                controller: STSaveModeController,
                link: function ($scope, $element, $attrs, $ctrls) {
                    var stSaveCtrl = $ctrls[0];
                    stSaveCtrl.setResourceCtrl($ctrls[1]);
                    $attrs.$observe('stSaveMode', function (saveMode) {
                        stSaveCtrl.setSaveMode(saveMode);
                    });
                }
            };
        }
        foundation.STSaveModeDirective = STSaveModeDirective;
        ;
        STSaveModeDirective.$inject = [];
        $module.directive('stSaveMode', STSaveModeDirective);
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-save-mode.js.map