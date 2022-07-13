import { Injectable } from '@angular/core';
import {HomeComponent} from '../home/home.component';
@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  constructor(public home:HomeComponent) { }
  refreshMachines(){
    this.home.getMachines();
  }
}
