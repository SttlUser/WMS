import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDataDisplayComponent } from './company-data-display.component';

describe('CompanyDataDisplayComponent', () => {
  let component: CompanyDataDisplayComponent;
  let fixture: ComponentFixture<CompanyDataDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyDataDisplayComponent]
    });
    fixture = TestBed.createComponent(CompanyDataDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
