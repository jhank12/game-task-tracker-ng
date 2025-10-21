import { Component, inject, signal } from '@angular/core';

import { AppService } from '../../app.service';

import { RouterLink } from '@angular/router';

import { ProjectBoard } from '../../models/models';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  appService = inject(AppService);

  dropdownExpanded = signal(false)

  get projects(): ProjectBoard[] {
    return this.appService.projectBoards()
  }

  setSelectedId(id: string) {
    this.appService.setSelectedId(id)
    this.toggleDropdownExpanded()
  }

  toggleDropdownExpanded() {
    this.dropdownExpanded.update(expanded => !expanded)
  }


}
