import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAcessListComponent } from './role-acess-list.component';

describe('RoleAcessListComponent', () => {
  let component: RoleAcessListComponent;
  let fixture: ComponentFixture<RoleAcessListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoleAcessListComponent]
    });
    fixture = TestBed.createComponent(RoleAcessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
