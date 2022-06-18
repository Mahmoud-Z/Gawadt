import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
declare var $:any

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required])),
    password:new FormControl("",Validators.compose([Validators.required])),
  
  })
  
  constructor(public Service:ApiService ,private _Router:Router) { }
  login(){
    this.Service.postFun('logIn',this.form.value).subscribe(data => {

      if (data == "done") {
        this._Router.navigate(['/home'])
        localStorage.setItem("token",data.token)
      }
        $('#liveToast').toast('show')
        $('.toast-body').html(data)

    })
  }

  ngOnInit(): void {
  }

}
