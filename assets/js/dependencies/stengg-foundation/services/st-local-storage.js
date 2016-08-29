/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="../../../index.d.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        function STLocalStorageStorageProvider(localStorageServiceProvider) {
            return localStorageServiceProvider;
        }
        foundation.STLocalStorageStorageProvider = STLocalStorageStorageProvider;
        STLocalStorageStorageProvider.$inject = ['localStorageServiceProvider'];
        angular.module('st.foundation')
            .provider('$localStorage', STLocalStorageStorageProvider);
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-local-storage.js.map