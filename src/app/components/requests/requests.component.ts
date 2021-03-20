import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
  providers: [LocalstorageService]
})
export class RequestsComponent implements OnInit {

  public characters: any;
  public newStudent: string;
  public currentYear: number;
  public displayedColumns: string[] = ['name', 'patronus', 'age', 'image'];
  public dataSource: MatTableDataSource<any>;
  private _sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this._sort = ms;
    this.dataSource.sort = this._sort;
  }

  constructor(
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
    }, 200)
  }

  public createDataSource(){
    this.dataSource.data = this.characters;
    this.dataSource.sort = this._sort;
  }

  public getCharacters(){
    if(this.characters.length > 0){
      this.characters = [];
    }
    if(this._localstorageService.checkLocalStorage('characters') !== null){
      this.characters = this._localstorageService.checkLocalStorage('characters');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
