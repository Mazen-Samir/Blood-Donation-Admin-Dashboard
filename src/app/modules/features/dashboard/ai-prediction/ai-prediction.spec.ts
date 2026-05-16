import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiPrediction } from './ai-prediction';

describe('AiPrediction', () => {
  let component: AiPrediction;
  let fixture: ComponentFixture<AiPrediction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiPrediction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiPrediction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
