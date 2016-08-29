/// <reference path="../../typings/browser.d.ts" />

module st.foundation {
    angular.module('st.foundation', [
        'ui.router', 'ui.bootstrap',
        'LocalStorageModule',
        'js-data',
        'ngMaterial',
        'angular-uuid',
        'mdColorPicker', 'nxDatetimePicker',
        'dndLists'
    ]);
}