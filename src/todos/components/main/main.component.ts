import { Component } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';

import { TodoInterface } from '../../models/todo.interface';
import { FilterEnum } from '../../models/filter-enum';

import { TodoService } from '../../services/todos.service';

@Component({
  selector: 'app-todos-main',
  templateUrl: './main.component.html',
})
export class MainComponent {

  visibleTodos$: Observable<TodoInterface[]>;
  noTodoClass$: Observable<boolean>
  isAllTodosSelected$: Observable<boolean>

  constructor( private _todosService: TodoService){
    this.isAllTodosSelected$ = this._todosService.todos$.pipe(map((todos)=> todos.every((todo) => todo.isCompleted)))
    this.noTodoClass$ = this._todosService.todos$.pipe(map((todos)=> todos.length === 0))
    this.visibleTodos$ = combineLatest(
      this._todosService.todos$,
      this._todosService.filter$
    ).pipe(map(([todos, filter]: [TodoInterface[], FilterEnum])=> {
      if(filter === FilterEnum.Active){
        return todos.filter((todo) => !todo.isCompleted)
      }else if (filter === FilterEnum.Completed){
        return todos.filter((todo) => todo.isCompleted)
      }
      return todos;
    }))
  }

  toggleAllTodos(event: Event){
    const target = event.target as HTMLInputElement
    this._todosService.toggleAll(target.checked)
  }
}