/// <reference path="../../../typings/browser.d.ts" />

module st.foundation {

    var $module:ng.IModule = angular.module('st.foundation');


    export function STFiltersByID():Function {
        var filterFn:Function = function (items:Array<any>, id:string):any {
            return _.find(items, { id: id});
        };
        return filterFn;
    };
    STFiltersByID.$inject = [];

    $module.filter('STFiltersByID', STFiltersByID);
}