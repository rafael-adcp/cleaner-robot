const tile = {
	free: 0,
	obstacule: 1,
	robotPosition: 2,
	possibleMoviment: 3,
	cleaned: 4,
	deepFirstSearchPath: 5,
}

module.exports = class Map {
	constructor(size, mapName) {
		this.size = size;
		this.map = new Array(size);
		this.mapName = mapName;
	}

	initiate() {
		//filling a matrix so we can see what the robot is doing
		for (let i = 0; i <= this.size; i++) {
			this.map[i] = new Array(this.size);
			for (let j = 0; j <= this.size; j++) {
				this.map[i][j] = tile.free
			}
		}
	}

	print() {
		let html = `
		<style>
		.obstacule {
			background-color: #DC3545;
		}
		.robotPosition {
			background-color: #007AFE;
		}
		.possibleMoviment {
			background-color: #FEC108
		}

		.cleaned {
			background-color: #27A745;
		}

		.deepFirstSearchPath {
			background-color: #6B747C;
		}
		</style>
		<table border = "1">\n`;
		for (let i = 0; i <= this.size; i++) {
			html += '<tr>'
			let line = "";
			for (let j = 0; j <= this.size; j++) {
				let cssClass = "";
				if (this.map[i][j] == tile.obstacule) {
					cssClass = "obstacule"
				}
				else if (this.map[i][j] == tile.robotPosition) {
					cssClass = "robotPosition"

				}
				else if (this.map[i][j] == tile.possibleMoviment) {
					cssClass = "possibleMoviment"
				}

				else if (this.map[i][j] == tile.cleaned) {
					cssClass = "cleaned"
				}
				else if (this.map[i][j] == tile.deepFirstSearchPath) {
					cssClass = "deepFirstSearchPath"
				}

				line += `<td class = "${cssClass}"> ( ${i} , ${j} ) </td>`;
			}
			html += line + '</tr> \n';
		}
		html += '</table></br></br>';
		console.log(html);
	}

	fillWalls() {
		//map 01 - just borders
		this.justBorders();
		
		//map 02 - diagonals
		if(this.mapName === "crazyOne"){
			for (let i = 0; i <= this.size; i++) {
				for (let j = 0; j <= this.size; j++) {
					if((i +j)%3 === 0){
						this.map[i][j] = tile.obstacule;
					}
				}
			}
		}
	}

	justBorders() {
		for (let i = 0; i <= this.size; i++) {
			for (let j = 0; j <= this.size; j++) {
				if (i === 0 || j === 0) {
					this.map[i][j] = tile.obstacule;
				} else if (j === this.size || i === this.size) {
					this.map[i][j] = tile.obstacule;
				}
			}
		}
	}

	setRobotPosition(wasX, wasY, becomeX, becomeY) {
		if (wasX && wasY) {
			this.map[wasX][wasY] = tile.cleaned
		}

		this.map[becomeX][becomeY] = tile.robotPosition;
	}

	fillPossibleSteps(possibleSteps) {
		for (var step in possibleSteps) {
			let split = possibleSteps[step].split(',')
			let x = split[0];
			let y = split[1];
			this.map[x][y] = tile.possibleMoviment;
		}
	}

	fillDeepFirstSearchSteps(steps) {
		for (var step in steps) {
			let split = steps[step].split(',')
			let x = split[0];
			let y = split[1];
			this.map[x][y] = tile.deepFirstSearchPath;
		}
	}

	statistics() {
		let statistics = {
			obstacules: 0
		}


		for (let i = 0; i <= this.size; i++) {
			for (let j = 0; j <= this.size; j++) {
				if (this.map[i][j] == tile.obstacule) {
					statistics.obstacules++;
				}
			}
		}
		return statistics;
	}
}