/**
 * Created by fabricio-santos on 27/11/15.
 */

(function() {
    'use strict';

    angular
        .module('app.todo')
        .factory('TodoService', TodoService);

    TodoService.$inject = ['$resource','CONFIG'];
    function TodoService($resource, CONFIG) {
        return $resource(CONFIG.url+'/todo/:_id',{_id: "@_id"});
    }
})();
