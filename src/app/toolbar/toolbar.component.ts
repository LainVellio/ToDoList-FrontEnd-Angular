import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input() disabledOpenForm!: boolean;
  @Output() buttonClick = new EventEmitter();

  openForm() {
    this.buttonClick.emit(true);
  }
}
