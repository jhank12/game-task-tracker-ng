import { Component, inject } from '@angular/core';

import { AppService } from '../../app.service';

import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  appService = inject(AppService);

  get projectBoards() {
    return this.appService.projectBoards;
  }

}
