import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SendAMailService } from '../../send-amail.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html'

})
export class LandingComponent {

  contactForm: FormGroup = this.fb.group({
    formType: ['Contact', Validators.required],
    name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.maxLength(64)]],
    subject: ['', Validators.maxLength(256)],
    message: ['', Validators.maxLength(1024)],
  });

  constructor(private fb: FormBuilder, private router: Router, private sendAMailService: SendAMailService) { }

  letsdoit() {
    this.sendAMailService.sendAMail(this.contactForm.value.formType, this.contactForm.value)
      .subscribe(resp => {
        resp === 200
          ? Swal.fire('Mensaje recibido', 'Su mensaje ha sido enviado.<br />Un Asesor le contactará pronto', 'success')
          : Swal.fire('Su mensaje No fué enviado', 'Favor de intentarlo nuevamente', 'error');
        this.contactForm.reset();
        this.router.navigateByUrl("gracias");
      });
  }
}
