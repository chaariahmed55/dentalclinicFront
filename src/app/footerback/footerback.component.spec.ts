import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterbackComponent } from './footerback.component';

describe('FooterbackComponent', () => {
  let component: FooterbackComponent;
  let fixture: ComponentFixture<FooterbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
