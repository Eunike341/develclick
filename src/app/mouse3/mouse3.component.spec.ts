import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mouse3Component } from './mouse3.component';

describe('Mouse3Component', () => {
  let component: Mouse3Component;
  let fixture: ComponentFixture<Mouse3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mouse3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mouse3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
