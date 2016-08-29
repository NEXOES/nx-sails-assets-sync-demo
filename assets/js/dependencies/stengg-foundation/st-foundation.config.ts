/// <reference path="../../typings/browser.d.ts" />

module st.foundation {

    var $module:ng.IModule = angular.module('st.foundation');

    var ST_NG_Aliases:any = {
        'stFlex': '<span flex></span>'
    };

    $module.constant('uiAliasConfig', ST_NG_Aliases);

    $module.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('st');
    }]);

    $module.config(['$mdAriaProvider', function ($mdAriaProvider:any) {
        var $log:ng.ILogService = console;

        if ($mdAriaProvider && $mdAriaProvider.disableWarnings) {
            $mdAriaProvider.disableWarnings();
        }
        else {
            $log.log('$mdAriaProvider is not available... cannot disable the ARIA-warnings');
            $log.log('Please consider updating your Angular-Material library to latest version...');
        }
    }]);


    export class UIBootstrapConfigurator {
        constructor(private $uibModalProvider:any) {
            $uibModalProvider.options
                .windowTemplateUrl = 'templates/dependencies/stengg-foundation/ui-bootstrap/modal/window.html';
        }
    }
    UIBootstrapConfigurator.$inject = ['$uibModalProvider'];

    $module.config(UIBootstrapConfigurator);


    function mdIconProviderConfig($mdIconProvider:ng.material.IIconProvider) {

        $mdIconProvider
            .icon("clear", "./images/dependencies/stengg-foundation/ic_clear_white_24px.svg")
            .icon("settings", "./images/dependencies/stengg-foundation/ic_settings_white_24px.svg")
            .icon("warning", "./images/dependencies/stengg-foundation/ic_warning_white_24px.svg")
            .icon('volume:off', './images/dependencies/stengg-foundation/ic_volume_off_white_24px.svg')
            .icon('volume:up', './images/dependencies/stengg-foundation/ic_volume_up_white_24px.svg')
            .icon('volume:mute', './images/dependencies/stengg-foundation/ic_volume_mute_white_24px.svg')
        ;
    };
    mdIconProviderConfig.$inject = ['$mdIconProvider'];

    $module.config(mdIconProviderConfig);

    

    /*****************************************************
     *
     * SOUNDS
     * Sets up sounds and register them
     *
     ****************************************************/


    function SoundServiceConfigFn($soundProvider) {
        $soundProvider
            .sound('service-problem:new', './sounds/dependencies/stengg-theme-agilis-skyblue/alarm-frenzy.mp3');
    }
    SoundServiceConfigFn.$inject = ['$soundProvider'];

    $module.config(SoundServiceConfigFn);
}