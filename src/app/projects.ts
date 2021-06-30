export class Todo {
  id!: number;
  text!: string;
  isCompleted!: boolean;
}

export class Project {
  id!: number;
  title!: string;
  todos!: Array<Todo>;

  getTitle() {
    return this.title;
  }
}

export class NewTodo {
  title!: string;
  text!: string;
}
