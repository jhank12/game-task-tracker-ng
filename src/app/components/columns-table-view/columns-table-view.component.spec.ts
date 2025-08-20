import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnsTableViewComponent } from './columns-table-view.component';

describe('ColumnsTableViewComponent', () => {
  let component: ColumnsTableViewComponent;
  let fixture: ComponentFixture<ColumnsTableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnsTableViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnsTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
