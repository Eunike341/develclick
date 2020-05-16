import { Component , LOCALE_ID, Inject} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'develclick';

  languages = [
    { code: 'en', label: 'English'},
    { code: 'id', label: 'Indonesia'}
  ];
  constructor(@Inject(LOCALE_ID) protected localeId: string) {}

}
