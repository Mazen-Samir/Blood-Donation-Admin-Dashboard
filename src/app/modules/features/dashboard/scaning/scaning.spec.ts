import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scaning } from './scaning';

describe('Scaning', () => {
  let component: Scaning;
  let fixture: ComponentFixture<Scaning>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Scaning]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Scaning);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
