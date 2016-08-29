/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../index.d.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var sound;
        (function (sound_1) {
            var SoundService = (function () {
                function SoundService(sounds, $q) {
                    this.sounds = sounds;
                    this.$q = $q;
                }
                SoundService.prototype.play = function (name) {
                    var $p = this.$q.defer();
                    var soundDef = _.get(this.sounds, name);
                    var sound = new Howl({
                        src: [soundDef.url]
                    });
                    sound.play();
                    $p.resolve(sound);
                    return $p.promise;
                };
                return SoundService;
            }());
            sound_1.SoundService = SoundService;
            var SoundServiceProvider = (function () {
                function SoundServiceProvider() {
                    this.sounds = {};
                    this.$get = ['$rootScope', '$q',
                        function ($root, $q) {
                            return new SoundService(this.sounds, $q);
                        }
                    ];
                }
                SoundServiceProvider.prototype.sound = function (name, url) {
                    var sound = {
                        name: name,
                        url: url
                    };
                    _.set(this.sounds, name, sound);
                    return this;
                };
                return SoundServiceProvider;
            }());
            sound_1.SoundServiceProvider = SoundServiceProvider;
            angular.module('st.foundation')
                .provider('$sound', SoundServiceProvider);
        })(sound = foundation.sound || (foundation.sound = {}));
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-sound.js.map