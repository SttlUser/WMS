import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRegisterCompanyComponent } from './edit-register-company.component';

describe('EditRegisterCompanyComponent', () => {
  let component: EditRegisterCompanyComponent;
  let fixture: ComponentFixture<EditRegisterCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditRegisterCompanyComponent]
    });
    fixture = TestBed.createComponent(EditRegisterCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
