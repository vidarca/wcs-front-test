import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  public localData: any;

  constructor() {
    this.localData = [];
  }

  public checkLocalStorage(checkValue): Observable<any>{
    if(localStorage.getItem(checkValue) === null){
      return null
    }else{
      this.localData = JSON.parse(localStorage.getItem(checkValue));
      return this.localData
    }
  }

  public uploadLocalStorage(checkValue, uploadValue){
    if(this.checkLocalStorage(checkValue) !== null){
      this.localData.push(uploadValue);
      localStorage.setItem(checkValue, JSON.stringify(this.localData));
      console.log('Estudiante agregado con éxito');
    }else{
      this.localData.push(uploadValue);
      localStorage.setItem(checkValue, JSON.stringify(this.localData));
      console.log('Estudiante agregado con éxito');
    }
  }

}
