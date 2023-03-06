import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Item } from '../../interfaces/item';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  filter: String = 'all';

  todos: Item[] = [];

  completedTodos: Item[] = [];

  activeTodos: Item[] = [];

  constructor(
    private LocalStorageService: LocalStorageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.LocalStorageService.todos$.subscribe((data) => {
      this.todos = data;
      this.activeTodos = this.todos.filter((data) => data.isActive === false);
      this.completedTodos = this.todos.filter((data) => data.isActive === true);
      this.cdr.detectChanges();
    });
  }

  showItems(filter: String) {
    if (filter === 'all') {
      this.filter = 'all';
    } else if (filter === 'completed') {
      this.filter = 'completed';
    } else {
      this.filter = 'active';
    }
  }

  clearCompletedTodos() {
    this.LocalStorageService.clearCompletedTodos();
  }

  drop(event: CdkDragDrop<Item[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
    moveItemInArray(
      this.completedTodos,
      event.previousIndex,
      event.currentIndex
    );
    moveItemInArray(this.activeTodos, event.previousIndex, event.currentIndex);
  }
}
