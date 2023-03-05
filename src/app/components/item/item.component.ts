import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/interfaces/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  @Input() todo: Item = {
    content: '',
    isActive: false,
  };

  @Input() todos: Item[] = [];

  @Input() completedTodos: Item[] = [];

  @Input() activeTodos: Item[] = [];

  constructor() {}

  ngOnInit(): void {}

  toggleIsActive(todo: Item) {
    todo.isActive = !todo.isActive;
    const completedTodoIndex = this.completedTodos.indexOf(todo);
    const activeTodoIndex = this.activeTodos.indexOf(todo);
    if (todo.isActive) {
      this.completedTodos.push({ ...todo });
      this.activeTodos.splice(activeTodoIndex, 1);
    } else {
      this.activeTodos.push({ ...todo });
      this.completedTodos.splice(completedTodoIndex, 1);
    }
  }

  deleteTodo(todo: Item): void {
    const todoIndex = this.todos.indexOf(todo);
    const completedTodoIndex = this.completedTodos.indexOf(todo);
    const activeTodoIndex = this.activeTodos.indexOf(todo);
    this.todos.splice(todoIndex, 1);

    if (todo.isActive) {
      this.completedTodos.splice(completedTodoIndex, 1);
    } else {
      this.activeTodos.splice(activeTodoIndex, 1);
    }
  }
}
