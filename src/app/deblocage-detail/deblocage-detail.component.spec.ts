import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeblocageDetailComponent } from './deblocage-detail.component';

describe('DeblocageDetailComponent', () => {
  let component: DeblocageDetailComponent;
  let fixture: ComponentFixture<DeblocageDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeblocageDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeblocageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
