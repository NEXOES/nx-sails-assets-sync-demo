/// <reference path="../../../typings/browser.d.ts" />
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../index.d.ts" />
/// <reference path="../../../swagger.d.ts" />

module st.foundation {


    import ISwaggerResource = swagger.ISwaggerResource;
    import ISwaggerDocument = swagger.ISwaggerDocument;
    import ISwaggerDefinition = swagger.ISwaggerDefinition;
    import ISwaggerTag = swagger.ISwaggerTag;
    import ISwaggerPathDefinition = swagger.ISwaggerPathDefinition;
    import ISwaggerPathDictionary = swagger.ISwaggerPathDictionary;
    import ISails = sails.ISails;
    import ISailsSubscription = sails.ISailsSubscription;
    import IConvexEvents = nx.convex.IConvexEvents;
    import IConvexManager = nx.convex.IConvexManager;
    import IConvexIO = nx.convex.IConvexIO;
    import IConvexSocket = nx.convex.IConvexSocket;
    import IConvexSocketSubscription = nx.convex.IConvexSocketSubscription;


    export class SwaggerResourceFactory implements ng.IServiceProvider {
        public $get:any = ['$http', function ($http:ng.IHttpService):ISwaggerResource {
            return new SwaggerResource($http);
        }];
    }

    export class SwaggerResource implements ISwaggerResource {

        constructor(private $http:ng.IHttpService) {
        }

        public fetch(url:string, options?:any):ng.IPromise<ISwaggerDocument> {
            return this.$http.get(url);
        }
    }


    export class ConvexManagerFactory implements ng.IServiceProvider {
        public $get:any = ['$q', 'DS', '$sails', '$io', function ($q:ng.IQService, DS:JSData.DS, $sails:ISails, $io:IConvexIO):IConvexManager {
            return new ConvexManager($q, DS, $sails, $io);
        }];
    }

    export class ConvexManager implements IConvexManager {

        public events:IConvexEvents = {
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

        constructor(private $q:ng.IQService, private DS:JSData.DS, private $sails:ISails, private $io:IConvexIO) {
        }

        public attach(doc:ISwaggerDocument, DS:any, options?:any):ng.IPromise<any> {
            var $process:ng.IDeferred<any> = this.$q.defer();

            var paths:ISwaggerPathDictionary = doc.paths;
            _.each(_.keys(paths), function (pathKey:string):void {

                // var path:ISwaggerPathDefinition = paths[pathKey];

                var definition:any = DS.defineResource({
                    name: pathKey,
                    endpoint: pathKey,
                    idAttribute: 'id',
                    useClass: false,
                    basePath: ( options.host || 'http://'+ doc.host ) + ( doc.basePath || '' )
                });

                DS.emit(pathKey, definition);
            });


            $process.resolve();

            return $process.promise;
        }

        public bind(options:any) : ng.IPromise<any> {
            var $this:ConvexManager = this;

            var $p:ng.IDeferred<any> = $this.$q.defer();

            var $context:any = options.context;
            var $io:IConvexIO = $this.$io;

            $context.$process++;

            if(_.has($this.DS.definitions, options.definitionName)) {


                var definition:any = _.get($this.DS.definitions, options.definitionName);


                definition.findAll()
                    .then(function(result:Array<any>) : void {
                        _.set($context, options.propertyName, result);
                        $p.resolve(result);
                    })
                    .catch(function(err:Error) : void {
                        $context.$error = err;
                        $p.reject(err);
                    })
                    .finally(function() : void {
                        $context.$process--;
                    });


                /**************************************************
                 *
                 *  REALTIME SYNCHRONIZATION
                 *
                 *************************************************/

                // We listen for the subscribed event in which we get the UID for the subscription we need to unsubscribe when the context/$scope is destroyed
                $io.socket.on($this.events.SUBSCRIBED, function(subscription:IConvexSocketSubscription) : void {


                    options.subscription = subscription;


                    /**************************************************
                     *
                     *  AUTO UNSUBSCRIPTION
                     *
                     *************************************************/

                    // When the $scope is destroyed, we clean up and unsubscribe
                    $context.$on('$destroy', function() : void {
                        $io.socket.emit($this.events.UNSUBSCRIBE, { subscription: options.subscription });
                    });


                    /**************************************************
                     *
                     *  DATA MESSAGE HANDLERS
                     *
                     *************************************************/

                    // Synchronize happens on the first load, when the subscription is made, and it can be triggered manually and will overwrite the current value with the full dataset from the server
                    $io.socket.on(subscription.id +':'+ $this.events.SYNCHRONIZED, function(data:Array<any>) : void {
                        _.set($context, options.propertyName, data);
                    });

                    // Adding new items
                    $io.socket.on(subscription.id +':'+ $this.events.ITEM_ADDED, function(data:any) : void {
                        // Inject into DS and add to the context collection
                    });

                    // Updating items
                    $io.socket.on(subscription.id +':'+ $this.events.ITEM_CHANGED, function(id:string) : void {
                        // Fetch from DS and update (should update the item in the context collection automatically since DS runs on references
                    });

                    // Removing deleted items
                    $io.socket.on(subscription.id +':'+ $this.events.ITEM_REMOVED, function(id:string) : void {
                        // Purge from DS and remove from the context collection
                    });
                });

                $io.socket.on($this.events.CONNECT, function() : void {
                    $io.socket.emit($this.events.SUBSCRIBE, { definition: options.definitionName });
                });

                $io.socket.on($this.events.DISCONNECT, function() : void {
                    console.log('Socket Disconnected...');
                });

                // We subscribe by sending the event
                $io.socket.emit($this.events.SUBSCRIBE, { definition: options.definitionName });
            }
            else {

                this.DS.on(options.definitionName, function ():void {
                    $this.bind(options);
                });
            }

            return $p.promise;
        }
    }


    angular.module('st.foundation')
        .provider('ConvexManager', ConvexManagerFactory)
        .provider('SwaggerResource', SwaggerResourceFactory);
}