import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CdkDragDrop,moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { interval } from 'rxjs';
import { end } from '@popperjs/core';

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
    interval(1000).subscribe((ev)=>{
      this.counters={}
      for (let i = 0; i < Object.keys(this.tasks).length; i++) {
        if(this.tasks[Object.keys(this.tasks)[i]][0]!=undefined)
          this.counters[this.tasks[Object.keys(this.tasks)[i]][0].id]=this.timeCounter(this.tasks[Object.keys(this.tasks)[i]][0].endDate)
      }
    }) 
  }
  ngOnInit(): void {
  }
  timeCounter(endDate:any){
    var seconds = Math.floor(((new Date().getTime())-(new Date(endDate).getTime()))/1000);
    var minutes = Math.floor(seconds/60);
    var hours = Math.floor(minutes/60);
    var days = Math.floor(hours/24);
    hours = hours-(days*24);
    minutes = minutes-(days*24*60)-(hours*60);
    seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
    this.remainingTime=days+"D"+" : "+hours+"H"+" : "+minutes+"M"+" : "+seconds+"S";
    return this.remainingTime
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
      this.tasks=data;
      console.log(data);
      
    })
  }
  updateTask(machineId:any,taskId:any,machineIdBefore:any,taskIDsBefore:any) {
    this.Service.postFun('updateTask',{machineId,taskId,machineIdBefore,taskIDsBefore}).subscribe(data => {
      console.log(data);
      // this.getTasks()
    })
  }
  timeCalculation(id:any,oldTask:any){
    if (oldTask!=id) {
      this.Service.postFun('changeTime',{id,oldTask}).subscribe(data => {
        this.getTasks()
      })
    }
  }
  startStop(event:any,id:any){
    console.log(event.target.checked,id);
    if (event.target.checked==true) {
      this.Service.postFun('start',{id}).subscribe(data => {
        this.getMachines()
        this.getTasks()
      })
    } else {
      this.Service.postFun('stop',{id}).subscribe(data => {
        this.getMachines()
      })
    }
  }
  onDrop(event:CdkDragDrop<string []>,status:any){
    if (status=='true') {
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
      let taskIDs=[];
      let taskIDsBefore=[];
      for (let i = 0; i < event.container.data.length; i++) {
        taskIDs.push(JSON.parse(JSON.stringify(event.container.data[i])).id)
      }
      for (let i = 0; i < event.previousContainer.data.length; i++) {
        taskIDsBefore.push(JSON.parse(JSON.stringify(event.previousContainer.data[i])).id)
      }
      this.updateTask(event.container.id,taskIDs,event.previousContainer.id,taskIDsBefore)
      console.log(
        event.previousContainer.id,
        event.container.id,
        event.previousIndex,
        event.currentIndex);
      // console.log(JSON.parse(JSON.stringify(event.previousContainer.data[event.previousIndex])).id,JSON.parse(JSON.stringify(event.container.data[event.currentIndex])).id,this.tasks[event.previousContainer.id][1],this.tasks[event.container.id][1]);
      let oldTask;
      if (JSON.stringify(event.previousContainer.data[event.currentIndex])===undefined) {
        oldTask=JSON.parse(JSON.stringify(event.container.data[event.previousIndex])).id;
      } else {
        oldTask=JSON.parse(JSON.stringify(event.previousContainer.data[event.previousIndex])).id
      }
      console.log( event.previousContainer.id,event.previousContainer.data, event.container.id,event.container.data);
      this.timeCalculation(JSON.parse(JSON.stringify(event.container.data[event.currentIndex])).id,oldTask)
    }
  }
}
