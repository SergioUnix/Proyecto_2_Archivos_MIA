import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenunciaCrearComponent } from './denuncia-crear.component';

describe('DenunciaCrearComponent', () => {
  let component: DenunciaCrearComponent;
  let fixture: ComponentFixture<DenunciaCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DenunciaCrearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DenunciaCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
