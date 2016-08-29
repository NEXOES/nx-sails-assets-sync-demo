/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="st-uuid.ts" />

module st.foundation {

    var $module:ng.IModule = angular.module('st.foundation');

    export class STJSONController {
        public cache:ng.ICacheObject;
        constructor() {
        }
    }
    STJSONController.$inject = [];

    export function STJSONDirective($http:ng.IHttpService, $cacheFactory:ng.ICacheFactoryService):ng.IDirective {
        return {

            restrict: 'E',

            require: ['stJson', 'ngModel'],

            scope: false,

            controller: STJSONController,

            link: function ($scope:ng.IScope, $element:JQuery, $attrs:ng.IAttributes, $ctrls:Array<any>) {

                var ctrl:STJSONController = $ctrls[0];
                var ngModelCtrl:ng.INgModelController = $ctrls[1];

                $attrs.$observe('stSrc', function(src:string) : void {
                    $attrs.$set('src', src);
                });

                $attrs.$observe('src', function (src:string):void {

                    $http.get(src)
                        .then(function (data:any):void {

                            data = data.data;

                            // TODO should be refined
                            if (_.has($attrs, 'stDataRootSelector')) {
                                data = _.get(data, _.get($attrs, 'stDataRootSelector'));
                            }

                            if(ctrl.cache) {
                                var cache:ng.ICacheObject = ctrl.cache;
                                if(_.isArray(data)) {
                                    data = _.map(data, function(item:any) : void {
                                        var _item:any = cache.get(item.id);
                                        if(!_item) {
                                            _item = cache.put(item.id, item);
                                        }
                                        return _item;
                                    })
                                }
                                else {
                                    var _item:any = cache.get(data.id);
                                    if(!_item) {
                                        _item = cache.put(data.id, data);
                                    }
                                    data = _item;
                                }
                            }

                            ngModelCtrl.$setViewValue(data);
                        })
                });

                $attrs.$observe('stCache', function(cacheName:string) : void {
                    ctrl.cache = $cacheFactory.get(cacheName);
                })
            }
        };
    };
    STJSONDirective.$inject = ['$http', '$cacheFactory'];

    $module.directive('stJson', STJSONDirective);
}