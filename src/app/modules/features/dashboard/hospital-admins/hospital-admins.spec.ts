import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalAdmins } from './hospital-admins';

describe('HospitalAdmins', () => {
  let component: HospitalAdmins;
  let fixture: ComponentFixture<HospitalAdmins>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospitalAdmins]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalAdmins);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
