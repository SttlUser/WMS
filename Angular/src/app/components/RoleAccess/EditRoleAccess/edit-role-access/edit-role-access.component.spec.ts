import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRoleAccessComponent } from './edit-role-access.component';

describe('EditRoleAccessComponent', () => {
  let component: EditRoleAccessComponent;
  let fixture: ComponentFixture<EditRoleAccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditRoleAccessComponent]
    });
    fixture = TestBed.createComponent(EditRoleAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
