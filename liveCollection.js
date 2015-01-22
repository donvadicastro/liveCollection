/**
 * Created by d_one2inbox.ru on 1/22/2015.
 */
(function() {
    /**
     * Live collection class. Automatically sync changes to server.
     * @return {Function}
     * @module  Backbone.LiveCollection
     * @augments {Backbone.Collection}
     */
    Backbone.LiveCollection = Backbone.Collection.extend({
        /**
         * Collection add item method.
         * @param model
         * @param options
         * @returns {*}
         */
        add: function (model, options) {
            options || (options = {});

            var defer = $.Deferred();

            if(options.sync !== true) {
                Backbone.Collection.prototype.add.call(this, model, options);
                return defer.resolve(model);
            }

            model = this._prepareModel(model, options);

            model.unset('id');
            model.save(null, { success: onAddSuccess, error: onRequestFailed, defer: defer, collection: this, options: options });

            this.trigger('before:add', this, model);
            return defer.promise();
        },

        /**
         * Collection remove item method.
         * @param model
         * @param options
         * @returns {*}
         */
        remove: function (model, options) {
            options || (options = {});

            //Return when deleting is already in progress. Need to skip 'delete' collection event on model destroy.
            if(options.deleting)
                return;

            var defer = $.Deferred();

            if(options.sync !== true) {
                Backbone.Collection.prototype.remove.call(this, model, options);
                return defer.resolve(model);
            }

            model = this.get(model);
            model.destroy({
                success: onDestroySuccess,
                error: onRequestFailed,

                defer: defer,
                collection: this,
                wait: true,
                deleting: true,
                options: options
            });

            return defer.promise();
        },

        /**
         * Collection update item method.
         * @param model
         * @param options
         * @returns {*}
         */
        update: function (model, options) {
            options || (options = {});

            //do parent set when sync option not specified
            if(options.sync !== true)
                return Backbone.Collection.prototype.set.call(this, model, options);

            var defer = $.Deferred(),
                m = this.get(model);

            m.save(model, {
                success: onUpdateSuccess,
                error: onRequestFailed,
                defer: defer,
                options: options,
                collection: this
            });

            return defer.promise();
        }
    });

    //#region Collection event listeners
    /**
     * Collection added item success callback
     * @param model
     * @param response
     * @param options
     */
    function onAddSuccess (model, response, options) {
        Backbone.Collection.prototype.add.call(options.collection, response, options);
        options.defer.resolve(model, response, options);
    }

    /**
     * Collection destroyed item success callback.
     * @param model
     * @param response
     * @param options
     */
    function onDestroySuccess (model, response, options) {
        Backbone.Collection.prototype.remove.call(options.collection, model, options);
        options.defer.resolve(model, response, options);
    }

    /**
     * Collection updated item success callback.
     * @param model
     * @param response
     * @param options
     */
    function onUpdateSuccess (model, response, options) {
        var model = options.collection.get(response);
        model.parse(response);

        options.collection.trigger('reset', options.collection);
        options.defer.resolve(model, response, options);
    }

    /**
     * Request failed callback.
     * @param model
     * @param response
     * @param options
     */
    function onRequestFailed (model, response, options) {
        model.collection.trigger('error', model, response.responseJSON || { message: response.statusText, details: response.responseText });
        options.defer.reject(model, response, options);
    }
    //#endregion
})();