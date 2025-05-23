import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskOptionsComponent } from './task-options.component';

describe('TaskOptionsComponent', () => {
  let component: TaskOptionsComponent;
  let fixture: ComponentFixture<TaskOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
