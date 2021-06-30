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

  projects!: Array<Project>;
  disabledOpenForm = true;
  isFormOpen = false;
  todoCount: number = 0;

  ngOnInit() {
    this.httpService.getProjects().subscribe((data: Array<Project>) => {
      this.projects = plainToClass(Project, data);
      this.disabledOpenForm = false;
      this.projects.map((project: Project) => {
        this.todoCount += project.todos.length;
      });
      console.log(this.todoCount);
    });
  }

  trackByProject(index: number, project: Project) {
    return project.id;
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
      this.projects.some((project: Project) => {
        return project.title.toLowerCase() == newTodo.title.toLowerCase();
      })
    ) {
      this.projects = this.projects.map((project: Project) => {
        if (project.title.toLowerCase() == newTodo.title.toLocaleLowerCase()) {
          this.todoCount += 1;
          console.log(this.todoCount, newTodo.text);
          project.todos.push(
            plainToClass(Todo, {
              id: this.todoCount,
              text: newTodo.text,
              isCompleted: false,
            })
          );
        }
        return plainToClass(Project, project);
      });
    } else {
      this.todoCount += 1;
      this.projects.push(
        plainToClass(Project, {
          id: this.projects.length,
          title: newTodo.title,
          todos: [
            { id: this.todoCount + 1, isCompleted: false, text: newTodo.text },
          ],
        })
      );
    }
  }
}
