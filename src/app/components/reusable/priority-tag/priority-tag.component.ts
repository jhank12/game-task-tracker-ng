import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-priority-tag',
  imports: [NgClass],
  templateUrl: './priority-tag.component.html',
  styleUrl: './priority-tag.component.scss',
})
export class PriorityTagComponent {
  @Input({ required: true }) taskPriority!: string;
}
