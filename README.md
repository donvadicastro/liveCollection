# LiveCollection
Live collection is a Backbone collection class inherited from [Backbone.Collection](http://backbonejs.org/#Collection) class that is actually responsible for communicating with an API endpoint to persist model(s) on CRUD local operations.

So when add event occurs - new model should be pesisted first and then only added to collection.
When model edit action executes - this model should be pesisted first.
This behavior is also true for deleting model from local collection.

## Usage examples:

### Adding new model
```javascript
collection.add({id:1,name:'a'}, {sync: true});
```

### Updating existing model
```javascript
collection.update({id:1,name:'b'}, {sync: true});
```

### deleting model
```javascript
collection.remove({id:1,name:'a'}, {sync: true});
```

So to change collection behavior to support server persistance it must ```javascript {sync: true}``` flag added.
