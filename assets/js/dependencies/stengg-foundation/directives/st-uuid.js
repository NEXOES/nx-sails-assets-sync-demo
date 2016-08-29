/// <reference path="../../../typings/browser.d.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var uuid;
        (function (uuid_1) {
            var $module = angular.module('st.foundation');
            var STUUIDController = (function () {
                function STUUIDController($scope) {
                    this.$scope = $scope;
                    var ctrl = this;
                }
                STUUIDController.prototype.setViewValue = function (uuid) {
                    var ctrl = this;
                    ctrl.uuid = uuid;
                    (ctrl.$render || _.noop)(uuid);
                };
                return STUUIDController;
            }());
            uuid_1.STUUIDController = STUUIDController;
            STUUIDController.$inject = ['$scope'];
            function STUUIDDirective() {
                return {
                    restrict: 'A',
                    scope: false,
                    controller: STUUIDController,
                    link: function ($scope, $element, $attrs, ctrl) {
                        $attrs.$observe('stUuid', function (uuid) {
                            if (uuid) {
                                ctrl.setViewValue(uuid);
                            }
                        });
                    }
                };
            }
            uuid_1.STUUIDDirective = STUUIDDirective;
            ;
            STUUIDDirective.$inject = [];
            $module.directive('stUuid', STUUIDDirective);
        })(uuid = foundation.uuid || (foundation.uuid = {}));
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-uuid.js.map