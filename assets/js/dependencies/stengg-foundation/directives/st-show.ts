/// <reference path="../../../typings/browser.d.ts" />

module st.foundation {

    var $module:ng.IModule = angular.module('st.foundation');

    function STShowDirective($parse:ng.IParseService, $mdSidenav:ng.material.ISidenavService):ng.IDirective {
        return {
            restrict: 'A',
            scope: false,
            link: function ($scope:ng.IScope,
                            $element:JQuery,
                            $attrs:ng.IAttributes) {

                $attrs.$observe('stShow', function (stShowExpr:string):void {
                    $scope.$watch(stShowExpr, function (stShow:boolean):void {
                        var targetId:string = _.get($attrs, 'mdComponentId');
                        var target:ng.material.ISidenavObject = $mdSidenav(targetId);
                        stShow ? target.open() : target.close();
                    })
                })
            }
        };
    };
    STShowDirective.$inject = ['$parse', '$mdSidenav'];

    $module.directive('stShow', STShowDirective);
}