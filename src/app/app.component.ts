import { HttpService } from './config/service';
import { Component, OnInit } from '@angular/core';
import { Project, Todo, NewProjectTodo } from './projects';
import { plainToClass } from 'class-transformer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HttpService],
})
export class AppComponent implements OnInit {
  constructor(private httpService: HttpService) {}

  projects!: Array<Project>;
  disabledOpenForm = true;
  isFormOpen = false;

  ngOnInit() {
    this.httpService.getProjects().subscribe((data: Array<Project>) => {
      this.projects = plainToClass(Project, data);
      this.disabledOpenForm = false;
    });
  }

  trackByProject(index: number, project: Project) {
    return project.id;
  }

  createNewTodo(newProjectTodo: NewProjectTodo) {
    this.httpService
      .postTodo(newProjectTodo)
      .subscribe((response: Project) => this.addNewTodo(response));
  }

  toggleForm(isFormOpen: boolean) {
    this.isFormOpen = isFormOpen;
  }

  addNewTodo(newProject: Project) {
    let newTodo = {
      id: newProject.todos[0].id,
      text: newProject.todos[0].text,
      isCompleted: false,
    };
    if (
      this.projects.some((project: Project) => {
        return project.title.toLowerCase() == newProject.title.toLowerCase();
      })
    ) {
      this.projects = this.projects.map((project: Project) => {
        if (
          project.title.toLowerCase() == newProject.title.toLocaleLowerCase()
        ) {
          project.todos.push(plainToClass(Todo, newTodo));
        }
        return plainToClass(Project, project);
      });
    } else {
      this.projects.push(
        plainToClass(Project, {
          id: newProject.id,
          title: newProject.title,
          todos: [newTodo],
        })
      );
    }
  }
}
