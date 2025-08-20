import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleTaskCompleteButtonComponent } from './toggle-task-complete-button.component';

describe('ToggleTaskCompleteButtonComponent', () => {
  let component: ToggleTaskCompleteButtonComponent;
  let fixture: ComponentFixture<ToggleTaskCompleteButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleTaskCompleteButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleTaskCompleteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
