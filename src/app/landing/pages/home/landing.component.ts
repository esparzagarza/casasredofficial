import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SendAMailService } from '../../send-amail.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html'

})
export class LandingComponent {

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required], Validators.maxLength(64)],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.maxLength(256)],
    message: ['', Validators.maxLength(1024)]
  });

  constructor(private fb: FormBuilder, private router: Router, private sendAMailService: SendAMailService) { }

  letsdoit() {
    const { name, email, subject, message } = this.contactForm.value;
    this.sendAMailService.sendAMail(name, email, subject, message)
      .subscribe(resp => {
        this.contactForm.reset();
        resp === 200
          ? Swal.fire('Mensaje recibido', 'Su mensaje ha sido enviado.<br />Un Asesor le contactará pronto', 'success')
          : Swal.fire('Su mensaje No fué enviado', 'Favor de intentarlo nuevamente', 'error');
      });
  }
}
