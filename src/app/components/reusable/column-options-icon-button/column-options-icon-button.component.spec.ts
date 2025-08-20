import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnOptionsIconButtonComponent } from './column-options-icon-button.component';

describe('ColumnOptionsIconButtonComponent', () => {
  let component: ColumnOptionsIconButtonComponent;
  let fixture: ComponentFixture<ColumnOptionsIconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnOptionsIconButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnOptionsIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
