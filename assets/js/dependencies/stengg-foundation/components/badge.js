/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../index.d.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var $module = angular.module('st.foundation');
        var BadgeController = (function () {
            function BadgeController($scope) {
                this.$scope = $scope;
            }
            return BadgeController;
        }());
        foundation.BadgeController = BadgeController;
        BadgeController.$inject = ['$scope'];
        function BadgeDirective() {
            return {
                restrict: 'AE',
                replace: true,
                transclude: true,
                scope: {},
                template: '<div ng-transclude class="badge"></div>',
                controller: BadgeController,
                controllerAs: 'ctrl'
            };
        }
        foundation.BadgeDirective = BadgeDirective;
        BadgeDirective.$inject = [];
        $module.directive('stBadge', BadgeDirective);
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=badge.js.map