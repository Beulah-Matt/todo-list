import { Component, Input } from '@angular/core';
import { TodoInterface } from '../../models/todo.interface';
import { Observable, map } from 'rxjs';
import { TodoService } from '../../services/todos.service';
import { FilterEnum } from '../../models/filter-enum';

@Component({
  selector: 'app-todos-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {

  noTodosClass$: Observable<boolean>;
  activeCount$: Observable<number>
  itemsLeftText$: Observable<string>
  filterEnum = FilterEnum;
  filter$: Observable<FilterEnum>

  constructor(private _todosService: TodoService){
    this.activeCount$ = this._todosService.todos$.pipe(
      map((todos)=> todos.filter((todo)=> !todo.isCompleted).length)
    );
    this.itemsLeftText$ = this.activeCount$.pipe(
      map((activeCount) => `item${activeCount !==1? 's': '' } left`)
    )
    this.noTodosClass$ = this._todosService.todos$.pipe(map((todos)=> todos.length === 0))

    this.filter$ = this._todosService.filter$
  }

  changeFilter(event: Event, filterName: FilterEnum){
    event.preventDefault()
    this._todosService.changeFilter(filterName)
  }
}