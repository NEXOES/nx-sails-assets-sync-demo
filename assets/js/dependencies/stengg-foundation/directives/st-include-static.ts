/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="st-uuid.ts" />

module st.foundation {

    export function STIncludeStaticDirective($http:ng.IHttpService, $templateCache:ng.ITemplateCacheService, $compile:ng.ICompileService):ng.IDirective {
        return {
            restrict: 'AE',
            replace: true,
            scope: false,
            link: function ($scope:ng.IScope, $element:JQuery, $attrs:ng.IAttributes):void {
                $attrs.$observe('stSrc', function (stSrc:string):void {
                    $http
                        .get(stSrc, {cache: $templateCache})
                        .success(function (response:string) {
                            var contents:JQuery = $element.html(response).contents();
                            $compile(contents)($scope);
                        })
                });
            }
        };
    }

    STIncludeStaticDirective.$inject = ['$http', '$templateCache', '$compile'];

    angular.module('st.foundation')
        .directive('stIncludeStatic', STIncludeStaticDirective)
}