/// <reference path="../../../typings/browser.d.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var $module = angular.module('st.foundation');
        $module.config(['$compileProvider', 'uiAliasConfig', function ($compileProvider, uiAliasConfig) {
                uiAliasConfig = uiAliasConfig || {};
                angular.forEach(uiAliasConfig, function (config, alias) {
                    if (angular.isString(config)) {
                        config = {
                            replace: true,
                            template: config
                        };
                    }
                    $compileProvider.directive(alias, function () {
                        return config;
                    });
                });
            }]);
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-alias.js.map