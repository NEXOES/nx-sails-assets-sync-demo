/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="../../../index.d.ts" />

module st.foundation {

    var $module:ng.IModule = angular.module('st.foundation');


    export class STFileSaverService implements st.foundation.ISTFileSaverService {

        constructor(private $q:ng.IQService) {
        }

        saveAsText(text:string, name:string):ng.IPromise<any> {
            var $proc:ng.IDeferred<any> = this.$q.defer();

            download(text, name);

            return $proc.promise;
        }

        saveAsImage(image:any, name:string, type:string):ng.IPromise<any> {
            var $proc:ng.IDeferred<any> = this.$q.defer();

            download(image, name, type);

            return $proc.promise;
        }

        saveAsPNG(image:any, name:string):ng.IPromise<any> {
            return this.saveAsImage(image, name, 'png');
        }
    }
    STFileSaverService.$inject = ['$q'];


    export function STFileSaverServiceFactory($q:ng.IQService):STFileSaverService {
        return new STFileSaverService($q);
    };
    STFileSaverServiceFactory.$inject = ['$q'];


    $module.factory('$fileSaver', STFileSaverServiceFactory);
}