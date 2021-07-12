import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { HttpService } from '../config/service';
import { Todo } from '../projects';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  constructor(private httpService: HttpService) {}

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

  onDelete() {
    this.closeProject.emit(this.projectId);
  }

  destroyTodo(todoId: number) {
    this.httpService.deleteTodo(todoId).subscribe(() => {
      this.todos = this.todos.filter((todo) => todo.id !== todoId);
    });
  }
}
