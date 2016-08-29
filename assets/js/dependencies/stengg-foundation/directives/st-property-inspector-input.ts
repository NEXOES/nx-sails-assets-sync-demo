/// <reference path="../../../typings/browser.d.ts" />

module st.foundation.propertyInspector {

    var $module:ng.IModule = angular.module('st.foundation');


    export interface ISTPropertyInspectorInputScope extends ng.IScope {
        $model:any;
        property:any;
        $property:any;
        $template:string;
        $templateDefault:string;
    }

    export class STPropertyInspectorInputController {
        constructor(private $scope:ISTPropertyInspectorInputScope) {
            var ctrl:STPropertyInspectorInputController = this;

            $scope.$on('property:set', function ($event:ng.IAngularEvent, args:any):void {
                $event.stopPropagation();
                ctrl.setProperty(args.property, args.value);
            })
        }

        public setProperty(property:any, value:any):void {
            var $model:any = this.$scope.$model;
            $model[property.setter].call($model, value);
        }
    }
    STPropertyInspectorInputController.$inject = ['$scope'];

    function STPropertyInspectorInputDirective($parse:ng.IParseService):ng.IDirective {

        return {

            restrict: 'AE',
            replace: true,
            transclude: true,

            require: ['ngModel'],

            scope: {
                $model: '@',
                property: '@'
            },

            controller: STPropertyInspectorInputController,
            controllerAs: 'ctrl',

            template: '<div><ng-include src="$template"/></div>',

            link: function ($scope:ISTPropertyInspectorInputScope, $element:JQuery, $attrs:ng.IAttributes, controllers:Array<any>) {

                $scope.$template = $scope.$templateDefault = 'templates/dependencies/stengg-foundation/st-property-inspector-input-process.html';

                $attrs.$observe('stProperty', function (stProperty:any):void {
                    if (stProperty) {

                        $scope.$property = $scope.$parent.$watch(stProperty, function (property):void {

                            if (property) {

                                $scope.$property();
                                delete $scope.$property;

                                $scope.property = property;

                                $scope.$template = 'templates/dependencies/stengg-foundation/st-property-inspector-input-' + $scope.property.type + '.html';
                            }

                        })
                    }
                });

                $scope.$watchGroup(['$model', 'property'], function (values:Array<any>):void {
                    if (_.compact(values).length < 2) {
                        return;
                    }
                    $scope.$template = 'templates/dependencies/stengg-foundation/st-property-inspector-input-' + $scope.property.type + '.html';
                })


                var ngModelCtrl:ng.INgModelController = controllers[0];

                ngModelCtrl.$formatters.push(function (modelValue:string) {
                    return modelValue;
                });

                ngModelCtrl.$parsers.push(function (viewValue) {
                    return viewValue;
                });

                $scope.$watch('$model', function (value:any) {
                    if (value) {
                        ngModelCtrl.$setViewValue(value);
                    }
                    else {
                        $scope.$model = ngModelCtrl.$viewValue;
                    }
                });

                ngModelCtrl.$render = function () {
                    $scope.$template = $scope.$templateDefault;
                    $scope.$model = ngModelCtrl.$viewValue;
                };
            }
        };
    };
    STPropertyInspectorInputDirective.$inject = ['$parse'];

    $module.directive('stPropertyInspectorInput', STPropertyInspectorInputDirective);


    export interface ISTPropertyInspectorInputColorScope extends ng.IScope {
        _model:any
        $model:any
        property:any;
    }

