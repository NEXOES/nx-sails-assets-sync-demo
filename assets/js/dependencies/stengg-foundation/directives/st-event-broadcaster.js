/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="st-uuid.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var $module = angular.module('st.foundation');
        var STEventBroadcasterController = (function () {
            function STEventBroadcasterController($rootScope, $scope, $http, $q) {
                this.$rootScope = $rootScope;
                this.$scope = $scope;
                this.$http = $http;
                this.$q = $q;
                var ctrl = this;
                $scope.$watch('uuid', function (uuid) {
                    if (uuid) {
                        $scope.$parent[uuid] = ctrl.$broadcast;
                    }
                });
                ctrl.$broadcast = function (event, args) {
                    ctrl.$rootScope.$broadcast(event, args);
                };
            }
            return STEventBroadcasterController;
        }());
        foundation.STEventBroadcasterController = STEventBroadcasterController;
        STEventBroadcasterController.$inject = ['$rootScope', '$scope', '$http', '$q'];
        function STEventBroadcasterDirective($parse) {
            return {
                restrict: 'AE',
                require: ['stUuid'],
                scope: {},
                controller: STEventBroadcasterController,
                link: function ($scope, $element, $attrs, controllers) {
                    var uuidCtrl = controllers[0];
                    uuidCtrl.render = function (uuid) {
                        $scope.uuid = uuid;
                    };
                }
            };
        }
        foundation.STEventBroadcasterDirective = STEventBroadcasterDirective;
        ;
        STEventBroadcasterDirective.$inject = ['$parse'];
        $module.directive('stEventBroadcaster', STEventBroadcasterDirective);
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-event-broadcaster.js.map