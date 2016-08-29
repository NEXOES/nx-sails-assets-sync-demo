/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../index.d.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var $module = angular.module('st.foundation');
        var SoundButtonController = (function () {
            function SoundButtonController($scope, $localStorage) {
                this.$scope = $scope;
                this.$localStorage = $localStorage;
                var ctrl = this;
                Object.defineProperties(ctrl.$scope, {
                    '$volume': {
                        get: function () {
                            return Howler.volume();
                        },
                        set: function (value) {
                            Howler.volume(value);
                            return ctrl;
                        }
                    }
                });
                ctrl.$localStorage.bind(ctrl.$scope, '$volume', 1, 'volume');
            }
            SoundButtonController.prototype.toggle = function () {
                var ctrl = this;
                ctrl.$scope.$volume = ctrl.$scope.$volume != 0 ? 0 : 1;
            };
            return SoundButtonController;
        }());
        foundation.SoundButtonController = SoundButtonController;
        SoundButtonController.$inject = ['$scope', '$localStorage'];
        function SoundButtonDirective() {
            return {
                restrict: 'AE',
                replace: true,
                scope: {},
                templateUrl: 'templates/dependencies/stengg-foundation/components/st-sound-button.html',
                controller: SoundButtonController,
                controllerAs: 'ctrl'
            };
        }
        foundation.SoundButtonDirective = SoundButtonDirective;
        SoundButtonDirective.$inject = [];
        $module.directive('stSoundButton', SoundButtonDirective);
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=sound-button.js.map