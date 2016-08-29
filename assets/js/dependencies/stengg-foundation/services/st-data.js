/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../index.d.ts" />
/// <reference path="../../../swagger.d.ts" />
var st;
(function (st) {
    var foundation;
    (function (foundation) {
        var SwaggerResourceFactory = (function () {
            function SwaggerResourceFactory() {
                this.$get = ['$http', function ($http) {
                        return new SwaggerResource($http);
                    }];
            }
            return SwaggerResourceFactory;
        }());
        foundation.SwaggerResourceFactory = SwaggerResourceFactory;
        var SwaggerResource = (function () {
            function SwaggerResource($http) {
                this.$http = $http;
            }
            SwaggerResource.prototype.fetch = function (url, options) {
                return this.$http.get(url);
            };
            return SwaggerResource;
        }());
        foundation.SwaggerResource = SwaggerResource;
        var ConvexManagerFactory = (function () {
            function ConvexManagerFactory() {
                this.$get = ['$q', 'DS', '$sails', '$io', function ($q, DS, $sails, $io) {
                        return new ConvexManager($q, DS, $sails, $io);
                    }];
            }
            return ConvexManagerFactory;
        }());
        foundation.ConvexManagerFactory = ConvexManagerFactory;
        var ConvexManager = (function () {
            function ConvexManager($q, DS, $sails, $io) {
                this.$q = $q;
                this.DS = DS;
                this.$sails = $sails;
                this.$io = $io;
                this.events = {
                    CONNECT: 'connect',
                    DISCONNECT: 'disconnect',
                    SUBSCRIBE: 'subscribe',
                    SUBSCRIBED: 'subscribed',
                    UNSUBSCRIBE: 'unsubscribe',
                    UNSUBSCRIBED: 'unsubscribed',
                    SYNCHRONIZED: 'synchronized',
                    ITEM_ADDED: 'itemAdded',
                    ITEM_CHANGED: 'itemChanged',
                    ITEM_REMOVED: 'itemRemoved'
                };
            }
            ConvexManager.prototype.attach = function (doc, DS, options) {
                var $process = this.$q.defer();
                var paths = doc.paths;
                _.each(_.keys(paths), function (pathKey) {
                    // var path:ISwaggerPathDefinition = paths[pathKey];
                    var definition = DS.defineResource({
                        name: pathKey,
                        endpoint: pathKey,
                        idAttribute: 'id',
                        useClass: false,
                        basePath: (options.host || 'http://' + doc.host) + (doc.basePath || '')
                    });
                    DS.emit(pathKey, definition);
                });
                $process.resolve();
                return $process.promise;
            };
            ConvexManager.prototype.bind = function (options) {
                var $this = this;
                var $p = $this.$q.defer();
                var $context = options.context;
                var $io = $this.$io;
                $context.$process++;
                if (_.has($this.DS.definitions, options.definitionName)) {
                    var definition = _.get($this.DS.definitions, options.definitionName);
                    definition.findAll()
                        .then(function (result) {
                        _.set($context, options.propertyName, result);
                        $p.resolve(result);
                    })
                        .catch(function (err) {
                        $context.$error = err;
                        $p.reject(err);
                    })
                        .finally(function () {
                        $context.$process--;
                    });
                    /**************************************************
                     *
                     *  REALTIME SYNCHRONIZATION
                     *
                     *************************************************/
                    // We listen for the subscribed event in which we get the UID for the subscription we need to unsubscribe when the context/$scope is destroyed
                    $io.socket.on($this.events.SUBSCRIBED, function (subscription) {
                        options.subscription = subscription;
                        /**************************************************
                         *
                         *  AUTO UNSUBSCRIPTION
                         *
                         *************************************************/
                        // When the $scope is destroyed, we clean up and unsubscribe
                        $context.$on('$destroy', function () {
                            $io.socket.emit($this.events.UNSUBSCRIBE, { subscription: options.subscription });
                        });
                        /**************************************************
                         *
                         *  DATA MESSAGE HANDLERS
                         *
                         *************************************************/
                        // Synchronize happens on the first load, when the subscription is made, and it can be triggered manually and will overwrite the current value with the full dataset from the server
                        $io.socket.on(subscription.id + ':' + $this.events.SYNCHRONIZED, function (data) {
                            _.set($context, options.propertyName, data);
                        });
                        // Adding new items
                        $io.socket.on(subscription.id + ':' + $this.events.ITEM_ADDED, function (data) {
                            // Inject into DS and add to the context collection
                        });
                        // Updating items
                        $io.socket.on(subscription.id + ':' + $this.events.ITEM_CHANGED, function (id) {
                            // Fetch from DS and update (should update the item in the context collection automatically since DS runs on references
                        });
                        // Removing deleted items
                        $io.socket.on(subscription.id + ':' + $this.events.ITEM_REMOVED, function (id) {
                            // Purge from DS and remove from the context collection
                        });
                    });
                    $io.socket.on($this.events.CONNECT, function () {
                        $io.socket.emit($this.events.SUBSCRIBE, { definition: options.definitionName });
                    });
                    $io.socket.on($this.events.DISCONNECT, function () {
                        console.log('Socket Disconnected...');
                    });
                    // We subscribe by sending the event
                    $io.socket.emit($this.events.SUBSCRIBE, { definition: options.definitionName });
                }
                else {
                    this.DS.on(options.definitionName, function () {
                        $this.bind(options);
                    });
                }
                return $p.promise;
            };
            return ConvexManager;
        }());
        foundation.ConvexManager = ConvexManager;
        angular.module('st.foundation')
            .provider('ConvexManager', ConvexManagerFactory)
            .provider('SwaggerResource', SwaggerResourceFactory);
    })(foundation = st.foundation || (st.foundation = {}));
})(st || (st = {}));
//# sourceMappingURL=st-data.js.map