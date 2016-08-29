/// <reference path="../../../typings/browser.d.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var propertyInspector;
        (function (propertyInspector) {
            var $module = angular.module('st.foundation');
            var Property = (function () {
                function Property(name, type, getter, setter) {
                    if (name === void 0) { name = null; }
                    if (type === void 0) { type = null; }
                    if (getter === void 0) { getter = null; }
                    if (setter === void 0) { setter = null; }
                    this.name = name;
                    this.type = type;
                    this.getter = getter;
                    this.setter = setter;
                }
                Property.getByPropertyName = function (name) {
                    var result = new Property(name);
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
                                setter: 'set' + _.upperFirst(name)
                            });
                            break;
                        case Property.COLOR:
                        case Property.LINE_COLOR:
                            _.extend(result, {
                                type: 'color',
                                getter: 'getColor',
                                setter: 'setColor'
                            });
                            break;
                        case Property.BG_COLOR:
                            _.extend(result, {
                                type: 'color',
                                getter: 'getBackgroundColor',
                                setter: 'setBackgroundColor'
                            });
                            break;
                        case Property.CANVAS_COLOUR:
                            _.extend(result, {
                                type: 'color',
                                getter: 'getCanvasColour',
                                setter: 'setCanvasColour'
                            });
                            break;
                    }
                    _.extend(result, {
                        type: PropertyType.getByPropertyName(name)
                    });
                    return result;
                };
                Property.COLOR = 'color';
                Property.BG_COLOR = 'bgColor';
                Property.CANVAS_COLOUR = 'canvasColour'; // NO, not a spelling error, it was how the API developers wanted to spell it
                Property.LINE_COLOR = 'lineColor';
                return Property;
            }());
            propertyInspector.Property = Property;
            var PropertyType = (function () {
                function PropertyType() {
                }
                PropertyType.getByPropertyName = function (name) {
                    var result;
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
                };
                return PropertyType;
            }());
            propertyInspector.PropertyType = PropertyType;
            var STPropertyInspectorController = (function () {
                function STPropertyInspectorController($scope) {
                    this.$scope = $scope;
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
                    $scope.$on('$model:set', function ($event, args) {
                        $event.stopPropagation();
                    });
                }
                return STPropertyInspectorController;
            }());
            propertyInspector.STPropertyInspectorController = STPropertyInspectorController;
            STPropertyInspectorController.$inject = ['$scope'];
            function STPropertyInspectorDirective() {
                return {
                    restrict: 'AE',
                    replace: true,
                    transclude: true,
                    require: ['ngModel'],
                    scope: {},
                    controller: STPropertyInspectorController,
                    controllerAs: 'ctrl',
                    templateUrl: 'templates/dependencies/stengg-foundation/st-property-inspector.html',
                    link: function ($scope, $element, $attrs, controllers) {
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
            ;
            STPropertyInspectorDirective.$inject = [];
            $module.directive('stPropertyInspector', STPropertyInspectorDirective);
        })(propertyInspector = foundation.propertyInspector || (foundation.propertyInspector = {}));
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-property-inspector.js.map