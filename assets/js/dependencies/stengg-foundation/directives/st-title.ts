/// <reference path="../../../typings/browser.d.ts" />

module st.foundation {

    var $module:ng.IModule = angular.module('st.foundation');


    export interface ISTTitleScope extends ng.IScope {
    }


    export function STTitleDirectiveLinkFn($scope:ISTTitleScope,
                                               $element:JQuery,
                                               $attrs:ng.IAttributes) {
    }

    function STTitleDirective():ng.IDirective {
        return {
            restrict: 'AE',
            replace: true,
            transclude: true,
            scope: {},
            template: '<h1 class="st-title" ng-transclude></h1>',
            link: STTitleDirectiveLinkFn
        };
    };
    STTitleDirective.$inject = [];

    $module.directive('stTitle', STTitleDirective);
}