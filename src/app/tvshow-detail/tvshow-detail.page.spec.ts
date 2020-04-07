import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvshowDetailPage } from './tvshow-detail.page';

describe('TvshowDetailPage', () => {
  let component: TvshowDetailPage;
  let fixture: ComponentFixture<TvshowDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvshowDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvshowDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
