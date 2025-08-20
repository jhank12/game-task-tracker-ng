import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenTaskIconButtonComponent } from './open-task-icon-button.component';

describe('OpenTaskIconButtonComponent', () => {
  let component: OpenTaskIconButtonComponent;
  let fixture: ComponentFixture<OpenTaskIconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenTaskIconButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenTaskIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
