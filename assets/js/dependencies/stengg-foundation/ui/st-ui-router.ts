/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="../../../index.d.ts" />

module st.foundation.ui {

    export class RouterConfig {

        constructor(private $window:ng.IWindowService, private $rootScope:ng.IRootScopeService, private $state:IStateService) {

            _.extend($state, {
                back: function() : void {
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
    }
    RouterConfig.$inject = ['$window', '$rootScope', '$state'];

    angular.module('st.foundation')
        .run(RouterConfig);
}