import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-column-expand-icon-button',
  imports: [],
  templateUrl: './column-expand-icon-button.component.html',
  styleUrl: './column-expand-icon-button.component.scss',
})
export class ColumnExpandIconButtonComponent {
  @Input({ required: true }) columnExpanded!: boolean;
  @Output() toggleColumnExpanded = new EventEmitter();

  toggleExpanded() {
    this.toggleColumnExpanded.emit();
  }
}
