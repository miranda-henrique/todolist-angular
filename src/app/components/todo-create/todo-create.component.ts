import { Item } from './../../interfaces/item';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css'],
})
export class TodoCreateComponent implements OnInit {
  todos: Item[] = [];

  todo: Item = {
    content: '',
    isActive: false,
  };

  constructor(private LocalStorageService: LocalStorageService) {}

  ngOnInit(): void {}

  changeActive() {
    this.todo.isActive = !this.todo.isActive;
  }

  addToTodos(todo: Item, f: NgForm) {
    this.LocalStorageService.addTodo({ ...todo });
    f.resetForm();
  }
}
