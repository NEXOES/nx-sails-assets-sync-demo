/// <reference path="../../../typings/browser.d.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var $module = angular.module('st.foundation');
        function STFiltersKeys() {
            var filterFn = function (obj, filter) {
                if (!_.isObject(obj)) {
                    return null;
                }
                return _.intersection(_.keysIn(obj), filter);
            };
            return filterFn;
        }
        foundation.STFiltersKeys = STFiltersKeys;
        ;
        STFiltersKeys.$inject = [];
        $module.filter('STFiltersKeys', STFiltersKeys);
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-filters-keys.js.map