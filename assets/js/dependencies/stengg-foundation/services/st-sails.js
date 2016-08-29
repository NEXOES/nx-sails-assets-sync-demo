/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../index.d.ts" />
/// <reference path="../../../swagger.d.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var $module = angular.module('st.foundation');
        var SailsProvider = (function () {
            function SailsProvider() {
                this.$get = ['$q', function ($q) {
                        var $sails = {
                            io: _.get(io, 'sails')
                        };
                        return $sails;
                    }];
            }
            return SailsProvider;
        }());
        foundation.SailsProvider = SailsProvider;
        $module.provider('$sails', SailsProvider);
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-sails.js.map