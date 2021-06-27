export class Todo {
  constructor(
    public todoId: number,
    public text: string,
    public isCompleted: boolean
  ) {}
}

export class Project {
  constructor(public id: number, public title: string, public todos: Todo) {}
}

export class NewTodo {
  constructor(public title: string, public text: string) {}
}
