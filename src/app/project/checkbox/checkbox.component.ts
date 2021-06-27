import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from 'src/app/config/service';
import { Todo } from 'src/app/projects';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [HttpService],
})
export class CheckboxComponent implements OnInit {
  constructor(private httpService: HttpService) {}

  @Input() projectId!: number;
  @Input() todo!: Todo;
  checked = false;
  disabled = false;

  ngOnInit() {
    this.checked = this.todo.isCompleted;
  }

  checkboxChange() {
    this.disabled = true;
    this.httpService
      .todoChecked(this.projectId, this.todo.todoId)
      .subscribe(() => {
        this.disabled = false;
        this.checked = !this.checked;
      });
  }
}
