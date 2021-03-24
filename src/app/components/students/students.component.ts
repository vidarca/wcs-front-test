import { Component, OnInit, ViewChild } from '@angular/core';
import { CharacterService } from '../../services/character/character.service';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';
import { Character } from '../../models/character';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  providers: [CharacterService, LocalstorageService]
})
export class StudentsComponent implements OnInit {

  public characters: Character[];
  public houses: string[] = ['Slytherin', 'Gryffindor', 'Ravenclaw', 'Hufflepuff'];
  public newStudent = {
    name: '',
    age: '',
    house: '',
    patronus: ''
  };
  public currentYear: number;
  public displayedColumns: string[] = ['name', 'patronus', 'age', 'image'];
  public dataSource: MatTableDataSource<any>;
  public error: string;
  private _sort: MatSort;
  public success: boolean = false;
  
  name = new FormControl([Validators.required]);
  house = new FormControl([Validators.required, Validators.minLength(5)]);
  patronus = new FormControl([Validators.required]);
  age = new FormControl([Validators.required, Validators.min(1)]);

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this._sort = ms;
    this.dataSource.sort = this._sort
  }

  constructor(
    private _characterService: CharacterService,
    private _localstorageService: LocalstorageService
  ) {
    this.characters = [];
    this.currentYear = new Date().getFullYear();
    this.dataSource = new MatTableDataSource();
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

  public reqStudent(form){
    if(this.checkValidForm()){
      this._localstorageService.uploadLocalStorage('characters', this.newStudent);
      this.success = true;
      this.name.reset('');
      this.house.reset('');
      this.age.reset('');
      this.patronus.reset('');
      this.name.setErrors(null);
      this.house.setErrors(null);
      this.age.setErrors(null);
      this.patronus.setErrors(null);
    }
  }

  public checkValidForm(){
    if(this.name.errors === null && this.house.errors === null && this.age.errors === null && this.patronus.errors === null){
      return true
    }else{
      return false
    }
  }

}