import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderfrontComponent } from './headerfront.component';

describe('HeaderfrontComponent', () => {
  let component: HeaderfrontComponent;
  let fixture: ComponentFixture<HeaderfrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderfrontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
