import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mouse2Component } from './mouse2.component';

describe('Mouse2Component', () => {
  let component: Mouse2Component;
  let fixture: ComponentFixture<Mouse2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mouse2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mouse2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
