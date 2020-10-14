import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoMioComponent } from './producto-mio.component';

describe('ProductoMioComponent', () => {
  let component: ProductoMioComponent;
  let fixture: ComponentFixture<ProductoMioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoMioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoMioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
