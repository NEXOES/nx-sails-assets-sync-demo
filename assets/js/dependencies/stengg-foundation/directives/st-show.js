/// <reference path="../../../typings/browser.d.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var $module = angular.module('st.foundation');
        function STShowDirective($parse, $mdSidenav) {
            return {
                restrict: 'A',
                scope: false,
                link: function ($scope, $element, $attrs) {
                    $attrs.$observe('stShow', function (stShowExpr) {
                        $scope.$watch(stShowExpr, function (stShow) {
                            var targetId = _.get($attrs, 'mdComponentId');
                            var target = $mdSidenav(targetId);
                            stShow ? target.open() : target.close();
                        });
                    });
                }
            };
        }
        ;
        STShowDirective.$inject = ['$parse', '$mdSidenav'];
        $module.directive('stShow', STShowDirective);
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-show.js.map