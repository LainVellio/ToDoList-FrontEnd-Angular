import { Component, Input, OnInit } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Project, Todo } from '../projects';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  @Input() project!: Project;
  todos: any;
  title: string = '';
  projectId: number = 0;

  ngOnInit() {
    this.todos = plainToClass(Todo, this.project.todos);
    this.todos = this.todos.sort((a: any, b: any) => {
      if (a.todoId > b.todoId) {
        return 1;
      }
      if (a.todoId < b.todoId) {
        return -1;
      }
      return 0;
    });

    this.title = this.project.title.toUpperCase();
    this.projectId = this.project.id;
  }
}
