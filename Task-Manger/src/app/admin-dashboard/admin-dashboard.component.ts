import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
declare var $:any //declear $ to use jquery
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  userForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    type: new FormControl('')
  })
  machineForm = new FormGroup({
    machineName: new FormControl(''),
    password: new FormControl(''),
  })
  userFormValue:any;
  machineFormValue:any;


  constructor() { }

  ngOnInit(): void {
    $('.userIcon').click(function(){
      $('.chooser').css("left","0px")
      $('.userDiv').css("display", "none");
      $('.machineDiv').toggleClass('d-none');
      $('.userDiv').removeClass('d-none');

  });
  $('.machineIcon').click(function(){
    $('.chooser').css("left","200px")
    $('.userDiv').toggleClass('d-none');
    $('.machineDiv').removeClass('d-none');
    
  });
  $('.checkIcon').click(function(){
    $('.chooser').css("left","400px")

      
  });
  }

  addUser(){
    console.log(this.userForm.value);

  }
  addMachine(){
    console.log(this.machineForm.value);

  }
  

}
