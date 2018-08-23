import { Component} from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';


   constructor(private upgrade: UpgradeModule) { }

    ngOnInit() {
      console.log('sdfgsdfgsdf 121212');
      this.upgrade.bootstrap(document.body, ['onefaculty']);
    }
}
