angular.module('sahusoft.history',[])
.factory('History', [function () {

    var watchers = {};

    function watch(property, scope){

        if(!property || !scope)
            throw "Property or Scope not passed to watch()";

        var newWatcher = {
            property: property,
            scope: scope,
            states: [],
            pointer: -1
        };

        if(!watchers[scope.$id])
            watchers[scope.$id] = {};

        watchers[scope.$id][property] = newWatcher;

        window.x = newWatcher;

        return newWatcher;

    }

    function getWatcher(property, scope){

        if(!property || !scope)
            throw "Property or Scope not passed to getWatcher()";

        if(watchers[scope.$id] && watchers[scope.$id][property])
            return watchers[scope.$id][property];
        else
            return false;
            
    }

    function push(property, scope, title, description){

        if(!property || !scope || !title)
            throw "Property, Scope or Title not passed to push()";

        var watcher = getWatcher(property, scope);

        watcher.pointer++;

        watcher.states.splice(watcher.pointer, watcher.states.length - watcher.pointer);

        watcher.states.push({
            value: angular.toJson(scope[property]),
            title: title,
            description: description
        });


        if(watcher.states.length > 20) {
            watcher.states.shift();
        }

    }

    function undo(property, scope){

        if(!property || !scope)
            throw "Property or Scope not passed to undo()";

        var watcher = getWatcher(property, scope);

        if(!canUndo(property, scope))
            return false;

        scope[property] = angular.fromJson(watcher.states[--watcher.pointer].value);

        return scope[property];

    }

    function redo(property, scope){

        if(!property || !scope)
            throw "Property or Scope not passed to redo()";

        var watcher = getWatcher(property, scope);

        if(!canRedo(property, scope))
            return false;

        scope[property] = angular.fromJson(watcher.states[++watcher.pointer].value);

        return scope[property];

    }

    function setState(property, scope, index){


        if(!property || !scope)
            throw "Property or Scope not passed to redo()";

        var watcher = getWatcher(property, scope);

        if(!watcher.states[index])
            throw "State "+index+" does not exists";

        scope[property] = angular.fromJson(watcher.states[index].value);
        watcher.pointer = index;

        return scope[property];

    }

    function canUndo(property, scope){

        if(!property || !scope)
            throw "Property or Scope not passed to canUndo()";

        var watcher = getWatcher(property, scope);

        if(watcher.pointer>0)
            return true;
        else
            return false;

    }

    function canRedo(property, scope){

        if(!property || !scope)
            throw "Property or Scope not passed to canRedo()";

        var watcher = getWatcher(property, scope);

        if(watcher.pointer >= (watcher.states.length-1))
            return false;
        else
            return true;

    }

    return {
        watch: watch,
        push: push,
        undo: undo,
        redo: redo,
        setState: setState,
        canUndo: canUndo,
        canRedo: canRedo
    };

}])