import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { SendAMailService } from '../services/send-amail.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html'

})
export class LandingComponent {

  whatsApi = environment.whatsApi;
  responseForm = 'Lets\' do it !';

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['',],
    message: ['',],
  });

  constructor(private fb: FormBuilder, private router: Router, private sendAMailService: SendAMailService) { }

  letsdoit() {

    const { name, email, subject, message } = this.contactForm.value;

    //this.sendAMailService

    this.responseForm = name;

  }

}
