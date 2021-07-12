import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() closeTodo = new EventEmitter();

  checked = false;
  disabled = false;
  isFocus = false;

  ngOnInit() {
    this.checked = this.todo.isCompleted;
  }

  checkboxChange() {
    this.disabled = true;
    this.httpService.todoChecked(this.projectId, this.todo.id).subscribe(() => {
      this.disabled = false;
      this.checked = !this.checked;
    });
  }

  onDelete() {
    this.closeTodo.emit(this.todo.id);
  }

  onFocus(isFocus: boolean) {
    this.isFocus = isFocus;
  }
}
