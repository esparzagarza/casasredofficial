import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SendAMailService } from '../../send-amail.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html'

})
export class LandingComponent {

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['',],
    message: ['',],
  });

  constructor(private fb: FormBuilder, private router: Router, private sendAMailService: SendAMailService) { }

  letsdoit() {

    const { name, email, subject, message } = this.contactForm.value;

    this.sendAMailService.sendAMail(name, email, subject, message)
      .subscribe(resp => {

        if (resp === 200) console.log('es un 200');
        else console.log('no enviado');

      });
  }
}
