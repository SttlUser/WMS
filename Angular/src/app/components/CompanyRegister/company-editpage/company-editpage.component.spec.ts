import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyEditpageComponent } from './company-editpage.component';

describe('CompanyEditpageComponent', () => {
  let component: CompanyEditpageComponent;
  let fixture: ComponentFixture<CompanyEditpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyEditpageComponent]
    });
    fixture = TestBed.createComponent(CompanyEditpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
