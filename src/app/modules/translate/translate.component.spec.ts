/**
 * Created by andrew on 10/24/17.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateComponent } from './translate.component';

describe('TranslateComponent', () => {
    let component: TranslateComponent;
    let fixture: ComponentFixture<TranslateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TranslateComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TranslateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
