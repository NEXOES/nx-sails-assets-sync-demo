/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="../../../index.d.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var $module = angular.module('st.foundation');
        var STProcessMonitorController = (function () {
            function STProcessMonitorController($scope) {
                this.$scope = $scope;
            }
            STProcessMonitorController.prototype.push = function () {
                this.$processHost.$process++;
            };
            STProcessMonitorController.prototype.pop = function () {
                var ctrl = this;
                ctrl.$processHost.$process--;
            };
            return STProcessMonitorController;
        }());
        foundation.STProcessMonitorController = STProcessMonitorController;
        STProcessMonitorController.$inject = ['$scope'];
        function STProcessMonitorDirective() {
            return {
                restrict: 'A',
                scope: false,
                require: ['stProcessMonitor'],
                controller: STProcessMonitorController,
                link: function ($scope, $element, $attrs, $ctrls) {
                    var ctrl = $ctrls[0];
                    $attrs.$observe('stProcessMonitor', function ($processHost) {
                        $scope.$watch($processHost, function ($processHost) {
                            ctrl.$processHost = $processHost;
                        });
                    });
                }
            };
        }
        foundation.STProcessMonitorDirective = STProcessMonitorDirective;
        ;
        STProcessMonitorDirective.$inject = [];
        $module.directive('stProcessMonitor', STProcessMonitorDirective);
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-process-monitor.js.map