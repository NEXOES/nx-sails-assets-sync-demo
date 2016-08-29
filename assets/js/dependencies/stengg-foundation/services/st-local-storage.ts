/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="../../../index.d.ts" />

module st.foundation {

    export function STLocalStorageStorageProvider(localStorageServiceProvider:any) {
        return localStorageServiceProvider;
    }
    STLocalStorageStorageProvider.$inject = ['localStorageServiceProvider'];

    angular.module('st.foundation')
        .provider('$localStorage', STLocalStorageStorageProvider);
}