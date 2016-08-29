/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="../../../index.d.ts" />

module st.foundation {

    var $module:ng.IModule = angular.module('st.foundation');


    export class BackButtonController {

        constructor(private $state:st.foundation.ui.IStateService) {
        }

        public back() : void {
            this.$state.back();
        }
    }
    BackButtonController.$inject = ['$state'];


    export function BackButtonDirective():ng.IDirective {
        return {
            restrict: 'AE',
            replace: true,
            scope: {},
            templateUrl: 'templates/dependencies/stengg-foundation/components/st-back-button.html',
            controller: BackButtonController,
            controllerAs: '$ctrl',
        }
    }
    BackButtonDirective.$inject = [];


    $module.directive('stBackButton', BackButtonDirective);
}