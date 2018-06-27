import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, UrlHandlingStrategy } from '@angular/router';

import { UpgradeModule, downgradeComponent } from '@angular/upgrade/static';
import { AppComponent } from './app.component';
import { Ng2DemoComponent } from './ng2-demo.component';

declare var angular: any;

export class CustomHandlingStrategy implements UrlHandlingStrategy {
  shouldProcessUrl(url) {
    return url.toString().startsWith('/route') || url.toString() === '/'
  }
  extract(url) { return url; }
  merge(url, whole) { return url; }
}

// angular.module('onefaculty')
//   .directive(
//     'ng2Demo',
//     downgradeComponent({ component: Ng2DemoComponent })
//   );

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
        path: 'route',
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

  // constructor(private upgrade: UpgradeModule) { }
  // ngDoBootstrap() {
  //   this.upgrade.bootstrap(document.body, ['phonecatApp'], { strictDi: true });
  // }
}

