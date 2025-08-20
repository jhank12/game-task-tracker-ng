import { Component, signal, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-column-options-icon-button',
  imports: [],
  templateUrl: './column-options-icon-button.component.html',
  styleUrl: './column-options-icon-button.component.scss',
})
export class ColumnOptionsIconButtonComponent {
  @Output() toggleOptions = new EventEmitter();

  toggleColumnOptionsOpen() {
    this.toggleOptions.emit();
  }
}
