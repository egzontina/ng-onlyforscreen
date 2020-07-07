import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ScreenDirective} from './directives/screen.directive';
import {screenWidthService, ScreenService} from './services/screen.service';
import {BreakpointObserver, LayoutModule, MediaMatcher} from '@angular/cdk/layout';
import {Platform} from '@angular/cdk/platform';

@NgModule({
  declarations: [
    AppComponent,
    ScreenDirective
  ],
  imports: [
    BrowserModule,
    LayoutModule
  ],
  providers: [
    MediaMatcher,
    Platform,
    BreakpointObserver,
    {provide: ScreenService, useFactory: screenWidthService({mobile: 480, tablet: 768})}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
