/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="st-uuid.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var $module = angular.module('st.foundation');
        var ResourceModelFactory = (function () {
            function ResourceModelFactory() {
            }
            ResourceModelFactory.generate = function (context) {
                return context.$new(true);
            };
            return ResourceModelFactory;
        }());
        foundation.ResourceModelFactory = ResourceModelFactory;
        var STResourceController = (function () {
            function STResourceController($scope, $http, $q) {
                this.$scope = $scope;
                this.$http = $http;
                this.$q = $q;
                var ctrl = this;
                // JS-DATA implementation
                $scope.$watchGroup(['dataDefinition'], function (values) {
                    if (_.compact(values).length < 1) {
                        return;
                    }
                    $scope.dataDefinition.findAll()
                        .then(function (result) {
                        if (!$scope.$model) {
                            $scope.$model = ResourceModelFactory.generate($scope);
                        }
                        $scope.$model.data = result;
                    })
                        .catch(function (err) {
                        $scope.$error = err;
                    });
                });
                // ST-FOUNDATION integrated resource model
                $scope.$watchGroup(['$model', 'uuid'], function (values) {
                    if (_.compact(values).length < 2) {
                        return;
                    }
                    if (ctrl.saveEventListener) {
                        ctrl.saveEventListener();
                    }
                    var uuid = $scope.$model.uuid = values[1];
                    ctrl.saveEventListener = $scope.$on(uuid + ':save', function ($event) {
                        ctrl.save();
                    });
                    ctrl.removeItemEventListener = $scope.$on(uuid + ':remove:item', function ($event, args) {
                        $scope.$model.$broadcast('remove:item', args);
                    });
                    $scope.$model.$on('added:item', function ($event, args) {
                        $scope.$broadcast('change', args);
                    });
                    $scope.$model.$on('removed:item', function ($event, args) {
                        $scope.$broadcast('change', args);
                    });
                });
                $scope.$watchGroup(['stResourceContext', 'stResourceService', 'stResourceFilterId', 'resourceFilter'], function (values) {
                    if (values[0] && values[1]) {
                        ctrl.find();
                    }
                });
            }
            STResourceController.prototype.find = function () {
                var ctrl = this;
                var $scope = ctrl.$scope;
                ctrl.$http({
                    method: 'POST',
                    url: '/' + $scope.stResourceContext + '/' + $scope.stResourceService,
                    params: {
                        action: ($scope.stResourceFilterId ? 'findOne' : 'findAll')
                    },
                    data: {
                        id: $scope.stResourceFilterId,
                        filter: $scope.resourceFilter
                    }
                })
                    .then(function (result) {
                    if (!$scope.$model) {
                        $scope.$model = ResourceModelFactory.generate($scope);
                    }
                    $scope.$model.data = result.data;
                })
                    .catch(function (err) {
                    $scope.$error = err;
                });
            };
            STResourceController.prototype.save = function () {
                var ctrl = this;
                var $scope = ctrl.$scope;
                var $model = $scope.$model;
                var $proc = $model.$process = ctrl.$q.defer();
                $model.writer.getFigures = function () {
                    return this.figures;
                };
                $model.writer.marshal($model.context, function (data) {
                    var $proc = $model.$process = ctrl.$http({
                        method: 'POST',
                        url: '/' + $scope.stResourceContext + '/' + $scope.stResourceService,
                        params: {
                            action: 'saveOne'
                        },
                        data: {
                            id: $scope.stResourceFilterId,
                            filter: $scope.resourceFilter,
                            data: data
                        }
                    })
                        .then(function (result) {
                    })
                        .catch(function (err) {
                        $scope.$error = err;
                    })
                        .finally(function () {
                        $scope.$model.$process = null;
                    });
                });
                return $proc.promise;
            };
            STResourceController.prototype.setResourceFilter = function (resourceFilter) {
                this.$scope.resourceFilter = resourceFilter;
            };
            return STResourceController;
        }());
        foundation.STResourceController = STResourceController;
        STResourceController.$inject = ['$scope', '$http', '$q'];
        function STResourceDirective($parse) {
            return {
                restrict: 'AE',
                require: ['ngModel', '?stUuid', '?stDataDefinition'],
                scope: {
                    stResourceContext: '@',
                    stResourceService: '@'
                },
                controller: STResourceController,
                link: function ($scope, $element, $attrs, controllers) {
                    $attrs.$observe('stResourceFilterId', function (stResourceFilterIdExpr) {
                        $scope.$parent.$watch(stResourceFilterIdExpr, function (stFilterResourceId) {
                            $scope.stResourceFilterId = stFilterResourceId;
                        });
                    });
                    var uuidCtrl = controllers[1];
                    if (uuidCtrl) {
                        uuidCtrl.$render = function (uuid) {
                            $scope.uuid = uuid;
                        };
                    }
                    var stDataDefCtrl = controllers[2];
                    if (stDataDefCtrl) {
                        stDataDefCtrl.$render = function (value) {
                            $scope.dataDefinition = value;
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
        foundation.STResourceDirective = STResourceDirective;
        ;
        STResourceDirective.$inject = ['$parse'];
        $module.directive('stResource', STResourceDirective);
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-resource.js.map