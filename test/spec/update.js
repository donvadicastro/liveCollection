/**
 * Created by d_one@inbox.ru on 1/22/2015.
 */
describe('LiveCollection:update', function () {
    it('should update item success without sync', function () {
        var collection = new Backbone.LiveCollection([{id:1,name:'a'}], {url: 'url'});
        spyOn(Backbone, 'sync');

        collection.update({id:1,name:'b'});

        expect(JSON.stringify(collection.toJSON())).toBe(JSON.stringify([{id:1,name:'b'}]));
        expect(Backbone.sync).not.toHaveBeenCalled();
    });

    xit('should update item success with sync', function () {
        var collection = new Backbone.LiveCollection([{id:1,name:'a'}], {url: 'url'});
        spyOn(Backbone, 'sync').andCallFake(function(metod, model, options) {
            options.success(model, {id:1,name:'b'});
        });

        collection.update({id:1,name:'b'}, {sync: true});

        expect(JSON.stringify(collection.toJSON())).toBe(JSON.stringify({id:1,name:'b'}));
        expect(Backbone.sync).toHaveBeenCalled();
    });

    xit('should skip update item when request fail', function () {
        var collection = new Backbone.LiveCollection([{id:1,name:'a'}], {url: 'url'});
        spyOn(Backbone, 'sync').andCallFake(function(metod, model, options) {
            options.error(model, {responseJSON: {message: 'error'}});
        });

        collection.update({id:1,name:'b'}, {sync: true});

        expect(JSON.stringify(collection.toJSON())).toBe(JSON.stringify({id:1,name:'a'}));
        expect(Backbone.sync).toHaveBeenCalled();
    });
});