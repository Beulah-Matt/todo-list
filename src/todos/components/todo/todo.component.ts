import { Component, Input } from '@angular/core';
import { TodoInterface } from '../../models/todo.interface';

@Component({
  selector: 'app-todos-todo',
  templateUrl: './todo.component.html',
})
export class SingleTodoComponent {
  @Input() todo: TodoInterface 
}