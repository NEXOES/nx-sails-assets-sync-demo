/// <reference path="../../../typings/browser.d.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var propertyInspector;
        (function (propertyInspector) {
            var $module = angular.module('st.foundation');
            var STPropertyInspectorInputController = (function () {
                function STPropertyInspectorInputController($scope) {
                    this.$scope = $scope;
                    var ctrl = this;
                    $scope.$on('property:set', function ($event, args) {
                        $event.stopPropagation();
                        ctrl.setProperty(args.property, args.value);
                    });
                }
                STPropertyInspectorInputController.prototype.setProperty = function (property, value) {
                    var $model = this.$scope.$model;
                    $model[property.setter].call($model, value);
                };
                return STPropertyInspectorInputController;
            }());
            propertyInspector.STPropertyInspectorInputController = STPropertyInspectorInputController;
            STPropertyInspectorInputController.$inject = ['$scope'];
            function STPropertyInspectorInputDirective($parse) {
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
                    link: function ($scope, $element, $attrs, controllers) {
                        $scope.$template = $scope.$templateDefault = 'templates/dependencies/stengg-foundation/st-property-inspector-input-process.html';
                        $attrs.$observe('stProperty', function (stProperty) {
                            if (stProperty) {
                                $scope.$property = $scope.$parent.$watch(stProperty, function (property) {
                                    if (property) {
                                        $scope.$property();
                                        delete $scope.$property;
                                        $scope.property = property;
                                        $scope.$template = 'templates/dependencies/stengg-foundation/st-property-inspector-input-' + $scope.property.type + '.html';
                                    }
                                });
                            }
                        });
                        $scope.$watchGroup(['$model', 'property'], function (values) {
                            if (_.compact(values).length < 2) {
                                return;
                            }
                            $scope.$template = 'templates/dependencies/stengg-foundation/st-property-inspector-input-' + $scope.property.type + '.html';
                        });
                        var ngModelCtrl = controllers[0];
                        ngModelCtrl.$formatters.push(function (modelValue) {
                            return modelValue;
                        });
                        ngModelCtrl.$parsers.push(function (viewValue) {
                            return viewValue;
                        });
                        $scope.$watch('$model', function (value) {
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
            }
            ;
            STPropertyInspectorInputDirective.$inject = ['$parse'];
            $module.directive('stPropertyInspectorInput', STPropertyInspectorInputDirective);
            function STPropertyInspectorInputColorDirective() {
                return {
                    restrict: 'AE',
                    replace: false,
                    require: ['ngModel'],
                    scope: {},
                    template: '<div md-color-picker ng-model="_model" layout="row" layout-align="center center" md-color-rgb="false" md-color-hsl="false" />',
                    link: function ($scope, $element, $attrs, controllers) {
                        $attrs.$observe('stProperty', function (stPropertyExpr) {
                            var property = _.get($scope, stPropertyExpr);
                            $scope.property = property;
                        });
                        $scope.$watchGroup(['$model', 'property'], function (values) {
                            if (_.compact(values).length == 2) {
                                var _model;
                                switch ($scope.property.name) {
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
                        var ngModelCtrl = controllers[0];
                        ngModelCtrl.$formatters.push(function (modelValue) {
                            return modelValue;
                        });
                        ngModelCtrl.$parsers.push(function (viewValue) {
                            return viewValue;
                        });
                        $scope.$watch('_model', function (value, oldValue) {
                            if (value && oldValue) {
                                switch ($scope.property.name) {
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
            }
            ;
            STPropertyInspectorInputColorDirective.$inject = [];
            $module.directive('stPropertyInspectorInputColor', STPropertyInspectorInputColorDirective);
            var STPropertyInspectorInputFileController = (function () {
                function STPropertyInspectorInputFileController($scope) {
                    this.$scope = $scope;
                    var _this = this;
                    _this.reader = new FileReader();
                    _this.reader.addEventListener("load", function () {
                        $scope.$model[$scope.property.name] = _this.reader.result;
                        $scope.$emit('property:set', {
                            property: $scope.property,
                            value: $scope.$model[$scope.property.name]
                        });
                    }, false);
                }
                STPropertyInspectorInputFileController.prototype.selectFile = function (file) {
                    this.reader.readAsDataURL(file);
                };
                return STPropertyInspectorInputFileController;
            }());
            propertyInspector.STPropertyInspectorInputFileController = STPropertyInspectorInputFileController;
            STPropertyInspectorInputFileController.$inject = ['$scope'];
            function STPropertyInspectorInputFileDirective() {
                return {
                    restrict: 'AE',
                    replace: false,
                    require: ['stPropertyInspectorInputFile', 'ngModel'],
                    scope: {},
                    template: '<input id="input" type="file" style="display: none"><label for="input" layout="row" flex layout-fill layout-align="start center"><div layout="row" flex layout-fill layout-align="start center">Change</div></label>',
                    controller: STPropertyInspectorInputFileController,
                    controllerAs: 'ctrl',
                    link: function ($scope, $element, $attrs, $ctrls) {
                        var ctrl = $ctrls[0];
                        var $fileElement = $element.find('input[type=file]')[0];
                        $fileElement.onchange = function () {
                            if ($fileElement.files.length > 0) {
                                ctrl.selectFile($fileElement.files[0]);
                            }
                        };
                        $attrs.$observe('stProperty', function (stPropertyExpr) {
                            var property = _.get($scope, stPropertyExpr);
                            $scope.property = property;
                        });
                        $scope.$watchGroup(['$model', 'property'], function (values) {
                            if (_.compact(values).length == 2) {
                            }
                        });
                        var ngModelCtrl = $ctrls[1];
                        ngModelCtrl.$formatters.push(function (modelValue) {
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
            }
            ;
            STPropertyInspectorInputFileDirective.$inject = [];
            $module.directive('stPropertyInspectorInputFile', STPropertyInspectorInputFileDirective);
        })(propertyInspector = foundation.propertyInspector || (foundation.propertyInspector = {}));
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-property-inspector-input.js.map