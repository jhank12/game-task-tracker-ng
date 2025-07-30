import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-back-button',
  imports: [RouterLink],
  templateUrl: './page-back-button.component.html',
  styleUrl: './page-back-button.component.scss',
})
export class PageBackButtonComponent {
  @Input({ required: true }) path!: string;
  @Input({ required: true }) btnText!: string;
}
