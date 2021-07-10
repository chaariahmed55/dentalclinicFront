import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEquipementComponent } from './add-edit-equipement.component';

describe('AddEditEquipementComponent', () => {
  let component: AddEditEquipementComponent;
  let fixture: ComponentFixture<AddEditEquipementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditEquipementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
