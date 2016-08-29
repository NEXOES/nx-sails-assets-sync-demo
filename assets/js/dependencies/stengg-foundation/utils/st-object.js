/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="st-uuid.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        function clearObject(obj) {
            for (var variableKey in obj) {
                if (obj.hasOwnProperty(variableKey)) {
                    delete obj[variableKey];
                }
            }
            return obj;
        }
        foundation.clearObject = clearObject;
        function assignObject(destination, source) {
            return _.assign(destination, source);
        }
        foundation.assignObject = assignObject;
        angular.module('st.foundation')
            .constant('$clearObject', clearObject)
            .constant('$assignObject', assignObject);
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-object.js.map