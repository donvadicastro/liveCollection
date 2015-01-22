/**
 * Created by d_one@inbox.ru on 1/22/2015.
 */
describe('LiveCollection:add', function () {
    it('should add item success without sync', function () {
        var collection = new Backbone.LiveCollection([], {url: 'url'});
        spyOn(Backbone, 'sync');

        collection.add({id:1,name:'a'});

        expect(collection.length).toBe(1);
        expect(Backbone.sync).not.toHaveBeenCalled();
    });

    it('should add item success with sync', function () {
        var collection = new Backbone.LiveCollection([], {url: 'url'});
        spyOn(Backbone, 'sync').andCallFake(function(metod, model, options) {
            options.success(model, {id:1,name:'a'});
        });

        collection.add({id:1,name:'a'}, {sync: true});

        expect(collection.length).toBe(1);
        expect(Backbone.sync).toHaveBeenCalled();
    });

    it('should skip add item when request fail', function () {
        var collection = new Backbone.LiveCollection([], {url: 'url'});
        spyOn(Backbone, 'sync').andCallFake(function(metod, model, options) {
            options.error(model, {responseJSON: {message: 'error'}});
        });

        collection.add({id:1,name:'a'}, {sync: true});

        expect(collection.length).toBe(0);
        expect(Backbone.sync).toHaveBeenCalled();
    });
});