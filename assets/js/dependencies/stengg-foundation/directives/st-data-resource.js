/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="../../../index.d.ts" />
/// <reference path="st-uuid.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var $module = angular.module('st.foundation');
        var DataResourceModelFactory = (function () {
            function DataResourceModelFactory() {
            }
            DataResourceModelFactory.generate = function (context) {
                return context.$new(true);
            };
            return DataResourceModelFactory;
        }());
        foundation.DataResourceModelFactory = DataResourceModelFactory;
        var STDataResourceController = (function () {
            function STDataResourceController($scope, $http, $q, $interval) {
                this.$scope = $scope;
                this.$http = $http;
                this.$q = $q;
                this.$interval = $interval;
                var ctrl = this;
                $scope.$watchGroup(['dataDefinition', 'resourceFilterId'], function (values) {
                    ctrl.fetch(values);
                });
                $scope.$watch('$uuid', function (uuid) {
                    if (uuid) {
                        $scope.$on(uuid + ':save', function ($event) {
                            var $process;
                            // HACK to satisfy drawings
                            if (_.has($scope, '$model.data.drawingInfos')) {
                                $scope.$model.getData(function ($data) {
                                    var $data = JSON.stringify($data);
                                    $scope.$model.data.drawingInfos[0].drawingData = $data;
                                    if ($scope.$model.data.id) {
                                        $process = $scope.dataDefinition.update($scope.$model.data.id, $scope.$model.data);
                                    }
                                    else {
                                        $process = $scope.dataDefinition.create($scope.$model.data);
                                    }
                                    $scope.$model.$process = $process;
                                    $process
                                        .then(function (result) {
                                        _.extend($scope.$model.data, result);
                                    })
                                        .catch(function (err) {
                                        $scope.$error = err;
                                    })
                                        .finally(function () {
                                        $scope.$model.$process = null;
                                    });
                                });
                                return;
                            }
                            if ($scope.$model.data.id) {
                                $process = $scope.dataDefinition.update($scope.$model.data.id, $scope.$model.data);
                            }
                            else {
                                $process = $scope.dataDefinition.create($scope.$model.data);
                            }
                            $scope.$model.$process = $process;
                            $process
                                .then(function (result) {
                                _.extend($scope.$model.data, result);
                            })
                                .catch(function (err) {
                                $scope.$error = err;
                            })
                                .finally(function () {
                                $scope.$model.$process = null;
                            });
                        });
                    }
                });
            }
            STDataResourceController.prototype.fetch = function (values) {
                var ctrl = this;
                var $scope = ctrl.$scope;
                if (!values) {
                    values = [
                        $scope.dataDefinition,
                        $scope.resourceFilterId
                    ];
                }
                if (values[0] && values[1]) {
                    if (values[1] == '*') {
                        var params = null;
                        var options = {
                            bypassCache: ctrl.$refreshManager ? true : false
                        };
                        $scope.dataDefinition.findAll(params, options)
                            .then(function (result) {
                            if (!$scope.$model) {
                                $scope.$model = DataResourceModelFactory.generate($scope);
                            }
                            $scope.$model.data = result;
                        })
                            .catch(function (err) {
                            $scope.$error = err;
                        });
                    }
                    else if (values[1] && values[1].length > 0) {
                        $scope.dataDefinition.find(values[1])
                            .then(function (result) {
                            if (!$scope.$model) {
                                $scope.$model = DataResourceModelFactory.generate($scope);
                            }
                            $scope.$model.data = result;
                        })
                            .catch(function (err) {
                            $scope.$error = err;
                        });
                    }
                }
            };
            STDataResourceController.prototype.setResourceFilter = function (resourceFilter) {
                this.$scope.resourceFilter = resourceFilter;
            };
            STDataResourceController.prototype.setRefreshInterval = function (refreshInterval) {
                var ctrl = this;
                if (refreshInterval) {
                    ctrl.$refreshManager = ctrl.$interval(function () {
                        ctrl.fetch();
                    }, refreshInterval);
                }
            };
            return STDataResourceController;
        }());
        foundation.STDataResourceController = STDataResourceController;
        STDataResourceController.$inject = ['$scope', '$http', '$q', '$interval'];
        function STDataResourceDirective($parse) {
            return {
                restrict: 'AE',
                require: ['stDataResource', 'ngModel', 'stDataDefinition', '?stUuid', '?stProcessMonitor'],
                scope: {},
                controller: STDataResourceController,
                link: function ($scope, $element, $attrs, controllers) {
                    $attrs.$observe('stResourceFilterId', function (stResourceFilterIdExpr) {
                        if (stResourceFilterIdExpr == '*') {
                            $scope.resourceFilterId = stResourceFilterIdExpr;
                            return;
                        }
                        $scope.$parent.$watch(stResourceFilterIdExpr, function (stFilterResourceId) {
                            $scope.resourceFilterId = stFilterResourceId;
                        });
                    });
                    $attrs.$observe('stRefreshInterval', function (refreshInterval) {
                        ctrl.setRefreshInterval(refreshInterval);
                    });
                    var ctrl = controllers[0];
                    var ngModelCtrl = controllers[1];
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
                    var stDataDefCtrl = controllers[2];
                    if (stDataDefCtrl) {
                        stDataDefCtrl.$render = function (value) {
                            $scope.dataDefinition = value;
                        };
                    }
                    var uuidCtrl = controllers[3];
                    if (uuidCtrl) {
                        uuidCtrl.$render = function (uuid) {
                            $scope.$uuid = uuid;
                        };
                    }
                    var processMonCtrl = controllers[4];
                    if (processMonCtrl) {
                        $scope.$watch('$model.$process', function ($process) {
                            $process ? processMonCtrl.push() : processMonCtrl.pop();
                        });
                    }
                }
            };
        }
        foundation.STDataResourceDirective = STDataResourceDirective;
        ;
        STDataResourceDirective.$inject = ['$parse'];
        $module.directive('stDataResource', STDataResourceDirective);
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-data-resource.js.map