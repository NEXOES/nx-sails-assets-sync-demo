/// <reference path="../../../typings/browser.d.ts" />

module st.foundation {

    var $module:ng.IModule = angular.module('st.foundation');


    export function STFiltersKeys():Function {
        var filterFn:Function = function (obj:any, filter:Array<string>):Array<string> {
            if(!_.isObject(obj)) {
                return null;
            }
            return _.intersection(_.keysIn(obj), filter);
        };
        return filterFn;
    };
    STFiltersKeys.$inject = [];

    $module.filter('STFiltersKeys', STFiltersKeys); 
}