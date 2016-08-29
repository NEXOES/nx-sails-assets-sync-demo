/// <reference path="../../../typings/browser.d.ts" />

module st.foundation {

    var $module:ng.IModule = angular.module('st.foundation');


    export function STFiltersNotNullOrUndefined():Function {
        var filterFn:Function = function (items:Array<any>, property:string):any {
            return _.filter(items, function (item:any):boolean {
                var value:any = _.get(item, property);
                return !_.isNull(value) && !_.isUndefined(value);
            })
        };
        return filterFn;
    };
    STFiltersNotNullOrUndefined.$inject = [];

    $module.filter('NotNullOrUndefined', STFiltersNotNullOrUndefined);
}