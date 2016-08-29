/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="../../../index.d.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var Notify = (function () {
            function Notify($mdToast) {
                this.$mdToast = $mdToast;
            }
            Notify.prototype.toast = function (message) {
                return this.$mdToast.show(this.$mdToast.simple().textContent(message));
            };
            return Notify;
        }());
        foundation.Notify = Notify;
        Notify.$inject = ['$mdToast'];
        angular.module('st.foundation')
            .service('$notify', Notify);
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-notify.js.map