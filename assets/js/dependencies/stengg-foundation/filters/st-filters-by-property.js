/// <reference path="../../../typings/browser.d.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var $module = angular.module('st.foundation');
        function STFiltersByProperty() {
            var filterFn = function (items, property, value) {
                return _.find(items, _.set({}, property, value));
            };
            return filterFn;
        }
        foundation.STFiltersByProperty = STFiltersByProperty;
        ;
        STFiltersByProperty.$inject = [];
        $module.filter('STFiltersByProperty', STFiltersByProperty);
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-filters-by-property.js.map