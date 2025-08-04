import { Component, input } from '@angular/core';

@Component({
  selector: 'app-column-page',
  imports: [],
  templateUrl: './column-page.component.html',
  styleUrl: './column-page.component.scss',
})
export class ColumnPageComponent {
  columnId = input.required<string>();
}
