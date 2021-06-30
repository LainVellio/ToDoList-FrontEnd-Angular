import { NewTodo } from './../projects';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Project, Todo } from '../projects';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  apiURL = environment.apiURL;

  public getProjects(): Observable<Array<Project>> {
    return this.http.get<Array<Project>>(`${this.apiURL}projects`);
  }

  public todoChecked(projectId: number, todoId: number): Observable<Todo> {
    return this.http.patch<Todo>(
      `${this.apiURL}${projectId}/todos/${todoId}`,
      {}
    );
  }

  public postTodo(newTodo: NewTodo): Observable<Todo> {
    return this.http.post<Todo>(`${this.apiURL}todos`, newTodo);
  }
}
