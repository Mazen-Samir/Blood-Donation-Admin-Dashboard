import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrDetails } from './qr-details';

describe('QrDetails', () => {
  let component: QrDetails;
  let fixture: ComponentFixture<QrDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
