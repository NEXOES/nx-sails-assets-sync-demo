/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="st-uuid.ts" />

module st.foundation {

    var $module:ng.IModule = angular.module('st.foundation');


    export interface IResourceModel extends ng.IScope {
        uuid?:string;
        data:any;
        $process:any;
    }

    export class ResourceModelFactory {
        public static generate(context:ng.IScope) : IResourceModel {
            return <IResourceModel><any>context.$new(true);
        }
    }

    export interface ISTResourceScope extends ng.IScope {
        stResourceContext:string;
        stResourceService:string;
        stResourceFilterId?:any;
        resourceFilter?:any;
        $model:IResourceModel;
        uuid?:string;
        dataDefinition?:any;
        $error?:Error;
    }


    export class STResourceController {

        private saveEventListener:Function;
        private removeItemEventListener:Function;

        constructor(public $scope:ISTResourceScope, private $http:ng.IHttpService, private $q:ng.IQService) {
            var ctrl:STResourceController = this;

            // JS-DATA implementation

            $scope.$watchGroup(['dataDefinition'], function (values:Array<any>):void {

                if (_.compact(values).length < 1) {
                    return;
                }

                $scope.dataDefinition.findAll()
                    .then(function (result:any):void {
                        if(!$scope.$model) {
                            $scope.$model = ResourceModelFactory.generate($scope);
                        }
                        $scope.$model.data = result;
                    })
                    .catch(function (err:Error):void {
                        $scope.$error = err;
                    })
            });


            // ST-FOUNDATION integrated resource model

            $scope.$watchGroup(['$model', 'uuid'], function (values:Array<any>):void {

                if (_.compact(values).length < 2) {
                    return;
                }

                if (ctrl.saveEventListener) {
                    ctrl.saveEventListener();
                }

                var uuid:string = $scope.$model.uuid = values[1];

                ctrl.saveEventListener = $scope.$on(uuid + ':save', function ($event:ng.IAngularEvent):void {
                    ctrl.save();
                });

                ctrl.removeItemEventListener = $scope.$on(uuid + ':remove:item', function ($event:ng.IAngularEvent, args:{data:any, targetEvent:any}):void {
                    $scope.$model.$broadcast('remove:item', args);
                });

                $scope.$model.$on('added:item', function($event:ng.IAngularEvent, args:any) : void {
                    $scope.$broadcast('change', args);
                })
                $scope.$model.$on('removed:item', function($event:ng.IAngularEvent, args:any) : void {
                    $scope.$broadcast('change', args);
                })

            });

            $scope.$watchGroup(['stResourceContext', 'stResourceService', 'stResourceFilterId', 'resourceFilter'], function (values:Array<any>):void {
                if (values[0] && values[1]) {
                    ctrl.find()
                }
            })
        }

        private find():void {
            var ctrl:STResourceController = this;
            var $scope:ISTResourceScope = ctrl.$scope;

            ctrl.$http(
                {
                    method: 'POST',
                    url: '/' + $scope.stResourceContext + '/' + $scope.stResourceService,
                    params: {
                        action: ( $scope.stResourceFilterId ? 'findOne' : 'findAll' )
                    },
                    data: {
                        id: $scope.stResourceFilterId,
                        filter: $scope.resourceFilter
                    }
                })
                .then(function (result:any):void {
                    if (!$scope.$model) {
                        $scope.$model = ResourceModelFactory.generate($scope);
                    }
                    $scope.$model.data = result.data;
                })
                .catch(function (err:Error):void {
                    $scope.$error = err;
                })
        }

        public save():ng.IPromise<any> {
            var ctrl:STResourceController = this;
            var $scope:ISTResourceScope = ctrl.$scope;
            var $model:any = $scope.$model;

            var $proc:ng.IDeferred<any> = $model.$process = ctrl.$q.defer();

            $model.writer.getFigures = function () {
                return this.figures;
            };

            $model.writer.marshal($model.context, function (data:any):void {

                var $proc:ng.IPromise<void> = $model.$process = ctrl.$http(
                    {
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
                    .then(function (result:any):void {
                    })
                    .catch(function (err:Error):void {
                        $scope.$error = err;
                    })
                    .finally(function ():void {
                        $scope.$model.$process = null;
                    });
            });

            return $proc.promise;
        }


        public setResourceFilter(resourceFilter:any):void {
            this.$scope.resourceFilter = resourceFilter;
        }

    }
    STResourceController.$inject = ['$scope', '$http', '$q'];


    export function STResourceDirective($parse:ng.IParseService):ng.IDirective {
        return {

            restrict: 'AE',

            require: ['ngModel', '?stUuid', '?stDataDefinition'],

            scope: {
                stResourceContext: '@',
                stResourceService: '@'
            },

            controller: STResourceController,

            link: function ($scope:ISTResourceScope, $element:JQuery, $attrs:ng.IAttributes, controllers:Array<any>) {

                $attrs.$observe('stResourceFilterId', function(stResourceFilterIdExpr:string) : void {
                    $scope.$parent.$watch(stResourceFilterIdExpr, function(stFilterResourceId:string) : void {
                        $scope.stResourceFilterId = stFilterResourceId;
                    })
                });

                var uuidCtrl:st.foundation.uuid.ISTUUIDController = controllers[1];
                if (uuidCtrl) {
                    uuidCtrl.$render = function (uuid:string):void {
                        $scope.uuid = uuid;
                    };
                }

                var stDataDefCtrl:st.foundation.uuid.ISTUUIDController = controllers[2];
                if (stDataDefCtrl) {
                    stDataDefCtrl.$render = function (value:any):void {
                        $scope.dataDefinition = value;
                    };
                }

                var ngModelCtrl:ng.INgModelController = controllers[0];

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
            }
        };
    };
    STResourceDirective.$inject = ['$parse'];

    $module.directive('stResource', STResourceDirective);
}