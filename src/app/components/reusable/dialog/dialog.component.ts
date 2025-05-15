import { Component, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dialog',
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  @Input() dialogRef!: ElementRef<HTMLDialogElement>;
}
