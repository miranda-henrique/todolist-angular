import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly ITEM_KEY = 'items';
  private todoSubject = new BehaviorSubject<Item[]>([]);

  constructor() {
    const data = JSON.parse(localStorage.getItem(this.ITEM_KEY) || '') || [];
    this.todoSubject.next(data);
  }

  get todos$() {
    return this.todoSubject.asObservable();
  }

  addTodo(todo: Item): void {
    const data = this.todoSubject.value;
    data.push(todo);
    localStorage.setItem(this.ITEM_KEY, JSON.stringify(data));
    this.todoSubject.next(data);
  }

  setTodo(): void {
    const data = this.todoSubject.value;
    localStorage.setItem(this.ITEM_KEY, JSON.stringify(data));
    this.todoSubject.next(data);
  }

  clearCompletedTodos(): void {
    const data = this.todoSubject.value.filter((todo) => todo.isActive === false);
    localStorage.setItem(this.ITEM_KEY, JSON.stringify(data));
    this.todoSubject.next(data);
  }

}
