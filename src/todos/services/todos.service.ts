import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { TodoInterface } from "../models/todo.interface";
import { FilterEnum } from "../models/filter-enum";

@Injectable()

export class TodoService {
  todos$ = new BehaviorSubject<TodoInterface[]>([])
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.All)

  addTodo(text: string){
    const newTodo: TodoInterface = {
      text, 
      isCompleted: false,
      id: Math.random().toString(16)
    }
    const updatedTodos = [...this.todos$.getValue(), newTodo]
    this.todos$.next(updatedTodos)
  }

  toggleAll(isCompleted: boolean){
    const updateTodos = this.todos$.getValue().map(todo => {
      return {
        ...todo, 
        isCompleted
      }
    })
    this.todos$.next(updateTodos)
  }

  changeFilter(filterName: FilterEnum){
    this.filter$.next(filterName)
  }

  removeTodo(id: string){
    const updateTodos = this.todos$.getValue()
    .filter((todo => todo.id !== id))
  }

  changeTodo(id: string, text: string){
    const updateTodos = this.todos$.getValue().map(todo => {
      if(todo.id === id){
        return {
          ...todo, text
        }
      }
      return todo
    })
    this.todos$.next(updateTodos)
  }

  toggleTodo(id: string){
    const updateTodos = this.todos$.getValue().map(todo => {
      if(todo.id === id){
        return {
          ...todo, isCompleted: !todo.isCompleted
        }
      }
      return todo
    })
    this.todos$.next(updateTodos)
  }
}