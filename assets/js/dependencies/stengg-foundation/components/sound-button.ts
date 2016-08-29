/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../index.d.ts" />

module st.foundation {

    var $module:ng.IModule = angular.module('st.foundation');


    export interface ISoundButtonScope extends ng.IScope {
        $volume:number
    }

    export class SoundButtonController {

        constructor(private $scope:ISoundButtonScope, private $localStorage:angular.local.storage.ILocalStorageService) {
            var ctrl:SoundButtonController = this;

            Object.defineProperties(ctrl.$scope, {
                '$volume': {
                    get: function ():number {
                        return Howler.volume();
                    },
                    set: function (value:number):SoundButtonController {
                        Howler.volume(value);
                        return ctrl;
                    }
                }
            });

            ctrl.$localStorage.bind(ctrl.$scope, '$volume', 1, 'volume');
        }

        public toggle():void {
            var ctrl:SoundButtonController = this;
            ctrl.$scope.$volume = ctrl.$scope.$volume != 0 ? 0 : 1;
        }
    }
    SoundButtonController.$inject = ['$scope', '$localStorage'];


    export function SoundButtonDirective():ng.IDirective {
        return {
            restrict: 'AE',
            replace: true,
            scope: {},
            templateUrl: 'templates/dependencies/stengg-foundation/components/st-sound-button.html',
            controller: SoundButtonController,
            controllerAs: 'ctrl',
        }
    }

    SoundButtonDirective.$inject = [];


    $module.directive('stSoundButton', SoundButtonDirective);
}