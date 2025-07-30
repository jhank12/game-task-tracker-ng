import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-side-dialog',
  imports: [],
  templateUrl: './side-dialog.component.html',
  styleUrl: './side-dialog.component.scss',
})
export class SideDialogComponent {
  inputFieldDisabled = signal(true);
}
