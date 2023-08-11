import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-whats',
  templateUrl: './whats.component.html',
  styleUrls: ['./whats.component.css']
})
export class WhatsComponent {

  whatsApi = environment.whatsApi;

}
