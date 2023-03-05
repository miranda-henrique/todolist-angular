import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Item } from 'src/app/interfaces/item';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css'],
})
export class TodoCreateComponent implements OnInit {
  @Input() todos: Item[] = [];
  @Input() completedTodos: Item[] = [];
  @Input() activeTodos: Item[] = [];

  todo: Item = {
    content: '',
    isActive: false,
  };

  constructor() {}

  ngOnInit(): void {}

  changeActive() {
    this.todo.isActive = !this.todo.isActive;
  }

  addToTodos(todo: Item, f: NgForm) {
    this.todos.push({
      content: todo.content,
      isActive: todo.isActive,
    });

    if (todo.isActive) {
      this.completedTodos.push({ ...todo });
    }

    if (!todo.isActive) {
      this.activeTodos.push({ ...todo });
    }

    f.resetForm();
  }
}
