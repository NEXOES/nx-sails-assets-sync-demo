/// <reference path="../../../typings/browser.d.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var data;
        (function (data) {
            var $module = angular.module('st.foundation');
            var STDataDefinitionController = (function () {
                function STDataDefinitionController($scope, DS) {
                    this.$scope = $scope;
                    this.DS = DS;
                }
                STDataDefinitionController.prototype.setDataDefinitionName = function (dataDefinitionName) {
                    var ctrl = this;
                    var dataDefinition = ctrl.DS.definitions[dataDefinitionName];
                    (ctrl.$render || _.noop)(dataDefinition);
                };
                return STDataDefinitionController;
            }());
            data.STDataDefinitionController = STDataDefinitionController;
            STDataDefinitionController.$inject = ['$scope', 'DS'];
            function STDataDefinitionDirective() {
                return {
                    restrict: 'A',
                    scope: false,
                    controller: STDataDefinitionController,
                    link: function ($scope, $element, $attrs, ctrl) {
                        $attrs.$observe('stDataDefinition', function (dataDefinitionName) {
                            if (dataDefinitionName) {
                                ctrl.setDataDefinitionName(dataDefinitionName);
                            }
                        });
                    }
                };
            }
            data.STDataDefinitionDirective = STDataDefinitionDirective;
            ;
            STDataDefinitionDirective.$inject = [];
            $module.directive('stDataDefinition', STDataDefinitionDirective);
        })(data = foundation.data || (foundation.data = {}));
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-data-definition.js.map