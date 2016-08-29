/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../index.d.ts" />
/// <reference path="../../../swagger.d.ts" />

module st.foundation {

    import ISails = sails.ISails;
    import ISailsIO = sails.ISailsIO;

    
    var $module:ng.IModule = angular.module('st.foundation');


    export class SailsProvider implements ng.IServiceProvider {
        public $get:any = ['$q', function ($q:ng.IQService):ISails {
            var $sails:ISails = {
                io: <ISailsIO><any>_.get(io, 'sails')
            };
            return $sails;
        }];
    }
    
    $module.provider('$sails', SailsProvider);
}