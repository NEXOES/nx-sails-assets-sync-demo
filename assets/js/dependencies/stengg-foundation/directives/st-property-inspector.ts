/// <reference path="../../../typings/browser.d.ts" />

module st.foundation.propertyInspector {

    var $module:ng.IModule = angular.module('st.foundation');


    export class Property {

        public static COLOR:string = 'color';
        public static BG_COLOR:string = 'bgColor';
        public static CANVAS_COLOUR:string = 'canvasColour'; // NO, not a spelling error, it was how the API developers wanted to spell it
        public static LINE_COLOR:string = 'lineColor';

        constructor(public name:string = null, public type:string = null, public getter:Function = null, public setter:Function = null) {
        }

        public static getByPropertyName(name:string):Property {

            var result:Property = new Property(name);

            // getters and setters
            switch (name) {
                case 'NAME':
                case 'name':
                case 'text':
                case 'id':
                case 'x':
                case 'y':
                case 'radius':
                case 'width':
                case 'height':
                case 'stroke':
                case 'rotationAngle':
                case 'path':
                    _.extend(result, {
                        getter: 'get' + _.upperFirst(name),
                        setter: 'set' + _.upperFirst(name),
                    });
                    break;
                case Property.COLOR:
                case Property.LINE_COLOR:
                    _.extend(result, {
                        type: 'color',
                        getter: 'getColor',
                        setter: 'setColor',
                    });
                    break;
                case Property.BG_COLOR:
                    _.extend(result, {
                        type: 'color',
                        getter: 'getBackgroundColor',
                        setter: 'setBackgroundColor',
                    });
                    break;
                case Property.CANVAS_COLOUR:
                    _.extend(result, {
                        type: 'color',
                        getter: 'getCanvasColour',
                        setter: 'setCanvasColour',
                    });
                    break;
            }

            _.extend(result, {
                type: PropertyType.getByPropertyName(name)
            });

            return result;
        }
    }

    export class PropertyType {
        public static getByPropertyName(name:string):string {
            var result:string;
            switch (name) {
                case 'NAME':
                case 'name':
                case 'text':
                case 'id':
                    result = 'text';
                    break;
                case 'rotationAngle':
                case 'x':
                case 'y':
                case 'radius':
                case 'width':
                case 'height':
                case 'stroke':
                    result = 'number';
                    break;
                case Property.COLOR:
                case Property.BG_COLOR:
                case Property.CANVAS_COLOUR:
                case Property.LINE_COLOR:
                    result = 'color';
                    break;
                case 'path':
                    result = 'file';
                    break;
            }
            return result;
        }
    }


    export interface ISTPropertyInspectorScope extends ng.IScope {
        $model:any;
        properties:Array<any>
        managedProperties:Array<string>;
    }

    export class STPropertyInspectorController {
        constructor(private $scope:ISTPropertyInspectorScope) {

            $scope.managedProperties = [
                'color',
                'bgColor',
                'canvasColour',
                'lineColor',
                'height',
                'width',
                'radius',
                'rotationAngle',
                'stroke',
                'x',
                'y',
                'path'
            ];
            
            $scope.$on('$model:set', function($event:ng.IAngularEvent, args:{ property:any, target:any, value:any }) : void {
                $event.stopPropagation();
            })
        }
    }
    STPropertyInspectorController.$inject = ['$scope'];

    function STPropertyInspectorDirective():ng.IDirective {

        return {

            restrict: 'AE',
            replace: true,
            transclude: true,

            require: ['ngModel'],

            scope: {},

            controller: STPropertyInspectorController,
            controllerAs: 'ctrl',

            templateUrl: 'templates/dependencies/stengg-foundation/st-property-inspector.html',

            link: function ($scope:ISTPropertyInspectorScope, $element:JQuery, $attrs:ng.IAttributes, controllers:Array<any>) {

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
    STPropertyInspectorDirective.$inject = [];

    $module.directive('stPropertyInspector', STPropertyInspectorDirective);
}