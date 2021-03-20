import { Component, OnInit, ViewChild } from '@angular/core';
import { CharacterService } from '../../services/character/character.service';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';
import { Character } from '../../models/character';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import * as $ from 'jquery';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  providers: [CharacterService, LocalstorageService]
})
export class StudentsComponent implements OnInit {

  public characters: Character[];
  public newStudent: string;
  public currentYear: number;
  public displayedColumns: string[] = ['name', 'patronus', 'age', 'image'];
  public dataSource: MatTableDataSource<any>;
  public error: string;
  private _sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this._sort = ms;
    this.dataSource.sort = this._sort;
  }

  constructor(
    private _characterService: CharacterService,
    private _localstorageService: LocalstorageService
  ) {
    this.characters = [];
    this.currentYear = new Date().getFullYear();
    this.dataSource = new MatTableDataSource();
    this.newStudent = '';
  }

  ngOnInit(): void {
    this.getCharacters();
    const waiting = setInterval(()=>{
      if(this.characters.length > 0 && this._sort !== undefined){
        this.createDataSource();
        clearInterval(waiting);
      }
    }, 200);
  }

  public createDataSource(){
    this.dataSource.data = this.characters;
    this.dataSource.sort = this._sort;
  }

  public getCharacters(){
    if(this.characters.length > 0){
      this.characters = [];
    }
    this._characterService.getStudents().subscribe(
      res => {
        res.forEach(element => {
          let age :any = '';
          if(typeof element.yearOfBirth === 'number'){
             age = this.currentYear - element.yearOfBirth
          }else{
            age = '-'
          }
          let patronus: any = '';
          if(typeof element.patronus === 'number'){
            patronus = this.currentYear - element.patronus
         }else{
           patronus = '-'
         }
          this.characters.push(new Character(element.name, patronus, age, element.image));
        });
      }, err => {
        console.log(err);
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public searchStudent(){
    let matches = [];
    const searchValue = this.newStudent.trim().toLowerCase();
    this.characters.forEach(character => {
      if(character.name.trim().toLowerCase().indexOf(searchValue) >= 0){
        matches.push(character);
      }
    })
    return matches
  }

  public reqStudent(form){
    let student: any = '';
    if(this.checkValidForm()){
      student = this.searchStudent()[0]
      this._localstorageService.uploadLocalStorage('characters', student);
    }else{
      console.log(this.error);
    }
    form.reset();
  }

  public checkValidForm(){
    const input = $('#input').find('.mat-form-field-flex');
    const savedStudents: any = this._localstorageService.checkLocalStorage('characters');
    if(this.searchStudent().length === 0){
      input.addClass('error');
      this.error = 'El estudiante que desea agregar no existe'
      return false
    }
    if(this.searchStudent().length > 1){
      input.addClass('error');
      this.error = 'Escriba el nombre del estudiante completo'
      return false
    }
    return true
  }

  public removeErr(){
    const input = $('#input').find('.mat-form-field-flex');
    if(this.newStudent !== '' && input.hasClass('error')){
      input.removeClass('error');
      this.error = '';
    }
  }

}