/// <reference path="../../../typings/browser.d.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var $module = angular.module('st.foundation');
        function STFiltersByID() {
            var filterFn = function (items, id) {
                return _.find(items, { id: id });
            };
            return filterFn;
        }
        foundation.STFiltersByID = STFiltersByID;
        ;
        STFiltersByID.$inject = [];
        $module.filter('STFiltersByID', STFiltersByID);
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-filters-byid.js.map