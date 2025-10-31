import { Component, input, inject, signal } from '@angular/core';

import { PageContainerComponent } from '../reusable/page-container/page-container.component';
import { AppService } from '../../app.service';

import { HeaderJustifyBetweenComponent } from '../reusable/header-justify-between/header-justify-between.component';
import { ColumnsComponent } from '../columns/columns.component';

import { NavbarComponent } from '../navbar/navbar.component';
import { AddColumnDialogComponent } from '../add-column-dialog/add-column-dialog.component';
import { EditBoardModalComponent } from '../edit-board-modal/edit-board-modal.component';
import { MatDialog } from '@angular/material/dialog';

import { BoardTabsComponent } from '../board-tabs/board-tabs.component';

import { RouterLink, ActivatedRoute, Router, Params } from '@angular/router';

import { NgClass } from '@angular/common';


@Component({
  selector: 'app-board',
  imports: [
    HeaderJustifyBetweenComponent,
    PageContainerComponent,
    ColumnsComponent,
    NavbarComponent,
    AddColumnDialogComponent,
    EditBoardModalComponent,
    RouterLink,
    NgClass,
    BoardTabsComponent,
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  boardId = input.required<string>();

  appService = inject(AppService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  selectedTab = 'kanban';

  constructor(private _matDialog: MatDialog) {




  }


  availableViews = ['kanban', 'table'];

  isAvailableView(param: string): Boolean {

    if (this.availableViews.indexOf(param) > -1) {
      return true
    } else return false

  }

  get board() {
    return this.appService.selectedProjectBoard();
  }

  changeSelectedTab(tab: string) {
    this.selectedTab = tab;
    this.router.navigate(['/boards/', this.boardId()], {

      queryParams: {
        view: tab
      }

    })
  }

  openAddColumnModal() {
    this._matDialog.open(AddColumnDialogComponent, {
      panelClass: 'dialogContainer',
      width: '600px',
      height: 'fit-content',
    });
  }

  openEditBoardModal() {
    this._matDialog.open(EditBoardModalComponent, {
      data: this.board,
      panelClass: 'dialogContainer',
    });
  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((res) => {
      if (res['view'] !== undefined && res['view'] !== '' && this.isAvailableView(res['view'])) {
        // this.selectedTab.set(res['view'])
        this.selectedTab = res['view']


      } else {
        // this.selectedTab.set('Kanban')
        this.selectedTab = 'kanban'

        this.router.navigate([], {
          queryParams: {
            'view': null,
          },
          queryParamsHandling: 'merge'
        });
      }



    })

    this.appService.setSelectedId(this.boardId());

    this.activatedRoute.params.subscribe((params: Params) => {

      const id = params['boardId'];

      this.appService.setSelectedId(id)

    })

  }


}
