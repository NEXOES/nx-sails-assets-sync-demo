/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="st-uuid.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var $module = angular.module('st.foundation');
        var STJSONController = (function () {
            function STJSONController() {
            }
            return STJSONController;
        }());
        foundation.STJSONController = STJSONController;
        STJSONController.$inject = [];
        function STJSONDirective($http, $cacheFactory) {
            return {
                restrict: 'E',
                require: ['stJson', 'ngModel'],
                scope: false,
                controller: STJSONController,
                link: function ($scope, $element, $attrs, $ctrls) {
                    var ctrl = $ctrls[0];
                    var ngModelCtrl = $ctrls[1];
                    $attrs.$observe('stSrc', function (src) {
                        $attrs.$set('src', src);
                    });
                    $attrs.$observe('src', function (src) {
                        $http.get(src)
                            .then(function (data) {
                            data = data.data;
                            // TODO should be refined
                            if (_.has($attrs, 'stDataRootSelector')) {
                                data = _.get(data, _.get($attrs, 'stDataRootSelector'));
                            }
                            if (ctrl.cache) {
                                var cache = ctrl.cache;
                                if (_.isArray(data)) {
                                    data = _.map(data, function (item) {
                                        var _item = cache.get(item.id);
                                        if (!_item) {
                                            _item = cache.put(item.id, item);
                                        }
                                        return _item;
                                    });
                                }
                                else {
                                    var _item = cache.get(data.id);
                                    if (!_item) {
                                        _item = cache.put(data.id, data);
                                    }
                                    data = _item;
                                }
                            }
                            ngModelCtrl.$setViewValue(data);
                        });
                    });
                    $attrs.$observe('stCache', function (cacheName) {
                        ctrl.cache = $cacheFactory.get(cacheName);
                    });
                }
            };
        }
        foundation.STJSONDirective = STJSONDirective;
        ;
        STJSONDirective.$inject = ['$http', '$cacheFactory'];
        $module.directive('stJson', STJSONDirective);
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-json.js.map