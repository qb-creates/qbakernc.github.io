import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BluetoothListingComponent } from './bluetooth-listing.component';

describe('BluetoothListingComponent', () => {
  let component: BluetoothListingComponent;
  let fixture: ComponentFixture<BluetoothListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BluetoothListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BluetoothListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
