import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBoncommandeComponent } from './show-boncommande.component';

describe('ShowBoncommandeComponent', () => {
  let component: ShowBoncommandeComponent;
  let fixture: ComponentFixture<ShowBoncommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowBoncommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowBoncommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
