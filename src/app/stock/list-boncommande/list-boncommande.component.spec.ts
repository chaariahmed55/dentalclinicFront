import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBoncommandeComponent } from './list-boncommande.component';

describe('ListBoncommandeComponent', () => {
  let component: ListBoncommandeComponent;
  let fixture: ComponentFixture<ListBoncommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBoncommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBoncommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
