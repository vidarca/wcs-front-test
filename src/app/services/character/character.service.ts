import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../global.service';
import { Character } from '../../models/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  public url: string;
  public characters: Character[];

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }

  public getCharacters(houseName): Observable<any>{
    return this._http.get(this.url + 'house/' + houseName);
  }

  public getStudents(): Observable<any>{
    return this._http.get(this.url + 'students');
  }

  public getTeachers(): Observable<any>{
    return this._http.get(this.url + 'staff');
  }
}
