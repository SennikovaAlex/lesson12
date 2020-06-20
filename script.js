'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

let savedTolocalstorage = function() {
    localStorage.setItem('key', JSON.stringify(todoData));
}

const render = function() {
  todoList.innerHTML = '';
  todoCompleted.innerHTML = '';
    
    
    todoData.forEach(function(item) {
        
        const li = document.createElement('li');
            li.classList.add('todo-item');
            li.innerHTML = '<span class="text-todo">' + item.value +'</span>' + 
            '<div class="todo-buttons">' + 
               '<button class="todo-remove"></button>' + 
               '<button class="todo-complete"></button>' +
            '</div>';
        
        
        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }
    

        const btnTodoComplete = li.querySelector('.todo-complete');
        btnTodoComplete.addEventListener('click', function(){
            item.completed = !item.completed;
            savedTolocalstorage();
            render();
        });


        const btnRemove = li.querySelector('.todo-remove');
        btnRemove.addEventListener('click', function(){
            let i =  todoData.indexOf(item);
            todoData.splice(i, 1);
            savedTolocalstorage();

            render();
        });
    });


};

todoControl.addEventListener('submit', function(event){
    event.preventDefault(); // страница не перезагружается при нажатии энтер
    
    const newTodo = {
        value: headerInput.value,
        completed: false 
    }

    if (headerInput.value.trim() !== '') { 
        todoData.push(newTodo);
        savedTolocalstorage();
    };
    
    headerInput.value = '';
    render();

});

if(localStorage.getItem('key')) {
    todoData = JSON.parse(localStorage.getItem('key'));
    render();
}



