/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="../../../index.d.ts" />

module st.foundation {

    export interface INotify {
        toast(message):ng.IPromise<any>;
    }

    export class Notify implements INotify {

        constructor(private $mdToast:ng.material.IToastService) {

        }
        
        public toast(message:string) : ng.IPromise<any> {
            return this.$mdToast.show(this.$mdToast.simple().textContent(message));
        }
    }
    Notify.$inject = ['$mdToast'];

    angular.module('st.foundation')
        .service('$notify', Notify)
}