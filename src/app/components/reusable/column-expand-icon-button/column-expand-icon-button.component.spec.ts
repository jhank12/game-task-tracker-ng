import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnExpandIconButtonComponent } from './column-expand-icon-button.component';

describe('ColumnExpandIconButtonComponent', () => {
  let component: ColumnExpandIconButtonComponent;
  let fixture: ComponentFixture<ColumnExpandIconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnExpandIconButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnExpandIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
