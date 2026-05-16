import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodInventory } from './blood-inventory';

describe('BloodInventory', () => {
  let component: BloodInventory;
  let fixture: ComponentFixture<BloodInventory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BloodInventory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloodInventory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
