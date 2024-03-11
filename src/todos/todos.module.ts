import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { TodosComponent } from './components/todos/todos.component';
import { TodoService } from './services/todos.service';
import { MainComponent } from './components/main/main.component';
import { SingleTodoComponent } from './components/todo/todo.component';
import { FooterComponent } from './components/footer/footer.component';

const routes: Routes = [
  {
    path: '',
    component: TodosComponent,
  },
];

@NgModule({
  declarations: [ TodosComponent,
                  HeaderComponent,
                  MainComponent, 
                  SingleTodoComponent,
                  FooterComponent
                ],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [TodoService],
})
export class TodosModule {}