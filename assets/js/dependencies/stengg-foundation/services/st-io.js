/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../index.d.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var $module = angular.module('st.foundation');
        var ConvexIOProvider = (function () {
            function ConvexIOProvider() {
                this.$get = ['$window', function ($window) {
                        var $io = _.get($window, 'io');
                        $io.socket.emit = function (event, msg) {
                            this._raw.emit(event, msg);
                        };
                        return $io;
                    }];
            }
            return ConvexIOProvider;
        }());
        foundation.ConvexIOProvider = ConvexIOProvider;
        $module.provider('$io', ConvexIOProvider);
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-io.js.map