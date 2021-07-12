import { NewProjectTodo } from './../projects';
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
      `${this.apiURL}/projects/${projectId}/todos/${todoId}`,
      {}
    );
  }

  public postTodo(newProjectTodo: NewProjectTodo): Observable<Project> {
    return this.http.post<Project>(`${this.apiURL}todos`, newProjectTodo);
  }
}
