import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Project, Todo } from '../projects';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  todos: any;
  title: string = '';

  @Input() project!: Project;
  @Output() closeProject = new EventEmitter();

  ngOnInit() {
    this.todos = plainToClass(Todo, this.project.todos);
    this.title = this.project.title.toUpperCase();
  }

  onDelete() {
    this.closeProject.emit(this.project.id);
    console.log(this.project);
  }
}
