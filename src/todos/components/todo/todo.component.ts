import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TodoInterface } from '../../models/todo.interface';
import { TodoService } from '../../services/todos.service';

@Component({
  selector: 'app-todos-todo',
  templateUrl: './todo.component.html',
})
export class SingleTodoComponent implements OnInit, OnChanges {
  @Input() todo: TodoInterface 
  @Input('isEditing') isEditingProps: boolean;
  @Output('setEditingId')setEditingIdEvent: EventEmitter<string | null> = new EventEmitter()
  editingText: string = ''

  @ViewChild('textInput') textInput: ElementRef;

  constructor(private _todosService: TodoService ){}

  ngOnInit(): void {
      this.editingText = this.todo.text
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);
    if (changes['isEditingProps'].currentValue) {
      setTimeout(() => {
        this.textInput.nativeElement.focus();
      }, 0);
    }
  }

  setTodoInEditMode(){
    console.log('setTodoInEditMode');

    this.setEditingIdEvent.emit(this.todo.id)
  }

  removeTodo(){
    this._todosService.removeTodo(this.todo.id);
  }

  toggleTodo(){
    this._todosService.toggleTodo(this.todo.id);
  }

  changeText(event: Event){
    const value = (event.target as HTMLInputElement).value
    this.editingText = value
    console.log(this.editingText, 'value changes')
  }

  changeTodo(){
    this._todosService.changeTodo(this.todo.id, this.editingText);
    this.setEditingIdEvent.emit(null);
  }
}