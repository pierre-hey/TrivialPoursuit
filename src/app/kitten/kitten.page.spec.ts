import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KittenPage } from './kitten.page';

describe('KittenPage', () => {
  let component: KittenPage;
  let fixture: ComponentFixture<KittenPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(KittenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
