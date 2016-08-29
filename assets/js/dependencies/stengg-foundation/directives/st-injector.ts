/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="st-uuid.ts" />

module st.foundation {

    var $module:ng.IModule = angular.module('st.foundation');

    export function STInjectorDirective($injector:ng.auto.IInjectorService):ng.IDirective {
        return {

            restrict: 'E',

            scope: false,

            link: function ($scope:ng.IScope, $element:JQuery, $attrs:ng.IAttributes) {

                $attrs.$observe('stName', function (name:string) : void {
                    var $model:any = $injector.get(name);
                    _.set($scope, name, $model);
                });
            }
        };
    };
    STInjectorDirective.$inject = ['$injector'];

    $module.directive('stInjector', STInjectorDirective);
}