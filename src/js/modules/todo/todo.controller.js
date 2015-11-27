
(function() {
    'use strict';

    angular
        .module('app.extras')
        .controller('TodoController', TodoController);

    TodoController.$inject = ['$filter','TodoService'];
    function TodoController($filter, TodoService) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            vm.cleanView = function(){
                vm.items = [];
            }
            vm.reload = function(){
                vm.items = TodoService.query();
            };

            vm.reload();

            vm.editingTodo = false;
            vm.todo = {};

            vm.addTodo = function() {

                if( vm.todo.titulo === '' ) return;
                if( !vm.todo.descricao ) vm.todo.descricao = '';

                if( vm.editingTodo ) {
                    vm.editingTodo = false;
                }
                vm.cleanView();
                TodoService.save(angular.copy(vm.todo))
                    .$promise.then(function() {
                        vm.reload();
                        vm.todo = {};
                    });

            };
            vm.updateTodo = function(todo) {

                if( todo.titulo === '' ) return;
                if( !todo.descricao ) todo.descricao = '';

                if( vm.editingTodo ) {
                    vm.editingTodo = false;
                }
                vm.cleanView();
                TodoService.save(angular.copy(todo))
                    .$promise.then(function() {
                        vm.reload();
                    });

            };

            vm.editTodo = function(index, $event) {
                $event.preventDefault();
                $event.stopPropagation();
                vm.todo = vm.items[index];
                vm.editingTodo = true;
            };

            vm.removeTodo = function(todo, $event) {
                $event.preventDefault();
                $event.stopPropagation();
                vm.cleanView();
                TodoService.remove({_id :  todo.id})
                    .$promise.then(function() {
                        vm.reload();
                    });
            };

            vm.clearAll = function() {
                vm.items = [];
            };

            vm.totalCompleted = function() {
                return $filter('filter')(vm.items, function(item){
                    return item.complete;
                }).length;
            };

            vm.totalPending = function() {
                return $filter('filter')(vm.items, function(item){
                    return !item.complete;
                }).length;
            };

        }
    }
})();
