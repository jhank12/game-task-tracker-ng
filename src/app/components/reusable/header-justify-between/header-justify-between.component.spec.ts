import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderJustifyBetweenComponent } from './header-justify-between.component';

describe('HeaderJustifyBetweenComponent', () => {
  let component: HeaderJustifyBetweenComponent;
  let fixture: ComponentFixture<HeaderJustifyBetweenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderJustifyBetweenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderJustifyBetweenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
