import { Component } from '@angular/core';

interface vertex {
  row: number,
  col: number
}

type Vertex = vertex | null;


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  numCols = 10;
  numRows = 10;
  haltAlgorithm = true;

  squares: {
    isWall: boolean,
    path: string
  }[]

  constructor() {
    // Exclude the start and end squares
    this.squares = Array.from({ length: this.numCols * this.numRows}, () => ({
      isWall: false,
      path: 'Unvisited'
    }));
  }


  toggleWall(idx: number){
    // All squares EXCEPT starting and end squares are toggleable
    if (idx != 0 && idx != this.numCols * this.numRows - 1) {
      this.squares[idx].isWall = !this.squares[idx].isWall;
    }
  }

  clearWalls(){
    this.resetPath();
    let index = 0;
    for (let square of this.squares) {
      if (index != 0 && index != this.numCols * this.numRows) {
        square.isWall = false;
      }

      index++;
    }
  }

  resetPath() {
    let index = 0;
    for (let square of this.squares) {
      square.path = 'Unvisited';
      index++;
    }

    console.log(this.squares)
  }

  stopAlgorithm() {
    this.haltAlgorithm = true;
  }

  DFS() {
    this.resetPath();
    const start: vertex = {row: 0, col: 0}
    const visited: Vertex[][] = []

    // init adjacency matrix
    for (let i: number = 0; i < this.numRows; i++) {
      let row: Vertex[] = [];
      for (let j: number = 0; j < this.numCols; j++) {
        // Edge cases for starting and end squares

        row.push({row: -1, col: -1});
      }row
      visited.push(row);
    }

    console.log(visited)
    this.runDFS(visited, start, 50);
  }

  runDFS(visited: Vertex[][], start: vertex, delay: number) {
    let stack: Vertex[] = [start];
    let prev: vertex = start;

    // Recursive function for DFS with delay
    const dfsWithDelay = () => {
      if (stack.length === 0) {
        if (visited[this.numRows - 1][this.numCols - 1]?.row === -1) {
          console.log('No path');
        } else {
          console.log('Found path');
        }
        console.log(visited);
        return;
      }

      let curr: vertex = stack.pop() as vertex;

      // If end square
      if (curr.row === this.numRows - 1 && curr.col === this.numCols - 1) {
        visited[curr.row][curr.col] = prev;
        this.updateSquareVisited(visited, curr);
        setTimeout(dfsWithDelay, delay);
        stack = [];
        return;
      }

      // If already visited
      if (!((visited[curr.row][curr.col] as vertex).row === -1)) {
        setTimeout(dfsWithDelay, delay);
        return;
      }

      visited[curr.row][curr.col] = prev;

      // [x, y] offsets
      const offsets = [
        [-1, 0], // left
        [0, -1], // up
        [0, 1], // right
        [1, 0], // down
      ];

      for (const offset of offsets) {
        let nextSquare = {
          row: curr.row + offset[0],
          col: curr.col + offset[1],
        } as vertex;
        if (this.validSquare(visited, nextSquare)) {
          stack.push(nextSquare);
        }
      }

      this.updateSquareVisited(visited, curr);
      setTimeout(dfsWithDelay, delay);
    };

    // Start the DFS with delay
    setTimeout(dfsWithDelay, delay);
  }

  validSquare(visited: Vertex[][], vert: vertex) {
    // Check bounds
    if (
      vert.row < 0 ||
      vert.row >= this.numRows ||
      vert.col < 0 ||
      vert.col >= this.numRows
    ) {
      return false;
    }

    // Check if it is not a wall
    if (this.squares[this.numRows * vert.row + vert.col].isWall) {
      return false;
    }

    // Valid square (both inbounds and not a wall)
    return true;
  }

  updateSquareVisited(visited: Vertex[][], vert: vertex) {
    // Track visisted squares

    let row = vert.row;
    let col = vert.col;
    this.squares[row * this.numRows + col].path = 'Visited';




    // Plot current trace
    // let curr = vert as vertex;
    // while (curr.row !== 0 && curr.col !== 0) {
    //   this.squares[curr.row * this.numRows + curr.col].path = 'Path';
    //   curr = visited[curr.row][curr.col] as vertex;
    // }

  }

  runBFS() {
    console.log('NOT YET IMPLEMENTED');
  }
}
