/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../index.d.ts" />

module st.foundation {

    var $module:ng.IModule = angular.module('st.foundation');


    export interface IBadgeScope extends ng.IScope {
    }

    export class BadgeController {
        constructor(private $scope:IBadgeScope) {
        }
    }
    BadgeController.$inject = ['$scope'];


    export function BadgeDirective():ng.IDirective {
        return {
            restrict: 'AE',
            replace: true,
            transclude: true,
            scope: {},
            template: '<div ng-transclude class="badge"></div>',
            controller: BadgeController,
            controllerAs: 'ctrl',
        }
    }

    BadgeDirective.$inject = [];

    $module.directive('stBadge', BadgeDirective);
}