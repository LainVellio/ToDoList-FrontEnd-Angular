import { HttpService } from './config/service';
import { Component, OnInit } from '@angular/core';
import { Project, Todo, NewTodo } from './projects';
import { plainToClass } from 'class-transformer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HttpService],
})
export class AppComponent implements OnInit {
  constructor(private httpService: HttpService) {}

  projects: any;
  disabledOpenForm = true;
  isFormOpen = false;

  ngOnInit() {
    this.httpService.getProjects().subscribe((data: any) => {
      this.projects = plainToClass(Project, data);
      this.disabledOpenForm = false;
    });
  }

  createNewTodo(newTodo: NewTodo) {
    this.httpService
      .postTodo(newTodo)
      .subscribe(() => this.addNewTodo(newTodo));
  }

  toggleForm(isFormOpen: boolean) {
    this.isFormOpen = isFormOpen;
  }

  addNewTodo(newTodo: NewTodo) {
    if (
      this.projects.some((project: any) => {
        return project.title.toLowerCase() == newTodo.title.toLowerCase();
      })
    ) {
      this.projects = this.projects.map((project: any) => {
        if (project.title.toLowerCase() == newTodo.title.toLocaleLowerCase()) {
          project.todos.push(
            plainToClass(Todo, {
              todoId: project.todos.length + 1,
              text: newTodo.text,
              isCompleted: false,
            })
          );
        }
        return plainToClass(Project, project);
      });
    } else {
      this.projects.push(
        plainToClass(Project, {
          id: this.projects.length + 1,
          title: newTodo.title,
          todos: [{ todoId: 1, isCompleted: false, text: newTodo.text }],
        })
      );
    }
  }
}
