/// <reference path="../../../typings/browser.d.ts" />

module st.foundation {

    var $module:ng.IModule = angular.module('st.foundation');


    export interface ISTHeaderScope extends ng.IScope {
    }


    export function STHeaderDirectiveLinkFn($scope:ISTHeaderScope,
                                         $element:JQuery,
                                         $attrs:ng.IAttributes) {
    }

    function STHeaderDirective():ng.IDirective {
        return {
            restrict: 'AE',
            replace: true,
            transclude: true,
            scope: {},
            templateUrl: 'templates/dependencies/stengg-foundation/st-header.html',
            link: STHeaderDirectiveLinkFn
        };
    };
    STHeaderDirective.$inject = [];

    $module.directive('stHeader', STHeaderDirective);
}