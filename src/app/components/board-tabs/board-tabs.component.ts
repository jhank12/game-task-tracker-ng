import { Component, Input, Output, EventEmitter } from '@angular/core';

import { NgClass } from '@angular/common';

@Component({
  selector: 'app-board-tabs',
  imports: [NgClass],
  templateUrl: './board-tabs.component.html',
  styleUrl: './board-tabs.component.scss',
})
export class BoardTabsComponent {
  @Input({ required: true }) selectedTab!: string;
  @Output() setTab = new EventEmitter<string>();

  tabsArr = [
    { tabName: 'Kanban', icon: 'view_kanban' },
    { tabName: 'Table', icon: 'table_rows' },
  ];

  setSelectedTab(tabVal: string) {
    this.setTab.emit(tabVal);
  }
}
