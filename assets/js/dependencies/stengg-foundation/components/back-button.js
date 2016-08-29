/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="../../../index.d.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var $module = angular.module('st.foundation');
        var BackButtonController = (function () {
            function BackButtonController($state) {
                this.$state = $state;
            }
            BackButtonController.prototype.back = function () {
                this.$state.back();
            };
            return BackButtonController;
        }());
        foundation.BackButtonController = BackButtonController;
        BackButtonController.$inject = ['$state'];
        function BackButtonDirective() {
            return {
                restrict: 'AE',
                replace: true,
                scope: {},
                templateUrl: 'templates/dependencies/stengg-foundation/components/st-back-button.html',
                controller: BackButtonController,
                controllerAs: '$ctrl'
            };
        }
        foundation.BackButtonDirective = BackButtonDirective;
        BackButtonDirective.$inject = [];
        $module.directive('stBackButton', BackButtonDirective);
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=back-button.js.map