import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantaKit } from './quanta-kit';

describe('QuantaKit', () => {
  let component: QuantaKit;
  let fixture: ComponentFixture<QuantaKit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantaKit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantaKit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
