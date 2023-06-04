import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent {
  @Input() isWall: boolean;
  @Input() path: string;

  constructor() {
    this.isWall = false
    this.path = 'Unvisited'
  }

  toggleWall() {
    this.isWall = this.isWall ? false : true;
  }
}
