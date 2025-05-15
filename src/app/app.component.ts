import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddColumnDialogComponent } from './components/add-column-dialog/add-column-dialog.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AddColumnDialogComponent,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('createColumnDialog')
  createColumnDialog!: ElementRef<HTMLDialogElement>;

  selectedId = this.projectBoards.length > 0 ? this.projectBoards[0].id : '';

  get projectBoard() {
    return this.projectBoards?.filter((board) => {
      return board.id == this.selectedId;
    })[0];
  }

  setSelectedId(id: string) {
    this.selectedId = id;
  }

  constructor(private _matDialog: MatDialog) {}

  openModal() {
    this._matDialog.open(AddColumnDialogComponent, {
      width: '600px',
      height: '400px',
    });
  }

  closeModal() {
    this.createColumnDialog.nativeElement.close();
    this._matDialog.closeAll();
  }
}
