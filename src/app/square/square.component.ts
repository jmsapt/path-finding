import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent {
  @Input() square: {
    isWall: boolean
  };
  
  constructor() {
    this.square = {
      isWall: false,
    };
  }

  toggleWall() {
    this.square.isWall = this.square.isWall ? false : true;
  }
}
