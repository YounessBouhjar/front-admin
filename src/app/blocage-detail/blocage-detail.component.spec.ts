import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocageDetailComponent } from './blocage-detail.component';

describe('BlocageDetailComponent', () => {
  let component: BlocageDetailComponent;
  let fixture: ComponentFixture<BlocageDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocageDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
