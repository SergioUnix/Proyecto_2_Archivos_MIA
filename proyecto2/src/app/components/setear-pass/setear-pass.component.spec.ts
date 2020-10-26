import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetearPassComponent } from './setear-pass.component';

describe('SetearPassComponent', () => {
  let component: SetearPassComponent;
  let fixture: ComponentFixture<SetearPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetearPassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetearPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
