import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { PasswordService } from 'src/app/_services/password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentUser?: User ={
    username: '',
    email: '',
    question: '',
    answer: ''
  };

  message = '';

  form: any = {
    username: null
  };

  form2: any = {
    answer: null
  };

  isSuccess = false;
  isFailed = false;
  errorMessage = '';

  constructor(private passwordService: PasswordService, private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      
    }
  }
  onSubmit(): void {
    const { username } = this.form;

    this.passwordService.get(username).subscribe({
      next: (data)  => {
        this.currentUser = data;
        this.isFailed = false;
        this.isSuccess = true;
        console.log(data);
        // this.reloadPage();
      },
      error: (err: { error: { message: string; }; }) => {
        this.errorMessage = err.error.message;
        this.isFailed = true;
      }
    });
  }
   question = this.currentUser?.question;

  onSubmit2(): void{
    const { answer } = this.form;

    if(answer.equals(this.currentUser?.answer)){
      console.log("You have give Correct Answer");
    }
  }


}
