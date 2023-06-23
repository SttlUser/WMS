import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUsermasterComponent } from './edit-usermaster.component';

describe('EditUsermasterComponent', () => {
  let component: EditUsermasterComponent;
  let fixture: ComponentFixture<EditUsermasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditUsermasterComponent]
    });
    fixture = TestBed.createComponent(EditUsermasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
