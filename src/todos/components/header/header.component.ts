import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todos.service';


@Component({
  selector: 'app-todos-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent{

  text: string = ''

  constructor( private _toDoService: TodoService){ }

  changeText(event: Event){
    const target = event.target as HTMLInputElement
    this.text = target.value
  }

  addTodo(){
    this._toDoService.addTodo(this.text)
    this.text = ''
  }
}