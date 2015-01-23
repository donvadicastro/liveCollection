/**
 * Created by d_one@inbox.ru on 1/22/2015.
 */
describe('LiveCollection:delete', function () {
    it('should delete item success without sync', function () {
        var collection = new Backbone.LiveCollection([{id:1,name:'a'}], {url: 'url'});
        spyOn(Backbone, 'sync');

        collection.remove({id:1,name:'a'});

        expect(collection.length).toBe(0);
        expect(Backbone.sync).not.toHaveBeenCalled();
    });

    it('should delete item success with sync', function () {
        var collection = new Backbone.LiveCollection([{id:1,name:'a'}], {url: 'url'});
        spyOn(Backbone, 'sync').andCallFake(function(metod, model, options) {
            options.success(model, {id:1,name:'a'});
        });

        collection.remove({id:1,name:'a'}, {sync: true});

        expect(collection.length).toBe(0);
        expect(Backbone.sync).toHaveBeenCalled();
    });

    it('should skip delete item when request fail', function () {
        var collection = new Backbone.LiveCollection([{id:1,name:'a'}], {url: 'url'});
        spyOn(Backbone, 'sync').andCallFake(function(metod, model, options) {
            options.error(model, {responseJSON: {message: 'error'}});
        });

        collection.remove({id:1,name:'a'}, {sync: true});

        expect(collection.length).toBe(1);
        expect(Backbone.sync).toHaveBeenCalled();
    });
});