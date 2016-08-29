/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../index.d.ts" />

module st.foundation {


    import IConvexIO = nx.convex.IConvexIO;
    import IConvexSocketEventMessage = nx.convex.IConvexSocketEventMessage;


    var $module:ng.IModule = angular.module('st.foundation');


    export class ConvexIOProvider implements ng.IServiceProvider {

        public $get:any = ['$window', function ($window:ng.IWindowService):IConvexIO {

            var $io:IConvexIO = <IConvexIO><any>_.get($window,'io');

            $io.socket.emit = function(event:string, msg:IConvexSocketEventMessage) : void {
                this._raw.emit(event, msg);
            };

            return $io;
        }];
    }
    
    $module.provider('$io', ConvexIOProvider);
}