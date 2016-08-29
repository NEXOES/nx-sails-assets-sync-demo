/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="st-uuid.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var $module = angular.module('st.foundation');
        var STSelectedItemChangeController = (function () {
            function STSelectedItemChangeController($scope) {
                this.$scope = $scope;
            }
            STSelectedItemChangeController.prototype.onChange = function (data) {
                this.$scope.$eval(this.$scope.expr, { $data: data });
            };
            return STSelectedItemChangeController;
        }());
        foundation.STSelectedItemChangeController = STSelectedItemChangeController;
        STSelectedItemChangeController.$inject = ['$scope'];
        function STSelectedItemChangeDirective() {
            return {
                restrict: 'A',
                scope: false,
                controller: STSelectedItemChangeController,
                link: function ($scope, $element, $attrs) {
                    $attrs.$observe('stSelectedItemChange', function (expr) {
                        $scope.expr = expr;
                    });
                }
            };
        }
        foundation.STSelectedItemChangeDirective = STSelectedItemChangeDirective;
        ;
        STSelectedItemChangeDirective.$inject = [];
        $module.directive('stSelectedItemChange', STSelectedItemChangeDirective);
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-selected-item-change.js.map