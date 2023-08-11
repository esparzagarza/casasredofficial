import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IQuote } from '../iquote';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {

  showForm: boolean = true;
  return: string = '';
  result: any = 0;
  whatsApi = environment.whatsApi;

  shippers: string[] = [];
  types: string[] = ['terrestre', 'aereo'];
  aShippers: string[] = ['DHL', 'FEDEX', 'ESTAFETA'];
  tShippers: string[] = ['FEDEX', 'ESTAFETA', 'PAQUETEXPRESS', 'REDPACK'];
  heroe: IQuote = { type: '', shipper: '', high: 1, long: 1, width: 1, weight: 1 };

  ngOnInit(): void { this.resetQuot(); }

  quoteIt() {
    const volume = this.calculateVolum(this.heroe.high, this.heroe.long, this.heroe.width);
    const mayorWeight = volume > this.heroe.weight ? volume : this.heroe.weight;
    const kg = this.round(mayorWeight);
    const shipper = this.heroe.type == 'terrestre' ? environment.terrestre : environment.aereo;
    const getCosts = shipper.find(s => s.kg == kg)?.cost;
    this.result = getCosts?.find(c => c.name == this.heroe.shipper)?.cost
    this.return = this.result > 0 ? 'Tu envío costaría' : 'Precio No Disponible';
    this.showForm = false;
  }

  private calculateVolum(high: number, long: number, width: number): number { return high * long * width / 5000; };
  private round(x: number): number {
    if (x > 1) return x % 5 == 0 ? Math.floor(x / 5) * 5 : (Math.floor(x / 5) * 5) + 5;
    else return 1;
  }

  asignShipper() {
    this.shippers = this.heroe.type === 'terrestre' ? this.tShippers : this.aShippers;
    this.heroe.shipper = this.heroe.type === 'terrestre' ? 'FEDEX' : 'DHL';
  }

  resetQuot() {
    this.heroe = {
      type: 'terrestre',
      shipper: 'DHL',
      high: 1,
      long: 1,
      width: 1,
      weight: 1,
    }
    this.result = 0;
    this.asignShipper();
    this.showForm = true;
  }
}
