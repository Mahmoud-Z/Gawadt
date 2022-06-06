import { Component, OnInit } from '@angular/core';
declare var $:any //declear $ to use jquery
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('.userIcon').click(function(){
      $('.chooser').css("left","0px")

  });
  $('.machineIcon').click(function(){
    $('.chooser').css("left","200px")
    
  });
  $('.checkIcon').click(function(){
    $('.chooser').css("left","400px")

      
  });
  }

  

}
