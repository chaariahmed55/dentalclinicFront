import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAddEditEquipementComponent } from './list-add-edit-equipement.component';

describe('ListAddEditEquipementComponent', () => {
  let component: ListAddEditEquipementComponent;
  let fixture: ComponentFixture<ListAddEditEquipementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAddEditEquipementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAddEditEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
