import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedOrderComponent } from './created-order.component';

describe('CreatedOrderComponent', () => {
  let component: CreatedOrderComponent;
  let fixture: ComponentFixture<CreatedOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatedOrderComponent]
    });
    fixture = TestBed.createComponent(CreatedOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
