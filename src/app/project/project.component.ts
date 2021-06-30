import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Project, Todo } from '../projects';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  @Input() projectId!: number;
  @Input() title!: string;
  @Input() todos!: Array<Todo>;
  @Output() closeProject = new EventEmitter();

  ngOnInit() {
    this.todos = plainToClass(Todo, this.todos);
    this.title = this.title.toUpperCase();
  }

  trackByTodo(index: number, todo: Todo) {
    return todo.id;
  }
}
