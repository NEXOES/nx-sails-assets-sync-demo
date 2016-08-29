/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="st-uuid.ts" />

module st.foundation {

    var $module:ng.IModule = angular.module('st.foundation');


    export interface ISTEventBroadcasterScope extends ng.IScope {
        uuid:string;
    }


    export class STEventBroadcasterController {

        public $broadcast:Function;

        constructor(private $rootScope:ng.IRootScopeService, private $scope:ISTEventBroadcasterScope, private $http:ng.IHttpService, private $q:ng.IQService) {
            var ctrl:STEventBroadcasterController = this;

            $scope.$watch('uuid', function(uuid:string) : void {
                if(uuid) {
                    $scope.$parent[uuid] = ctrl.$broadcast;
                }
            });

            ctrl.$broadcast = function(event:string, args?:any) : void {
                ctrl.$rootScope.$broadcast(event, args);
            }
        }
    }
    STEventBroadcasterController.$inject = ['$rootScope', '$scope', '$http', '$q'];


    export function STEventBroadcasterDirective($parse:ng.IParseService):ng.IDirective {
        return {

            restrict: 'AE',

            require: ['stUuid'],

            scope: {},

            controller: STEventBroadcasterController,

            link: function ($scope:ISTEventBroadcasterScope, $element:JQuery, $attrs:ng.IAttributes, controllers:Array<any>) {

                var uuidCtrl:st.foundation.uuid.ISTUUIDController = controllers[0];
                uuidCtrl.render = function(uuid:string) : void {
                    $scope.uuid = uuid;
                }
            }
        };
    };
    STEventBroadcasterDirective.$inject = ['$parse'];

    $module.directive('stEventBroadcaster', STEventBroadcasterDirective);
}