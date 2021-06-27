import { NewTodo } from './../projects';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Project, Todo } from '../projects';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  public getProjects(): Observable<Project> {
    return this.http.get<Project>(
      'https://velliotodolist.herokuapp.com/projects'
    );
  }

  public todoChecked(projectId: number, todoId: number): Observable<Todo> {
    return this.http.patch<Todo>(
      `https://velliotodolist.herokuapp.com/projects/${projectId}/todos/${todoId}`,
      {}
    );
  }

  public postTodo(newTodo: NewTodo): Observable<Todo> {
    return this.http.post<Todo>(
      `https://velliotodolist.herokuapp.com/todos`,
      newTodo
    );
  }
}
