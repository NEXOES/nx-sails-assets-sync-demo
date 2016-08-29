/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="../../../index.d.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var ui;
        (function (ui) {
            var RouterConfig = (function () {
                function RouterConfig($window, $rootScope, $state) {
                    this.$window = $window;
                    this.$rootScope = $rootScope;
                    this.$state = $state;
                    _.extend($state, {
                        back: function () {
                            $window.history.back();
                        },
                        $STATE_CHANGE_START: '$stateChangeStart',
                        $STATE_NOT_FOUND: '$stateNotFound',
                        $STATE_CHANGE_SUCCESS: '$stateChangeSuccess',
                        $STATE_CHANGE_ERROR: '$stateChangeError',
                        $VIEW_CONTENT_LOADING: '$viewContentLoading',
                        $VIEW_CONTENT_LOADED: '$viewContentLoaded'
                    });
                }
                return RouterConfig;
            }());
            ui.RouterConfig = RouterConfig;
            RouterConfig.$inject = ['$window', '$rootScope', '$state'];
            angular.module('st.foundation')
                .run(RouterConfig);
        })(ui = foundation.ui || (foundation.ui = {}));
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-ui-router.js.map