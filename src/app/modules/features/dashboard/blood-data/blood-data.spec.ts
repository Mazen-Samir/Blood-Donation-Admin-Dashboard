import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodData } from './blood-data';

describe('BloodData', () => {
  let component: BloodData;
  let fixture: ComponentFixture<BloodData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BloodData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloodData);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
