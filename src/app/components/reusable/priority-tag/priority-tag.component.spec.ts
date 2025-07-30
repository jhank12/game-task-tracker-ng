import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityTagComponent } from './priority-tag.component';

describe('PriorityTagComponent', () => {
  let component: PriorityTagComponent;
  let fixture: ComponentFixture<PriorityTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriorityTagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriorityTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
