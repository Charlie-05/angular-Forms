import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators , AbstractControl , ValidationErrors , ValidatorFn, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
[x: string]: any;
  title = '2024-10-13';

  user = {
    email: '',
    password: ''
  }

  customer = {
    fullname: '',
    gender: '',
    country: ''
  }

  student = {
    name: null as unknown as string,
    dateOfBirth: '',
    age: null as unknown as number
  }

  contactDetails = {
    name: "",
    email : '',
    message : ''
  }

  contactSubmitted : boolean = false;

  signUpForm : any ;
  constructor(private fb : FormBuilder){
    this.signUpForm = this.fb.group({
      username : ['' , [this.NospaceValidator()]],
      password : [ '' ,[this.createPasswordStrengthValidator()] ]
    })
  }


  // Custom validation function
  createPasswordStrengthValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        const hasUpperCase = /[A-Z]+/.test(value);

        const hasLowerCase = /[a-z]+/.test(value);

        const hasNumeric = /[0-9]+/.test(value);

        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

        return !passwordValid ? {passwordStrength:true}: null;
    }
}


NospaceValidator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {

      const value = control.value;

      if (!value) {
          return null;
      }

      // const hasUpperCase = /[A-Z]+/.test(value);

      // const hasLowerCase = /[a-z]+/.test(value);

      // const hasNumeric = /[0-9]+/.test(value);
      let result = true;
      let strArray = value.split('');
      strArray.forEach((x : string) => {
        if(x == " "){
          result = false
        }
      });

      //const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

      return !result ? {noSpace:true}: null;
  }
}

  onSubmit(logInform: any) {
    console.log(logInform.value)
  }
  onRegister(registerForm: any) {
    console.log(registerForm.value);
    console.log(this.customer)
  }

  onContactSubmit(contactForm : any){
    this.contactSubmitted = true;
    console.log(contactForm.value)
  }
}
