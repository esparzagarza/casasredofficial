import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SendAMailService } from '../../send-amail.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']

})
export class RentComponent {

  step: boolean = false;

  propertyTypes: string[] = [
    'Bodega',
    'Bodega industrial',
    'Casa',
    'Departamento',
    'Local comercial',
    'Nave industrial',
    'Terreno',
    'Otro tipo'
  ];

  documentation: string[] = [
    '¡Sí señor, tengo todo en regla!',
    '¡Solo debo el recibo de agua!, si pasa, ¿no?',
    '¡No!, ¡fijese que me faltan documentos!',
    'Y, ¿sabe qué?, ¡perdí todos los documentos!',
    '¡Es complicado!',
  ]

  targetDate: string[] = [
    'Este mes',
    '1 - 3 meses',
    '3 - 6 meses',
    '6 - 12 meses',
    '+12 meses'
  ];

  motivation: string[] = [
    'Propiedad fea o deteriorada',
    'Altos costes de mantenimiento',
    'Mudanza por trabajo o cercano a la Familia',
    'Quiero poner dinero en mi bolsillo de Inmediato',
    'Solo quiero deshacerme de esta propiedad',
    'Otro tipo',
  ];

  pricesRange: string[] = [
    '< $50 Mil',
    '$50 Mil - $150 Mil',
    '$150 Mil - $300 Mil',
    '$300 Mil - $550 Mil',
    '$550 Mil - $750 Mil',
    '$750 Mil - $1.0 Millón',
    '$1.0 Millón - $1.5 Millones',
    '$1.5 Millones - $2.5 Millones',
    '$2.5 Millones - $5.0 Millones',
    '$5.0 Millones +',
  ];


  propertyForm: FormGroup = this.fb.group({
    propertyType: ['', Validators.required],
    documentation: ['', Validators.required],
    targetDate: ['', Validators.required],
    motivation: ['', Validators.required],
    pricesRange: ['', Validators.required],
    predial: ['', Validators.maxLength(64)],
    subject: ['', Validators.maxLength(64)],
    message: ['', Validators.maxLength(1024)]
  });

  rentForm: FormGroup = this.fb.group({
    formType: ['Rent', Validators.required],
    name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.maxLength(64)]]
  });

  constructor(private fb: FormBuilder, private router: Router, private sendAMailService: SendAMailService) { }

  moveStep(flag: boolean) {
    this.step = flag;
  }

  cancel() {
    this.propertyForm.reset();
    this.rentForm.reset();
    this.step = false;
    this.router.navigateByUrl("gracias");
  }

  letsdoit() {
    this.sendAMailService.sendAMail(this.rentForm.value.formType, { ...this.rentForm.value, ...this.propertyForm.value })
      .subscribe(resp => {
        resp === 200
          ? Swal.fire('Mensaje recibido', 'Su mensaje ha sido enviado.<br />Un Asesor le contactará pronto', 'success')
          : Swal.fire('Su mensaje No fué enviado', 'Favor de intentarlo nuevamente', 'error');

        this.cancel();
      });
  }
}