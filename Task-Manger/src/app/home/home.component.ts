import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CdkDragDrop,moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  machines:any;
  tasks:any;
  theArray:any;
  task:any;
  counters:any;
  machineIds:any;
  remainingTime: any;
  constructor(public Service:ApiService) {
    this.getMachines()
    this.getTasks() 
  }
  ngOnInit(): void {
  }
  deleteMachine(element:any){
    this.Service.postFun('deleteMachine',{id:element}).subscribe(data => {
      console.log(data);
      this.getMachines()
    })
  }
  deleteTask(element:any){
    this.Service.postFun('deleteTask',{id:element}).subscribe(data => {
      console.log(data);
      this.getTasks()
    })
  }
  getMachines(){
    this.machineIds=[]
    this.Service.getFun('getMachine').subscribe(data => {
      this.machines=data;
      for (let i = 0; i < this.machines.length; i++) {
        this.machineIds.push(this.machines[i].id.toString())
      }
      console.log(this.machineIds);
    })
  }
  getTasks(){
    this.Service.getFun('getTasks').subscribe(data => {
      console.log(data);
      this.tasks=data;
    })
  }
  onDrop(event:CdkDragDrop<string []>){
    if (event.previousContainer === event.container) {
        moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    }
    else{
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    }
  }
  // timeCounter(duration:any){
  //   try {
  //     var seconds = Math.floor((new Date(data[0].EndDate).getTime() - (new Date().getTime()))/1000);
  //     var minutes = Math.floor(seconds/60);
  //     var hours = Math.floor(minutes/60);
  //     var days = Math.floor(hours/24);
  
  //     hours = hours-(days*24);
  //     minutes = minutes-(days*24*60)-(hours*60);
  //     seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
  //     this.remainingTime=days+"D"+" : "+hours+"H"+" : "+minutes+"M"+" : "+seconds+"S";
  //   } catch (error:any) {
  //     console.log(error.message);
  //   }
  // }
  // countUp(duration:any){
  //   interval(1000).subscribe((ev)=>{
  //     this.timeCounter(duration)
  //   })  
  // }
}
