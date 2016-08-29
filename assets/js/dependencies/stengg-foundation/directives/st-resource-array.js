/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="st-uuid.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var $module = angular.module('st.foundation');
        var ResourceArrayModelFactory = (function () {
            function ResourceArrayModelFactory() {
            }
            ResourceArrayModelFactory.generate = function (context) {
                var $model = context.$new(true);
                $model.$new = null; // Override $new since we are using it as a scope, so we reset that
                return $model;
            };
            return ResourceArrayModelFactory;
        }());
        foundation.ResourceArrayModelFactory = ResourceArrayModelFactory;
        var STResourceArrayController = (function () {
            function STResourceArrayController($scope, $http, $q) {
                this.$scope = $scope;
                this.$http = $http;
                this.$q = $q;
                var ctrl = this;
                $scope.$model = ResourceArrayModelFactory.generate($scope);
                $scope.$watch('$model', function ($model) {
                    if ($model) {
                        $model.$watchCollection('data', function (values, oldValues) {
                            var removedItems = _.difference(oldValues, values);
                            _.forEach(removedItems, function (addedItem) {
                                ctrl.removeItem(addedItem);
                            });
                            var addedItems = _.difference(values, oldValues);
                            _.forEach(addedItems, function (addedItem) {
                                ctrl.addItem(addedItem);
                            });
                        });
                        $model.$watch('$new', function ($new) {
                            if ($new) {
                                $new.$save = function () {
                                    $scope.$model.data.push(this);
                                    $scope.$model.$new = null;
                                };
                            }
                        });
                        $model.$destroy = function (item) {
                            var $model = ctrl.$scope.$model;
                            _.remove($model.data, item);
                        };
                    }
                });
                $scope.$watchGroup(['$model', 'uuid'], function (values) {
                    if (_.compact(values).length < 2) {
                        return;
                    }
                    if (ctrl.saveEventListener) {
                        ctrl.saveEventListener();
                    }
                    var uuid = $scope.$model.uuid = values[1];
                    ctrl.removeItemEventListener = $scope.$on(uuid + ':remove:item', function ($event, args) {
                        $scope.$model.$broadcast('remove:item', args);
                    });
                });
                $scope.$watchGroup(['stResourceContext', 'stResourceService', 'stResourceFilter'], function (values) {
                    if (values[0] && values[1]) {
                        ctrl.findAll();
                    }
                });
            }
            STResourceArrayController.prototype.findAll = function () {
                var ctrl = this;
                var $scope = ctrl.$scope;
                ctrl.$http({
                    method: 'POST',
                    url: '/' + $scope.stResourceContext + '/' + $scope.stResourceService,
                    params: {
                        action: 'findAll'
                    },
                    data: {
                        filter: $scope.resourceFilter
                    }
                })
                    .then(function (result) {
                    if (!$scope.$model) {
                        $scope.$model = ResourceArrayModelFactory.generate($scope);
                    }
                    $scope.$model.data = result.data;
                })
                    .catch(function (err) {
                    $scope.$error = err;
                });
            };
            STResourceArrayController.prototype.removeItem = function (item) {
                var ctrl = this;
                var $scope = ctrl.$scope;
                var $proc = item.$process = ctrl.$http({
                    method: 'POST',
                    url: '/' + $scope.stResourceContext + '/' + $scope.stResourceService,
                    params: {
                        action: 'destroyOne'
                    },
                    data: {
                        id: item.id
                    }
                })
                    .then(function (result) {
                    _.extend(item, result);
                    ctrl.notify($i18n.DESTROY_ONE_RESOLVE);
                })
                    .catch(function (err) {
                    item.$error = err;
                    ctrl.notify($i18n.DESTROY_ONE_REJECT);
                })
                    .finally(function () {
                    item.$process = null;
                });
                return $proc;
            };
            STResourceArrayController.prototype.addItem = function (item) {
                var ctrl = this;
                var $scope = ctrl.$scope;
                var $proc = item.$process = ctrl.$http({
                    method: 'POST',
                    url: '/' + $scope.stResourceContext + '/' + $scope.stResourceService,
                    params: {
                        action: 'saveOne'
                    },
                    data: item
                });
                $proc
                    .then(function (result) {
                    _.extend(item, result.data);
                })
                    .catch(function (err) {
                    item.$error = err;
                })
                    .finally(function () {
                    item.$process = null;
                });
                return $proc;
            };
            STResourceArrayController.prototype.setResourceFilter = function (resourceFilter) {
                this.$scope.resourceFilter = resourceFilter;
            };
            return STResourceArrayController;
        }());
        foundation.STResourceArrayController = STResourceArrayController;
        STResourceArrayController.$inject = ['$scope', '$http', '$q'];
        function STResourceArrayDirective($parse) {
            return {
                restrict: 'AE',
                require: ['ngModel', '?stUuid'],
                scope: {
                    stResourceContext: '@',
                    stResourceService: '@',
                    stResourceFilter: '@?'
                },
                controller: STResourceArrayController,
                link: function ($scope, $element, $attrs, controllers) {
                    var uuidCtrl = controllers[1];
                    if (uuidCtrl) {
                        uuidCtrl.render = function (uuid) {
                            $scope.uuid = uuid;
                        };
                    }
                    var ngModelCtrl = controllers[0];
                    ngModelCtrl.$formatters.push(function (modelValue) {
                        return modelValue;
                    });
                    ngModelCtrl.$parsers.push(function (viewValue) {
                        return viewValue;
                    });
                    $scope.$watch('$model', function (value) {
                        ngModelCtrl.$setViewValue(value);
                    });
                    ngModelCtrl.$render = function () {
                        $scope.$model = ngModelCtrl.$viewValue;
                    };
                }
            };
        }
        foundation.STResourceArrayDirective = STResourceArrayDirective;
        ;
        STResourceArrayDirective.$inject = ['$parse'];
        $module.directive('stResourceArray', STResourceArrayDirective);
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-resource-array.js.map