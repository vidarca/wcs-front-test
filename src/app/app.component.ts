import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'world-cloud-services';

  constructor(){}

  public toggleSubMenu(target){
    const icon = $(`*[data-toggle="${target.substring(1)}"]`);
    $(`${target}`).slideToggle(function(){
        icon.css({
          'transform':'rotate('+ parseInt(icon[0].dataset.rot) * 180 + 'deg)'
        })
        if(parseInt(icon[0].dataset.rot) === 1){
          icon[0].dataset.rot = 2
        }else{
          icon[0].dataset.rot = 1
        }
      }
    );
  }

  public mainToggleSubMenu(target){
    const submenu = $(`${target}`);
    const icon = $(`*[data-toggle="${target.substring(1)}"]`);
    if(submenu[0].style.display === 'block'){
      submenu.slideToggle(function(){
        icon.css({
          'transform':'rotate('+ parseInt(icon[0].dataset.rot) * 180 + 'deg)'
        })
        if(parseInt(icon[0].dataset.rot) === 1){
          icon[0].dataset.rot = 2
        }else{
          icon[0].dataset.rot = 1
        }
      });
    }
  }
}
