import { Component, Input, Output, EventEmitter, signal } from '@angular/core';

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
    { tabName: 'kanban', icon: 'view_kanban' },
    { tabName: 'table', icon: 'table_rows' },
  ];

  capitalizeFirst(word: String): String {
    const firstLetter = word[0].toUpperCase();

    const remaining = word.slice(1);

    return firstLetter + remaining

  }

  setSelectedTab(tabVal: string) {
    this.setTab.emit(tabVal);
  }
}
