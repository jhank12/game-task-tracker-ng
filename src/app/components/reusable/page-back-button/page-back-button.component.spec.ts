import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBackButtonComponent } from './page-back-button.component';

describe('PageBackButtonComponent', () => {
  let component: PageBackButtonComponent;
  let fixture: ComponentFixture<PageBackButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageBackButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageBackButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
