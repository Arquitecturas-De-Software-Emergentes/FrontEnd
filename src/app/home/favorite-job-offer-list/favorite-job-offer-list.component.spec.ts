import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteJobOfferListComponent } from './favorite-job-offer-list.component';

describe('FavoriteJobOfferListComponent', () => {
  let component: FavoriteJobOfferListComponent;
  let fixture: ComponentFixture<FavoriteJobOfferListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteJobOfferListComponent]
    });
    fixture = TestBed.createComponent(FavoriteJobOfferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
