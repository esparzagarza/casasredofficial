import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SendAMailService } from '../../send-amail.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']

})
export class SellComponent {

  propertyTypes: string[] = [
    'Bodega',
    'Bodega Industrial',
    'Casa',
    'Departamento',
    'Local Comercial',
    'Nave industrial',
    'Terreno',
    'Otro tipo'
  ];

  targetDate: string[] = [
    'Este mes',
    '1 - 3 meses',
    '3 - 6 meses',
    '6 - 12 meses',
    '+12 meses'
  ];

  sellForm: FormGroup = this.fb.group({
    formType: ['Sell', Validators.required],
    propertyType: ['', Validators.required],
    documentation: ['', Validators.required],
    predial: [''],
    amount: ['', Validators.max(9999999)],
    name: ['', [Validators.required], Validators.maxLength(64)],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.maxLength(256)],
    message: ['', Validators.maxLength(1024)]
  });

  constructor(private fb: FormBuilder, private router: Router, private sendAMailService: SendAMailService) { }

  letsdoit() {
    this.sendAMailService.sendAMail(this.sellForm.value.formType, this.sellForm.value)
      .subscribe(resp => {
        this.sellForm.reset();
        resp === 200
          ? Swal.fire('Mensaje recibido', 'Su mensaje ha sido enviado.<br />Un Asesor le contactará pronto', 'success')
          : Swal.fire('Su mensaje No fué enviado', 'Favor de intentarlo nuevamente', 'error');

        this.router.navigate(['']);
      });
  }

}
