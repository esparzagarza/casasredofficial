import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { SendAMailService } from './send-amail.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'

})
export class AppComponent {


  // landingpage
  whatsApi = environment.whatsApi;
  activatedSection: number = 0;

  contactForm: FormGroup = this.fb.group({
    formType: ['Contact', Validators.required],
    name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.maxLength(64)]],
    subject: ['', Validators.maxLength(256)],
    message: ['', Validators.maxLength(1024)],
  });

  // sell section

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
    '< $250 Mil',
    '$250 Mil - $350 Mil',
    '$350 Mil - $500 Mil',
    '$500 Mil - $750 Mil',
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

  sellerForm: FormGroup = this.fb.group({
    formType: ['Sell', Validators.required],
    name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.maxLength(64)]]
  });

  //rent section
  rent_step: boolean = false;

  rent_propertyTypes: string[] = [
    'Bodega',
    'Bodega industrial',
    'Casa',
    'Departamento',
    'Local comercial',
    'Nave industrial',
    'Terreno',
    'Otro tipo'
  ];

  rent_documentation: string[] = [
    '¡Sí señor, tengo todo en regla!',
    '¡Solo debo el recibo de agua!, si pasa, ¿no?',
    '¡No!, ¡fijese que me faltan documentos!',
    'Y, ¿sabe qué?, ¡perdí todos los documentos!',
    '¡Es complicado!',
  ]

  rent_targetDate: string[] = [
    'Este mes',
    '1 - 3 meses',
    '3 - 6 meses',
    '6 - 12 meses',
    '+12 meses'
  ];

  rent_motivation: string[] = [
    'Propiedad fea o deteriorada',
    'Altos costes de mantenimiento',
    'Mudanza por trabajo o cercano a la Familia',
    'Quiero poner dinero en mi bolsillo de Inmediato',
    'Solo quiero deshacerme de esta propiedad',
    'Otro tipo',
  ];

  rent_pricesRange: string[] = [
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


  rent_propertyForm: FormGroup = this.fb.group({
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

  constructor(private fb: FormBuilder, private sendAMailService: SendAMailService) { }

  letsdoit() {
    this.sendAMailService.sendAMail(this.contactForm.value.formType, this.contactForm.value)
      .subscribe(resp => {
        resp === 200
          ? Swal.fire('Mensaje recibido', 'Su mensaje ha sido enviado.<br />Un Asesor le contactará pronto', 'success')
          : Swal.fire('Su mensaje No fué enviado', 'Favor de intentarlo nuevamente', 'error');
        this.contactForm.reset();
        this.activateSection(-1)
      });
  }

  activateSection(section: number) {
    this.step = false;
    this.activatedSection = section;
  }


  moveStep(flag: boolean) {
    this.step = flag;
  }

  cancel() {
    this.propertyForm.reset();
    this.sellerForm.reset();
    this.rent_propertyForm.reset();
    this.rentForm.reset();
    this.step = false;
    this.activateSection(-1)
  }

  letsSell() {
    this.sendAMailService.sendAMail(this.sellerForm.value.formType, { ...this.sellerForm.value, ...this.propertyForm.value })
      .subscribe(resp => {
        resp === 200
          ? Swal.fire('Mensaje recibido', 'Su mensaje ha sido enviado.<br />Un Asesor le contactará pronto', 'success')
          : Swal.fire('Su mensaje No fué enviado', 'Favor de intentarlo nuevamente', 'error');

        this.cancel();
      });
  }

  letsRent() {
    this.sendAMailService.sendAMail(this.rentForm.value.formType, { ...this.rentForm.value, ...this.propertyForm.value })
      .subscribe(resp => {
        resp === 200
          ? Swal.fire('Mensaje recibido', 'Su mensaje ha sido enviado.<br />Un Asesor le contactará pronto', 'success')
          : Swal.fire('Su mensaje No fué enviado', 'Favor de intentarlo nuevamente', 'error');

        this.cancel();
      });
  }


}
