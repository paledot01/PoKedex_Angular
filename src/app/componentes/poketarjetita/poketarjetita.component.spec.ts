import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoketarjetitaComponent } from './poketarjetita.component';

describe('PoketarjetitaComponent', () => {
  let component: PoketarjetitaComponent;
  let fixture: ComponentFixture<PoketarjetitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoketarjetitaComponent]
    });
    fixture = TestBed.createComponent(PoketarjetitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
