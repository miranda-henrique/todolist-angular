import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/interfaces/item';
import { LocalStorageService } from 'src/app/services/local-storage.service';

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

  todos: Item[] = [];

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.localStorageService.todos$.subscribe((todos) => {
      this.todos = todos;
    });
  }

  toggleIsActive(todo: Item) {
    todo.isActive = !todo.isActive;
    const index = this.todos.findIndex((item) => item.content === todo.content);
    this.todos[index] = todo;
    this.localStorageService.setTodo();
  }

  deleteTodo(todo: Item): void {
    const todoIndex = this.todos.indexOf(todo);
    this.todos.splice(todoIndex, 1);
    this.localStorageService.setTodo();
  }
}
