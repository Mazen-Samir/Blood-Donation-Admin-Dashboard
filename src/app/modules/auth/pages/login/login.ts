import { Component , inject} from '@angular/core';
import { 
  FormsModule, 
  FormBuilder,  
  ReactiveFormsModule, 
  Validators, 
  FormGroup, 
  FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CommonModule,
    InputTextModule,
    ToastModule,],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

    // constructor(private auth: AuthService,private router: Router){}

    // simuolation untl the API is ready, will delete this line later
    constructor(private router: Router){} 


  // errorMassage:string = '';
  passwordVisibility: boolean = false;
  // messageService = inject(MessageService);

  private formBuilder = inject(FormBuilder);

  loginForm = this.formBuilder.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  })

  onSubmit(): void{ 

    // simulation untl the API is ready, will delete this line later
    this.router.navigate(['/dashboard']);

    // if (this.loginForm.valid) {
    //   // send user name and password to Api
    //   this.auth.login(this.loginForm.value).subscribe({
    //     next: (res)=>{
    //       // if success is true 
    //       if (res.success) {
    //         console.log(this.auth.isAdmin());
    //         this.auth.storeToken(res.token);  // save his token in localStorage
            
    //         // check user is admin or not 
    //         if(this.auth.isAdmin()){
    //           this.loginForm.reset();  // reset the form
    //           this.router.navigate(['/dashboard']);  // redirect to dashboard
    //           // display alert 
    //           this.messageService.add({
    //             severity: 'success',
    //             summary: 'Success',
    //             detail: 'Login successfully!',
    //           });
    //         }
    //         // if the user are not admin
    //         else{
    //           this.loginForm.reset();
    //           this.errorMassage = 'You are not admin';  
    //         }

    //       }
          
    //     },
    //     error: (err) => {
    //       this.loginForm.reset();
    //       this.errorMassage = 'Check your Username or Password';        
    //     },
    //   });
    // }else{
    //   this.validateAllFormFileds(this.loginForm);
    // }
  }

  // private validateAllFormFileds(formGroup: FormGroup){
  //   Object.keys(formGroup.controls).forEach(filed =>{
  //     const control = formGroup.get(filed);
  //     if(control instanceof FormControl){
  //       control.markAsDirty({ onlySelf: true });
  //     } else if(control instanceof FormGroup){
  //       this.validateAllFormFileds(control);
  //     }
  //   })
  // }
  
  togglePasswordVisibility(): void {
    
    this.passwordVisibility = !this.passwordVisibility;
    

  }

}
