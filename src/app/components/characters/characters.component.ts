import { Component, OnInit, ViewChild } from '@angular/core';
import { CharacterService } from '../../services/character/character.service';
import { Character } from '../../models/character';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
  providers: [CharacterService]
})
export class CharactersComponent implements OnInit {

  public characters: Character[];
  public houseName: string;
  public houses: string[];
  public currentYear: number;
  public displayedColumns: string[] = ['name', 'patronus', 'age', 'image'];
  public dataSource: MatTableDataSource<any>;
  private _sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this._sort = ms;
    this.dataSource.sort = this._sort;
  }

  constructor(
    private _characterService: CharacterService
  ) {
    this.houses = ['Slytherin', 'Gryffindor', 'Ravenclaw', 'Hufflepuff']
    this.characters = [];
    this.currentYear = new Date().getFullYear();
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
  }

  public getCharacters(){
    if(this.characters.length > 0){
      this.characters = [];
    }
    this._characterService.getCharacters(this.houseName.toLowerCase()).subscribe(
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
        const waiting = setInterval(()=>{
          if(this._sort !== undefined){
            this.createDataSource();
            clearInterval(waiting);
          }
        }, 200)
      }, err => {
        console.log(err);
      }
    )
  }

  public createDataSource(){
    this.dataSource.data = this.characters;
    this.dataSource.sort = this._sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
