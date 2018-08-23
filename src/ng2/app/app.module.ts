import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlHandlingStrategy } from '@angular/router';

import { UpgradeModule, downgradeComponent } from '@angular/upgrade/static';
import { AppComponent } from './app.component';
import { Ng2DemoComponent } from './ng2-demo.component';
import { Ng3DemoComponent } from './ng3-demo.component';


// declare var angular: any;

export class CustomHandlingStrategy implements UrlHandlingStrategy {
  shouldProcessUrl(url) {
    console.log('url', url.toString());
    return url.toString().startsWith('/homee') || url.toString() === '/' || url.toString() === '/test'
  }
  extract(url) { return url; }
  merge(url, whole) { return url; }
}

// angular.module('heroApp', [])
//   .directive(
//     'ng2Demo',
//   downgradeComponent({ component: Ng2DemoComponent }) as angular.IDirectiveFactory
//   );

const routes: Routes = [
  { path: '', redirectTo: 'homee', pathMatch: 'full' },
  { path: 'homee', component: Ng2DemoComponent },
  { path: 'test', component: Ng3DemoComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    Ng2DemoComponent,
    Ng3DemoComponent
  ],
  imports: [
    BrowserModule,
    UpgradeModule,
    RouterModule.forRoot(routes,
      {
        useHash: true,
        enableTracing: false
      }
    )
  ],
  entryComponents: [
    Ng2DemoComponent, // Don't forget this!!!
  ],
  providers: [
    { provide: UrlHandlingStrategy, useClass: CustomHandlingStrategy }
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {
  ngDoBootstrap() { }
}

