import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenunciaListComponent } from './denuncia-list.component';

describe('DenunciaListComponent', () => {
  let component: DenunciaListComponent;
  let fixture: ComponentFixture<DenunciaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DenunciaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DenunciaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
