/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="st-uuid.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        function STIncludeStaticDirective($http, $templateCache, $compile) {
            return {
                restrict: 'AE',
                replace: true,
                scope: false,
                link: function ($scope, $element, $attrs) {
                    $attrs.$observe('stSrc', function (stSrc) {
                        $http
                            .get(stSrc, { cache: $templateCache })
                            .success(function (response) {
                            var contents = $element.html(response).contents();
                            $compile(contents)($scope);
                        });
                    });
                }
            };
        }
        foundation.STIncludeStaticDirective = STIncludeStaticDirective;
        STIncludeStaticDirective.$inject = ['$http', '$templateCache', '$compile'];
        angular.module('st.foundation')
            .directive('stIncludeStatic', STIncludeStaticDirective);
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-include-static.js.map