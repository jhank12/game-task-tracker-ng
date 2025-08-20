import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardTabsComponent } from './board-tabs.component';

describe('BoardTabsComponent', () => {
  let component: BoardTabsComponent;
  let fixture: ComponentFixture<BoardTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
