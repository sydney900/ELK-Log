import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MaterialModule } from './mat.module';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        RouterModule.forRoot([
        ]),
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Payment'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Payment');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-toolbar').textContent).toContain('Payment');
  }));
});
