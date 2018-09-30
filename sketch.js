
let col;
let row;
let resolution = 10;
let grid;

function generate2DArray(col, row){
	let arr = new Array(col);
	for (let i = 0; i < arr.length; i++){
		arr[i] = new Array(row);
	}
	return arr;
}
function setup() {
  createCanvas(600, 400);
  col = width / resolution;
  row = height / resolution;
  grid = generate2DArray(col, row);
  for (let i = 0; i < col; i++){
  	for (let j = 0; j < row; j++){
  		grid[i][j] = floor(random(2));
  	}
  }
}

function draw() {
  background(0);
  for (let i = 0; i < col; i++){
  	for (let j = 0; j < row; j++){
  		let x = i * resolution;
  		let y = j * resolution;
  		if (grid[i][j] == 1){
  			fill(255);
  			stroke(0);
  			rect(x, y, resolution-1, resolution-1);
  		}
  	}
  }
  let nextgen = generate2DArray(col, row);

  //compute the next generation based on the rule
  for (let i = 0; i < col; i++){
  	for (let j = 0; j < row; j++){
  		let state = grid[i][j];
  		let neighbours = countNeighbours(grid, i, j);

  		if (state == 0 && neighbours == 3){
  			nextgen[i][j] = 1;
  		}
  		else if (state == 1 && (neighbours < 2 || neighbours > 3)){
  			nextgen[i][j] = 0;
  		}
  		else{
  			nextgen[i][j] = state;
  		}

  	}
  }
  grid = nextgen;

}

function countNeighbours(grid, x, y){
	let live = 0;
	for (let i = -1; i < 2; i++){
		for(let j = -1; j < 2; j++){
			let coln = (x + i + col) % col;
			let rown = (y + j + row) % row;
			live += grid[coln][rown];
		}
	}
	live -= grid[x][y];
	return live;
}