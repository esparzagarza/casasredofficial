import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']

})
export class FooterComponent {

  whatsApi = environment.whatsApi;


}
