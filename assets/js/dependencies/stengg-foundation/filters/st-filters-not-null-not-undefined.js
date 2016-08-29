/// <reference path="../../../typings/browser.d.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var $module = angular.module('st.foundation');
        function STFiltersNotNullOrUndefined() {
            var filterFn = function (items, property) {
                return _.filter(items, function (item) {
                    var value = _.get(item, property);
                    return !_.isNull(value) && !_.isUndefined(value);
                });
            };
            return filterFn;
        }
        foundation.STFiltersNotNullOrUndefined = STFiltersNotNullOrUndefined;
        ;
        STFiltersNotNullOrUndefined.$inject = [];
        $module.filter('NotNullOrUndefined', STFiltersNotNullOrUndefined);
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-filters-not-null-not-undefined.js.map