/// <reference path="../../../typings/browser.d.ts" />

module st.foundation {

    var $module:ng.IModule = angular.module('st.foundation');


    export function STFiltersByProperty():Function {
        var filterFn:Function = function (items:Array<any>, property:string, value:string):any {
            return _.find(items, _.set({}, property, value));
        };
        return filterFn;
    };
    STFiltersByProperty.$inject = [];

    $module.filter('STFiltersByProperty', STFiltersByProperty);
}