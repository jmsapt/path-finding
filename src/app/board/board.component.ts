import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  numCols = 10;
  numRows = 10;

  squares: {
    isWall: boolean,
  }[]

  constructor() {
    this.squares = Array(this.numCols * this.numRows).fill({
      isWall: false
    })
  }


  toggleWall(idx: number){
    this.squares[idx].isWall = this.squares[idx].isWall ? false : true;
    console.log(idx)
  }

  clearWalls(){
    this.squares = Array(this.numCols * this.numRows).fill({
      isWall: false
    })
  }

  resetPath() {

  }

  runDFS() {

  }

  runBFS() {

  }
}
