/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="../../../index.d.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var ui;
        (function (ui) {
            var Controller = (function () {
                function Controller() {
                }
                Controller.DESTROY = '$destroy';
                return Controller;
            }());
            ui.Controller = Controller;
            Controller.$inject = [];
        })(ui = foundation.ui || (foundation.ui = {}));
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-ui-controller.js.map