    function STPropertyInspectorInputColorDirective():ng.IDirective {

        return {

            restrict: 'AE',
            replace: false,

            require: ['ngModel'],

            scope: {},

            template: '<div md-color-picker ng-model="_model" layout="row" layout-align="center center" md-color-rgb="false" md-color-hsl="false" />',

            link: function ($scope:ISTPropertyInspectorInputColorScope, $element:JQuery, $attrs:ng.IAttributes, controllers:Array<any>) {

                $attrs.$observe('stProperty', function (stPropertyExpr:string):void {
                    var property:string = <any>_.get($scope, stPropertyExpr);
                    $scope.property = property;
                });

                $scope.$watchGroup(['$model', 'property'], function (values:Array<any>):void {
                    
                    if (_.compact(values).length == 2) {

                        var _model:any;

                        switch($scope.property.name) {
                            case st.foundation.propertyInspector.Property.COLOR:
                            case st.foundation.propertyInspector.Property.LINE_COLOR:
                                _model = $scope.$model.getColor();
                                break;
                            case st.foundation.propertyInspector.Property.BG_COLOR:
                                _model = $scope.$model.getBackgroundColor();
                                break;
                            case st.foundation.propertyInspector.Property.CANVAS_COLOUR:
                                _model = $scope.$model.getCanvasColour();
                                break;
                        }

                        $scope._model = _model.hashString || _model;
                    }
                });

                var ngModelCtrl:ng.INgModelController = controllers[0];

                ngModelCtrl.$formatters.push(function (modelValue:string) {
                    return modelValue;
                });

                ngModelCtrl.$parsers.push(function (viewValue) {
                    return viewValue;
                });

                $scope.$watch('_model', function (value:any, oldValue:any) {

                    if (value && oldValue) {

                        switch($scope.property.name) {
                            case st.foundation.propertyInspector.Property.COLOR:
                            case st.foundation.propertyInspector.Property.LINE_COLOR:
                                $scope.$model.setColor(new draw2d.util.Color(value.toUpperCase()));
                                break;
                            case st.foundation.propertyInspector.Property.BG_COLOR:
                                $scope.$model.setBackgroundColor(new draw2d.util.Color(value.toUpperCase()));
                                break;
                            case st.foundation.propertyInspector.Property.CANVAS_COLOUR:
                                $scope.$model.setCanvasColour(value);
                                break;
                        }
                    }
                });

                ngModelCtrl.$render = function () {
                    $scope.$model = ngModelCtrl.$viewValue;
                };
            }
        };
    };
    STPropertyInspectorInputColorDirective.$inject = [];

    $module.directive('stPropertyInspectorInputColor', STPropertyInspectorInputColorDirective);


    export interface ISTPropertyInspectorInputFileScope extends ng.IScope {
        $model:any
        property:any;
    }

    export class STPropertyInspectorInputFileController {

        private reader:FileReader;

        constructor(private $scope:ISTPropertyInspectorInputFileScope) {
            var _this:STPropertyInspectorInputFileController = this;

            _this.reader = new FileReader();

            _this.reader.addEventListener("load", function () {
                $scope.$model[$scope.property.name] = _this.reader.result;
                $scope.$emit('property:set', {
                    property: $scope.property,
                    value: $scope.$model[$scope.property.name]
                });
            }, false);

        }

        public selectFile(file:File) : void {
            this.reader.readAsDataURL(file);
        }
    }
    STPropertyInspectorInputFileController.$inject = ['$scope'];

    function STPropertyInspectorInputFileDirective():ng.IDirective {

        return {

            restrict: 'AE',
            replace: false,

            require: ['stPropertyInspectorInputFile', 'ngModel'],

            scope: {},

            template: '<input id="input" type="file" style="display: none"><label for="input" layout="row" flex layout-fill layout-align="start center"><div layout="row" flex layout-fill layout-align="start center">Change</div></label>',

            controller: STPropertyInspectorInputFileController,
            controllerAs: 'ctrl',

            link: function ($scope:ISTPropertyInspectorInputFileScope, $element:JQuery, $attrs:ng.IAttributes, $ctrls:Array<any>) {

                var ctrl:STPropertyInspectorInputFileController = $ctrls[0];

                var $fileElement:JQueryFileElement = <JQueryFileElement>$element.find('input[type=file]')[0];

                $fileElement.onchange = function() : void {
                    if($fileElement.files.length > 0) {
                        ctrl.selectFile($fileElement.files[0]);
                    }
                };


                $attrs.$observe('stProperty', function (stPropertyExpr:string):void {
                    var property:string = <any>_.get($scope, stPropertyExpr);
                    $scope.property = property;
                });

                $scope.$watchGroup(['$model', 'property'], function (values:Array<any>):void {
                    if (_.compact(values).length == 2) {
                    }
                });


                var ngModelCtrl:ng.INgModelController = $ctrls[1];

                ngModelCtrl.$formatters.push(function (modelValue:string) {
                    return modelValue;
                });

                ngModelCtrl.$parsers.push(function (viewValue) {
                    return viewValue;
                });

                ngModelCtrl.$render = function () {
                    $scope.$model = ngModelCtrl.$viewValue;
                };
            }
        };
    };
    STPropertyInspectorInputFileDirective.$inject = [];

    $module.directive('stPropertyInspectorInputFile', STPropertyInspectorInputFileDirective);

    export interface JQueryFileElement extends JQuery {
        files:Array<File>;
    }
}