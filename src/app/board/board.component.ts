import { Component } from '@angular/core';

interface vertex {
  row: number,
  col: number
}

type Vertex = vertex | null;

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
    // Exclude the start and end squares
    this.squares = Array.from({ length: this.numCols * this.numRows}, () => ({
      isWall: false
    }));
  }


  toggleWall(idx: number){
    // All squares EXCEPT starting and end squares are toggleable
    if (idx != 0 && idx != this.numCols * this.numRows - 1) {
      this.squares[idx].isWall = !this.squares[idx].isWall;
    }
  }

  clearWalls(){
    let index = 0;
    for (let square of this.squares) {
      if (index != 0 && index != this.numCols * this.numRows) {
        square.isWall = false;
      }

      index++;
    }
  }

  resetPath() {

  }

  DFS() {
    const start: vertex = {row: 0, col: 0}
    const visited: Vertex[][] = []

    // init adjacency matrix
    for (let i: number = 0; i < this.numRows; i++) {
      let row: Vertex[] = [];
      for (let j: number = 0; j < this.numCols; j++) {
        // Edge cases for starting and end squares

        row.push(!this.squares[i * this.numCols + j].isWall ? {row: -1, col: -1} : null);
      }row
      visited.push(row);
    }

    console.log(visited)
    this.runDFS(visited, start);
  }

  runDFS(visisted: Vertex[][], start: vertex) {
    const stack: Vertex[] = [start];
    let prev: vertex = start;

    // while stack is not empty
    while(stack.length != 0) {
      let curr: vertex = stack.pop() as vertex;

      // if already visited
      if (!((visisted[curr.row][curr.col] as vertex).row === -1)) {
        continue;
      }
      visisted[curr.row][curr.col] = prev;

      // [x, y] offsets
      const offsets = [
        [0, 1],   // right
        [1, 0],   // down
        [-1, 0],  // left
        [0, -1]   // up
      ]
      console.log("HERE------")
      for (const offset of offsets) {
        let nextSquare = {row: curr.row + offset[0], col: curr.col + offset[1]} as vertex;
        if (this.validSquare(visisted, nextSquare)) {
          console.log(nextSquare)
          stack.push(nextSquare);
        }
      }
      prev = curr;
    }

    if (visisted[this.numRows-1][this.numCols-1]?.row === -1) {
      console.log("No path")
    }
    else {
      console.log("Found path")
    }
  }

  validSquare(visisted: Vertex[][], vert: vertex) {
    // check bounds
    if (vert.row < 0 || vert.row >= this.numRows
      || vert.col < 0 || vert.col >= this.numRows) {
      return false;

    }

    // check if it is not a wall
    if (visisted[vert.row][vert.col] === null) {
      return false;
    }

    // valid square
    return true;
  }

  runBFS() {
    console.log("NOT YET IMPLEMENTED")
  }
}
