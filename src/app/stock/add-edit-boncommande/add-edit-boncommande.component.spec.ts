import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBoncommandeComponent } from './add-edit-boncommande.component';

describe('AddEditBoncommandeComponent', () => {
  let component: AddEditBoncommandeComponent;
  let fixture: ComponentFixture<AddEditBoncommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditBoncommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditBoncommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
