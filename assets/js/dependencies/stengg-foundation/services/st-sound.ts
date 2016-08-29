/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../index.d.ts" />

module st.foundation.sound {


    export class SoundService implements ISoundService {
        constructor(public sounds:any, private $q:ng.IQService) {
        }

        public play(name:string):ng.IPromise<Howl> {

            var $p:ng.IDeferred<Howl> = this.$q.defer();

            var soundDef:ISoundDefinition = <ISoundDefinition>_.get(this.sounds, name);
            var sound:Howl = new Howl({
                src: [soundDef.url]
            });

            sound.play();
            $p.resolve(sound);

            return $p.promise;
        }
    }

    export class SoundServiceProvider implements ISoundServiceProvider {

        public sounds:any = {};

        constructor() {
        }

        public sound(name:string, url:string):ISoundServiceProvider {
            var sound:ISoundDefinition = {
                name: name,
                url: url
            };
            _.set(this.sounds, name, sound);
            return this;
        }

        public $get:any = ['$rootScope', '$q',
            function ($root:ng.IRootScopeService, $q:ng.IQService):ISoundService {
                return new SoundService(this.sounds, $q);
            }
        ];
    }

    angular.module('st.foundation')
        .provider('$sound', SoundServiceProvider)
}