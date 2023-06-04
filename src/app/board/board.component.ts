import { Component } from '@angular/core';

enum PathType {
  'Unvisited' = 1,
  'Visited',
  'CurrrentPath',
  'CurrentHead'
}

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
    // Exclude the start and end squares (hence -2)
    this.squares = Array.from({ length: this.numCols * this.numRows - 2}, () => ({
      isWall: false
    }));
  }


  toggleWall(idx: number){
    this.squares[idx].isWall = !this.squares[idx].isWall;
    console.log(this.squares[idx],     console.log(this.squares[idx - 1]))
    console.log(idx)
  }

  clearWalls(){
    let index = 0;
    for (let square of this.squares) {
      if (index != 0 && index != this.numCols * this.numRows - 2) {
        square.isWall = false;
      }

      index++;
    }
  }

  resetPath() {

  }

  DFS() {

  }

  runDFS() {
    
  }


  runBFS() {

  }
}
