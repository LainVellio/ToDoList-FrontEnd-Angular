import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() disabledOpenForm!: boolean;
  @Output() buttonClick = new EventEmitter();

  openForm() {
    this.buttonClick.emit();
  }
  ngOnInit(): void {}
}
