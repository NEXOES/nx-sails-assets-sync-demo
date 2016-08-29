/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="st-uuid.ts" />

module st.foundation {

    export function clearObject(obj:any) : any {
        for (var variableKey in obj){
            if (obj.hasOwnProperty(variableKey)){
                delete obj[variableKey];
            }
        }
        return obj;
    }

    export function assignObject(destination:any, source:any) : any {
        return _.assign(destination, source);
    }

    angular.module('st.foundation')
        .constant('$clearObject', clearObject)
        .constant('$assignObject', assignObject);
}