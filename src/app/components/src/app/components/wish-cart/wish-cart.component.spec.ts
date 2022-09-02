import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishCartComponent } from './wish-cart.component';

describe('WishCartComponent', () => {
  let component: WishCartComponent;
  let fixture: ComponentFixture<WishCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WishCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
