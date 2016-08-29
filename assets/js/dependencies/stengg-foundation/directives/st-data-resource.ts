/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="../../../index.d.ts" />
/// <reference path="st-uuid.ts" />

module st.foundation {

    import IPromise = angular.IPromise;
    var $module:ng.IModule = angular.module('st.foundation');


    export interface IDataResourceModel extends ng.IScope {
        data:any;
        getData:Function;
        $process:any;
    }

    export class DataResourceModelFactory {
        public static generate(context:ng.IScope):IDataResourceModel {
            return <IDataResourceModel><any>context.$new(true);
        }
    }

    export interface ISTDataResourceScope extends ng.IScope {
        resourceFilterId?:any;
        resourceFilter?:any;
        $model:IDataResourceModel;
        dataDefinition?:any;
        $error?:Error;
        $uuid?:string;
    }


    export class STDataResourceController {

        private $refreshManager:any;

        constructor(public $scope:ISTDataResourceScope, private $http:ng.IHttpService, private $q:ng.IQService, private $interval:ng.IIntervalService) {
            var ctrl:STDataResourceController = this;

            $scope.$watchGroup(['dataDefinition', 'resourceFilterId'], function (values:Array<any>):void {
                ctrl.fetch(values)
            });

            $scope.$watch('$uuid', function (uuid:string):void {

                if (uuid) {

                    $scope.$on(uuid + ':save', function ($event:ng.IAngularEvent):void {

                        var $process:any;


                        // HACK to satisfy drawings
                        if (_.has($scope, '$model.data.drawingInfos')) {

                            $scope.$model.getData(function ($data:any):void {

                                var $data:any = JSON.stringify($data);

                                $scope.$model.data.drawingInfos[0].drawingData = $data;

                                if ($scope.$model.data.id) {
                                    $process = $scope.dataDefinition.update($scope.$model.data.id, $scope.$model.data)
                                }
                                else {
                                    $process = $scope.dataDefinition.create($scope.$model.data)
                                }

                                $scope.$model.$process = $process;

                                $process
                                    .then(function (result:any):void {
                                        _.extend($scope.$model.data, result);
                                    })
                                    .catch(function (err:Error):void {
                                        $scope.$error = err;
                                    })
                                    .finally(function ():void {
                                        $scope.$model.$process = null;
                                    })
                            });

                            return;
                        }


                        if ($scope.$model.data.id) {
                            $process = $scope.dataDefinition.update($scope.$model.data.id, $scope.$model.data)
                        }
                        else {
                            $process = $scope.dataDefinition.create($scope.$model.data)
                        }

                        $scope.$model.$process = $process;

                        $process
                            .then(function (result:any):void {
                                _.extend($scope.$model.data, result);
                            })
                            .catch(function (err:Error):void {
                                $scope.$error = err;
                            })
                            .finally(function ():void {
                                $scope.$model.$process = null;
                            })
                    })
                }
            });
        }

        public fetch(values?:Array<any>):void {

            var ctrl:STDataResourceController = this;
            var $scope:ISTDataResourceScope = ctrl.$scope;

            if (!values) {
                values = [
                    $scope.dataDefinition,
                    $scope.resourceFilterId
                ]
            }

            if (values[0] && values[1]) {

                if (values[1] == '*') {

                    var params:any = null;

                    var options:any = {
                        bypassCache: ctrl.$refreshManager ? true : false
                    };

                    $scope.dataDefinition.findAll(params, options)
                        .then(function (result:any):void {
                            if (!$scope.$model) {
                                $scope.$model = DataResourceModelFactory.generate($scope);
                            }
                            $scope.$model.data = result;
                        })
                        .catch(function (err:Error):void {
                            $scope.$error = err;
                        })
                }
                else if (values[1] && values[1].length > 0) {

                    $scope.dataDefinition.find(values[1])
                        .then(function (result:any):void {
                            if (!$scope.$model) {
                                $scope.$model = DataResourceModelFactory.generate($scope);
                            }
                            $scope.$model.data = result;
                        })
                        .catch(function (err:Error):void {
                            $scope.$error = err;
                        })
                }
            }
        }

        public setResourceFilter(resourceFilter:any):void {
            this.$scope.resourceFilter = resourceFilter;
        }

        public setRefreshInterval(refreshInterval:number):void {
            var ctrl:STDataResourceController = this;
            if (refreshInterval) {
                ctrl.$refreshManager = ctrl.$interval(function () {
                    ctrl.fetch()
                }, refreshInterval);
            }
        }

    }
    STDataResourceController.$inject = ['$scope', '$http', '$q', '$interval'];


    export function STDataResourceDirective($parse:ng.IParseService):ng.IDirective {
        return {

            restrict: 'AE',

            require: ['stDataResource', 'ngModel', 'stDataDefinition', '?stUuid', '?stProcessMonitor'],

            scope: {},

            controller: STDataResourceController,

            link: function ($scope:ISTDataResourceScope, $element:JQuery, $attrs:ng.IAttributes, controllers:Array<any>) {


                $attrs.$observe('stResourceFilterId', function (stResourceFilterIdExpr:string):void {

                    if (stResourceFilterIdExpr == '*') {
                        $scope.resourceFilterId = stResourceFilterIdExpr;
                        return;
                    }

                    $scope.$parent.$watch(stResourceFilterIdExpr, function (stFilterResourceId:string):void {
                        $scope.resourceFilterId = stFilterResourceId;
                    })
                });

                $attrs.$observe('stRefreshInterval', function (refreshInterval:number):void {
                    ctrl.setRefreshInterval(refreshInterval);
                });

                var ctrl:STDataResourceController = controllers[0];


                var ngModelCtrl:ng.INgModelController = controllers[1];

                ngModelCtrl.$formatters.push(function (modelValue:string) {
                    return modelValue;
                });

                ngModelCtrl.$parsers.push(function (viewValue) {
                    return viewValue;
                });

                $scope.$watch('$model', function (value:any) {
                    ngModelCtrl.$setViewValue(value);
                });

                ngModelCtrl.$render = function () {
                    $scope.$model = ngModelCtrl.$viewValue;
                };


                var stDataDefCtrl:st.foundation.data.ISTDataDefinitionController = controllers[2];
                if (stDataDefCtrl) {
                    stDataDefCtrl.$render = function (value:any):void {
                        $scope.dataDefinition = value;
                    };
                }


                var uuidCtrl:st.foundation.uuid.ISTUUIDController = controllers[3];
                if (uuidCtrl) {
                    uuidCtrl.$render = function (uuid:string) {
                        $scope.$uuid = uuid;
                    };
                }


                var processMonCtrl:IProcessMonitorController = controllers[4];
                if (processMonCtrl) {
                    $scope.$watch('$model.$process', function ($process:any):void {
                        $process ? processMonCtrl.push() : processMonCtrl.pop();
                    });
                }
            }
        };
    };
    STDataResourceDirective.$inject = ['$parse'];

    $module.directive('stDataResource', STDataResourceDirective);
}