/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="st-uuid.ts" />

module st.foundation {

    var $module:ng.IModule = angular.module('st.foundation');


    export interface IResourceArrayModel extends ng.IScope {
        uuid:string;
        data:Array<any>;
        $new:any;
        // $destroy(item:any) : void;
    }

    export class ResourceArrayModelFactory {
        public static generate(context:ng.IScope):IResourceArrayModel {
            var $model:IResourceArrayModel = <IResourceArrayModel><any>context.$new(true);
            $model.$new = null; // Override $new since we are using it as a scope, so we reset that
            return $model;
        }
    }

    export interface ISTResourceArrayScope extends ng.IScope {
        stResourceContext:string;
        stResourceService:string;
        resourceFilter?:any;
        $model:IResourceArrayModel;
        uuid:string;
        $error:Error;
    }


    export class STResourceArrayController {

        private saveEventListener:Function;
        private removeItemEventListener:Function;

        constructor(private $scope:ISTResourceArrayScope, private $http:ng.IHttpService, private $q:ng.IQService) {
            var ctrl:STResourceArrayController = this;

            $scope.$model = ResourceArrayModelFactory.generate($scope);

            $scope.$watch('$model', function ($model:IResourceArrayModel):void {
                if ($model) {

                    $model.$watchCollection('data', function (values:Array<any>, oldValues:Array<any>):void {

                        var removedItems:Array<any> = _.difference(oldValues, values);
                        _.forEach(removedItems, function (addedItem:any):void {
                            ctrl.removeItem(addedItem);
                        });

                        var addedItems:Array<any> = _.difference(values, oldValues);
                        _.forEach(addedItems, function (addedItem:any):void {
                            ctrl.addItem(addedItem);
                        })
                    });

                    $model.$watch('$new', function($new:any) : void {
                        if($new) {
                            $new.$save = function() : void {
                                $scope.$model.data.push(this);
                                $scope.$model.$new = null;
                            }
                        }
                    });

                    $model.$destroy = function(item:any) : void {
                        var $model:IResourceArrayModel = ctrl.$scope.$model;
                        _.remove($model.data, item);
                    }
                }
            });


            $scope.$watchGroup(['$model', 'uuid'], function (values:Array<any>):void {

                if (_.compact(values).length < 2) {
                    return;
                }

                if (ctrl.saveEventListener) {
                    ctrl.saveEventListener();
                }

                var uuid:string = $scope.$model.uuid = values[1];

                ctrl.removeItemEventListener = $scope.$on(uuid + ':remove:item', function ($event:ng.IAngularEvent, args:{data:any, targetEvent:any}):void {
                    $scope.$model.$broadcast('remove:item', args);
                });
            });

            $scope.$watchGroup(['stResourceContext', 'stResourceService', 'stResourceFilter'], function (values:Array<any>):void {
                if (values[0] && values[1]) {
                    ctrl.findAll()
                }
            })
        }

        private findAll():void {
            var ctrl:STResourceArrayController = this;
            var $scope:ISTResourceArrayScope = ctrl.$scope;

            ctrl.$http(
                {
                    method: 'POST',
                    url: '/' + $scope.stResourceContext + '/' + $scope.stResourceService,
                    params: {
                        action: 'findAll'
                    },
                    data: {
                        filter: $scope.resourceFilter
                    }
                })
                .then(function (result:any):void {
                    if (!$scope.$model) {
                        $scope.$model = ResourceArrayModelFactory.generate($scope);
                    }
                    $scope.$model.data = result.data;
                })
                .catch(function (err:Error):void {
                    $scope.$error = err;
                })
        }

        private removeItem(item:any):ng.IPromise<void> {
            var ctrl:STResourceArrayController = this;
            var $scope:ISTResourceArrayScope = ctrl.$scope;

            var $proc:ng.IPromise<void> = item.$process = ctrl.$http(
                {
                    method: 'POST',
                    url: '/' + $scope.stResourceContext + '/' + $scope.stResourceService,
                    params: {
                        action: 'destroyOne'
                    },
                    data: {
                        id: item.id
                    }
                })
                .then(function (result:any):void {
                    _.extend(item, result);
                    ctrl.notify($i18n.DESTROY_ONE_RESOLVE);
                })
                .catch(function (err:Error):void {
                    item.$error = err;
                    ctrl.notify($i18n.DESTROY_ONE_REJECT);
                })
                .finally(function ():void {
                    item.$process = null;
                });

            return $proc;
        }

        private addItem(item:any):ng.IHttpPromise<void> {
            var ctrl:STResourceArrayController = this;
            var $scope:ISTResourceArrayScope = ctrl.$scope;

            var $proc:ng.IHttpPromise<any> = item.$process = ctrl.$http(
                {
                    method: 'POST',
                    url: '/' + $scope.stResourceContext + '/' + $scope.stResourceService,
                    params: {
                        action: 'saveOne'
                    },
                    data: item
                });

            $proc
                .then(function (result:any):void {
                    _.extend(item, result.data);
                })
                .catch(function (err:Error):void {
                    item.$error = err;
                })
                .finally(function ():void {
                    item.$process = null;
                });

            return $proc;
        }

        public setResourceFilter(resourceFilter:any):void {
            this.$scope.resourceFilter = resourceFilter;
        }
    }
    STResourceArrayController.$inject = ['$scope', '$http', '$q'];


    export function STResourceArrayDirective($parse:ng.IParseService):ng.IDirective {
        return {

            restrict: 'AE',

            require: ['ngModel', '?stUuid'],

            scope: {
                stResourceContext: '@',
                stResourceService: '@',
                stResourceFilter: '@?'
            },

            controller: STResourceArrayController,

            link: function ($scope:ISTResourceArrayScope, $element:JQuery, $attrs:ng.IAttributes, controllers:Array<any>) {

                var uuidCtrl:st.foundation.uuid.ISTUUIDController = controllers[1];
                if (uuidCtrl) {
                    uuidCtrl.render = function (uuid:string):void {
                        $scope.uuid = uuid;
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
    STResourceArrayDirective.$inject = ['$parse'];

    $module.directive('stResourceArray', STResourceArrayDirective);
}