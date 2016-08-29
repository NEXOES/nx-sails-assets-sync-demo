/// <reference path="../../typings/browser.d.ts" />

module st.foundation {

    var $module:ng.IModule = angular.module('st.foundation');


    var RunFn:Function = function ($window:ng.IWindowService):void {
    };
    RunFn.$inject = ['$window'];

    $module.run(RunFn);


    $module.run([
        '$mdAria',
        function($mdAria:any) : void {

        }
    ]);
}