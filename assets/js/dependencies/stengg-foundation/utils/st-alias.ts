/// <reference path="../../../typings/browser.d.ts" />

module st.foundation {

    var $module:ng.IModule = angular.module('st.foundation');

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
}