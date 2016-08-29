/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="../../../index.d.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var $module = angular.module('st.foundation');
        var STFileSaverService = (function () {
            function STFileSaverService($q) {
                this.$q = $q;
            }
            STFileSaverService.prototype.saveAsText = function (text, name) {
                var $proc = this.$q.defer();
                download(text, name);
                return $proc.promise;
            };
            STFileSaverService.prototype.saveAsImage = function (image, name, type) {
                var $proc = this.$q.defer();
                download(image, name, type);
                return $proc.promise;
            };
            STFileSaverService.prototype.saveAsPNG = function (image, name) {
                return this.saveAsImage(image, name, 'png');
            };
            return STFileSaverService;
        }());
        foundation.STFileSaverService = STFileSaverService;
        STFileSaverService.$inject = ['$q'];
        function STFileSaverServiceFactory($q) {
            return new STFileSaverService($q);
        }
        foundation.STFileSaverServiceFactory = STFileSaverServiceFactory;
        ;
        STFileSaverServiceFactory.$inject = ['$q'];
        $module.factory('$fileSaver', STFileSaverServiceFactory);
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-file-saver.js.map