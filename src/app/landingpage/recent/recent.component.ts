import { Component } from '@angular/core';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html'

})
export class RecentComponent {

  recentPost: string[] = [
    'assets/media/stock/01.png',
    'assets/media/stock/02.png',
    'assets/media/stock/03.png',
    'assets/media/stock/04.png',
    'assets/media/stock/05.png',
    'assets/media/stock/06.png',
    'assets/media/stock/07.png',
    'assets/media/stock/08.png',
    'assets/media/stock/09.png'
  ]
}
