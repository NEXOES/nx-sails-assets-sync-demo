/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="../../../index.d.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var $module = angular.module('st.foundation');
        var STDatetimeInputController = (function () {
            function STDatetimeInputController($scope) {
                this.$scope = $scope;
            }
            return STDatetimeInputController;
        }());
        foundation.STDatetimeInputController = STDatetimeInputController;
        STDatetimeInputController.$inject = ['$scope'];
        function STDatetimeInputDirective() {
            return {
                restrict: 'AE',
                transclude: true,
                replace: true,
                require: ['ngModel'],
                scope: {
                    placeholder: '='
                },
                template: '' +
                    '<div>' +
                    '   <nx-datetime-picker model="$model">' +
                    '   </nx-datetime-picker>' +
                    '</div>',
                controller: STDatetimeInputController,
                link: function ($scope, $element, $attrs, $ctrls) {
                    var ngModelCtrl = $ctrls[0];
                    $scope.$watch('$model', function (value) {
                        ngModelCtrl.$setViewValue(value);
                    });
                    ngModelCtrl.$render = function () {
                        $scope.$model = ngModelCtrl.$viewValue;
                    };
                }
            };
        }
        foundation.STDatetimeInputDirective = STDatetimeInputDirective;
        ;
        STDatetimeInputDirective.$inject = [];
        $module.directive('stDatetimeInput', STDatetimeInputDirective);
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-datetime-input.js.map