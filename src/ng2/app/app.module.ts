import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, UrlHandlingStrategy } from '@angular/router';

import { UpgradeModule, downgradeComponent } from '@angular/upgrade/static';
import { AppComponent } from './app.component';
import { Ng2DemoComponent } from './ng2-demo.component';

declare var angular: any;

export class CustomHandlingStrategy implements UrlHandlingStrategy {
  shouldProcessUrl(url) {
    console.log('url', url.toString());
    return url.toString().startsWith('/homee') || url.toString() === '/'
  }
  extract(url) { return url; }
  merge(url, whole) { return url; }
}

angular.module('onefaculty')
  .directive(
    'ng2Demo',
    downgradeComponent({ component: Ng2DemoComponent })
  );

@NgModule({
  declarations: [
    AppComponent,
    Ng2DemoComponent
  ],
  imports: [
    BrowserModule,
    UpgradeModule,
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'homee'
      },
      {
        path: 'homee',
        component: Ng2DemoComponent
      }
    ],
      {
        useHash: true,
        enableTracing: false
      }
    )
  ],
  entryComponents: [
    Ng2DemoComponent // Don't forget this!!!
  ],
  providers: [
    { provide: UrlHandlingStrategy, useClass: CustomHandlingStrategy }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

  constructor(private upgrade: UpgradeModule) { }
  ngDoBootstrap() {
    // this.upgrade.bootstrap(document.body, ['onefaculty'], { strictDi: true });
    // console.log('sdfgsdfgsdf 121212');
    // this.upgrade.bootstrap(document.body, ['onefaculty']);
  }
}

