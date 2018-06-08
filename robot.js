const Map = require('./map');
const DeepFirstSearch = require('./deep-first-search');

module.exports = class Robot {
	constructor({
		map,
		startX,
		startY
	}) {
		console.log(`Map: ${map}, Algorithm: DFS <br/>`)
		this.x = parseInt(startX);
		this.y = parseInt(startY);
		this.finishedCleaning = false;
		this.possibleSteps = [];
		this.visitedTiles = [];
	
		this.graphNode = [];
		this.graphConnections = [];

		this.headPosition = "NO";
		this.movimentSequence = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO']
		this.MAXIMUM_HEAD_TURNS = this.movimentSequence.length;

		//INITIATING THE MAP SO THAT WE CAN WEE WHAT THE ROBOT IS DOING
		console.log('Robot has just been initiated, current map is:</br></br>')
		this.houseMap = new Map(10, map);
		this.houseMap.initiate();
		this.houseMap.fillWalls();
		this.houseMap.setRobotPosition(null, null, this.x, this.y);
		this.houseMap.print();

		//METRICS VARS
		this.iteration = 0;
		this.DFSmoviments = 0;
		this.totalHeadTurns = 0;
		this.DFScalls = 0;
	}

	canWalkTo(x, y) {
		//just avoiding an index out of bound / undefined
		if (x <= this.houseMap.size && y <= this.houseMap.size) {
			// 1 -> obstacule
			if (this.houseMap.map[x][y] === 1) {
				console.log('sory, its an obstacule <br/>')
				return false;
			}
			else {
				//checkign if it has already visited that field
				if (this.visitedTiles.indexOf(`${x},${y}`) === -1) {
					console.log(`can Walk to (${x},${y}) since it havent been visited </br>`)
					return true
				}
				else {
					console.log(`cant Walk to (${x},${y}) since it has already been cleaned </br>`)
					return false;
				}
			}
		}
		else {
			console.log(`oooops index out of bound for (${x}, ${y}) </br>`)
			return false;
		}
	}

	canConnect(x, y) {
		//just avoiding an index out of bound / undefined
		if (x <= this.houseMap.size && y <= this.houseMap.size) {
			// 1 -> obstacule
			if (this.houseMap.map[x][y] === 1) {
				return false;
			}
			else {
				return true;
			}
		}
		else {
			return false;
		}
	}

	populateGraph(x, y) {
		//checking if current position already exists on graph
		const origin = `${this.x},${this.y}`
		let originIndex = this.graphNode.indexOf(origin)

		if (originIndex === -1) {
			this.graphNode.push(origin)
			originIndex = this.graphNode.indexOf(origin)

			//starting connection array
			this.graphConnections[originIndex] = [];
		}


		const destination = `${x},${y}`;
		let destinationIndex = this.graphNode.indexOf(destination)

		if (destinationIndex === -1) {
			this.graphNode.push(destination)
			destinationIndex = this.graphNode.indexOf(destination)

			//starting connection array
			this.graphConnections[destinationIndex] = [];
		}


		originIndex = this.graphNode.indexOf(origin)
		destinationIndex = this.graphNode.indexOf(destination)

		//checking if current position connection contains x,y
		if (this.graphConnections[originIndex].indexOf(destination) === -1) {
			this.graphConnections[originIndex].push(destination)
		}
	}

	possibleStepsValidation(x, y) {
		if (this.canConnect(x, y)) {
			//console.log(`should append (${x},${y}) to (${this.x}, ${this.y}) </br>`)
			this.populateGraph(x, y);
		}

		if (this.canWalkTo(x, y)) {
			//checking if tile have already been added
			if (this.possibleSteps.indexOf(`${x},${y}`) === -1) {
				this.possibleSteps.push(`${x},${y}`)
				console.log(`added (${x},${y}) to possible steps </br>`)
			}
			else {
				console.log(`cant add (${x},${y}) to possible steps since its already there </br>`)

			}

		}
	}

	//TODO: fazer esse cara ser no sentido clock wise ai bate com a rosa dos ventos, mas ta certinho fora isso
	//olhar a move() ela ta na ordem certa

	findPossibleSteps() {
		this.possibleStepsValidation(this.x, this.y + 1);

		this.possibleStepsValidation(this.x, this.y - 1);

		this.possibleStepsValidation(this.x + 1, this.y);

		this.possibleStepsValidation(this.x - 1, this.y);

		this.possibleStepsValidation(this.x + 1, this.y + 1);

		this.possibleStepsValidation(this.x - 1, this.y - 1);

		this.possibleStepsValidation(this.x + 1, this.y - 1);

		this.possibleStepsValidation(this.x - 1, this.y + 1);

		console.log(`<h2>Possible steps (${this.possibleSteps.length}):</h2>`)
		console.log(`(${this.possibleSteps.join(") , (")})</br></br>`)
		this.houseMap.fillPossibleSteps(this.possibleSteps)

	}

	movimentValidation(x, y, direction) {
		let robotPendingMoviment = true;
		if (this.canWalkTo(x, y)) {
			robotPendingMoviment = false
			this.moveRobot(x, y);
		}
		else {
			console.log(`robot couldnt move to ${direction}</br>`)
		}
		return robotPendingMoviment;
	}
	move() {
		let robotPendingMoviment = true;
		let currentPositionIndex;
		let nextMovimentIndex;
		let possiblePosition = this.headPosition;
		let amountOfHeadTurns = 0;


		console.log('<h2>Move:</h2>')
		do {
			console.log(`Robot is pointing to ${this.headPosition}</br>`);

			if (possiblePosition === 'N') {
				robotPendingMoviment = this.movimentValidation(this.x - 1, this.y, 'N')
			}

			if (possiblePosition === 'NE') {
				robotPendingMoviment = this.movimentValidation(this.x - 1, this.y + 1, 'NE')
			}

			if (possiblePosition === 'E') {
				robotPendingMoviment = this.movimentValidation(this.x, this.y + 1, 'E')
			}

			if (possiblePosition === 'SE') {
				robotPendingMoviment = this.movimentValidation(this.x + 1, this.y + 1, 'SE')
			}

			if (possiblePosition === 'S') {
				robotPendingMoviment = this.movimentValidation(this.x + 1, this.y, 'S')
			}

			if (possiblePosition === 'SO') {
				robotPendingMoviment = this.movimentValidation(this.x + 1, this.y - 1, 'SO')
			}

			if (possiblePosition === 'O') {
				robotPendingMoviment = this.movimentValidation(this.x, this.y - 1, 'O')
			}

			if (possiblePosition === 'NO') {
				robotPendingMoviment = this.movimentValidation(this.x - 1, this.y - 1, 'NO')
			}
			if (robotPendingMoviment) {
				//logic to turn robot head clock wise
				console.log('<h3>Going to change robot head</h3>')
				currentPositionIndex = this.movimentSequence.indexOf(this.headPosition);
				nextMovimentIndex = currentPositionIndex + 1 > this.movimentSequence.length - 1 ? 0 : currentPositionIndex + 1;
				possiblePosition = this.movimentSequence[nextMovimentIndex]
				this.totalHeadTurns++;
				if (this.headPosition !== possiblePosition) {
					console.log(`robot cant move, going to move head position to ${possiblePosition}<br/>`)
					this.headPosition = possiblePosition;
					console.log('</br>')
					amountOfHeadTurns++;
				}
			}
			console.log(`amount of head turns ${amountOfHeadTurns} </br>`);
			if (amountOfHeadTurns == this.MAXIMUM_HEAD_TURNS) {
				console.log('oops reached maximum atempts, robot might be stucked </br>')
				if (this.possibleSteps.length != 0) {
					console.log(`possible Steps contains ${this.possibleSteps.length}</br>`)
					console.log('there is something to clean</br>')
					//TODO: need to map this guy neighboors
					this.moveRobotAfterBeenStucked()
					//throw new Error('Robot got stuck')
					//amountOfHeadTurns = 0;
					robotPendingMoviment = false;
					console.log(`finished dfs and robotPendingMoviment = ${robotPendingMoviment} and !this.finishedCleaning = ${!this.finishedCleaning} </br>`)
				}
				else {
					this.finishedCleaning = true;
				}
			}
		} while (robotPendingMoviment && !this.finishedCleaning)
	}

	moveRobotAfterBeenStucked() {
		let destination = this.possibleSteps[0]
		this.DFScalls++;

		console.log(`going to find a route to go to ${destination} </br>`);
		const origin = `${this.x},${this.y}`

		//making sure we store possible connections from the actual position
		this.findPossibleSteps();

		

		let stepsToMove = [];
	
		const dfs = new DeepFirstSearch(this.graphNode, this.graphConnections);
		stepsToMove= dfs.search(origin, destination);
		
		if (stepsToMove.length === 0) {
			throw new Error(`${this.algorithm} could not find a path from ${origin} to ${destination}`)
		}

		this.houseMap.fillDeepFirstSearchSteps(stepsToMove);
		this.houseMap.print();
		let somethingAppearedOnRobotPath = false
		for (let step in stepsToMove) {
			let split = stepsToMove[step].split(',')
			let x = parseInt(split[0]);
			let y = parseInt(split[1]);
			if (this.canConnect(x, y)) { // avoiding collision while moving to a spot that havent been cleaned after robot got stucked
				console.log(`<h1>Iteration number: ${this.iteration}</h1>`);
				this.iteration++;
				this.DFSmoviments++;
				this.moveRobot(x, y)
				//this.findPossibleSteps()
				this.houseMap.print();
			}
			else {
				somethingAppearedOnRobotPath = true;
				break;
			}
			if (somethingAppearedOnRobotPath) {
				console.log('Something appeared on robot way</br>')
			}
		}
	}

	moveRobot(becomeX, becomeY) {
		this.houseMap.setRobotPosition(this.x, this.y, becomeX, becomeY);
		this.visitedTiles.push(`${this.x},${this.y}`)

		console.log(`moving robot from ( ${this.x}, ${this.y} ) to (${becomeX}, ${becomeY}) </br>`);

		this.x = becomeX;
		this.y = becomeY;

		const become = `${this.x},${this.y}`

		//checking if this moviment was on possibleSteps and removing it if positive
		if (this.possibleSteps.indexOf(become) !== -1) {
			const elementPosition = this.possibleSteps.indexOf(become);
			this.possibleSteps.splice(elementPosition, 1);
		}
	}

	cleanHouse() {
		let canWalk = true;
		do {
			console.log('<hr>')
			console.log(`<h1>Iteration number: ${this.iteration}</h1>`);
			this.findPossibleSteps();

			this.houseMap.print();


			this.move();
			this.houseMap.print();

			this.iteration++;
		} while (canWalk && !this.finishedCleaning);
		console.log(`robot finished cleaning the house, and it took ${this.iteration} iterations</br>`)

		const mapStatistics = this.houseMap.statistics();
		const totalTile = (this.houseMap.size + 1) * (this.houseMap.size + 1);
		const tilesToClean = totalTile - mapStatistics.obstacules;
		console.log(`
		total tiles = ${totalTile} <br/>
		total obstacules = ${mapStatistics.obstacules} -> ${this.toPercentual(mapStatistics.obstacules / totalTile)}% <br/>
		total tiles to be cleaned = ${tilesToClean} -> ${this.toPercentual(tilesToClean / totalTile)}% <br/>
		
		<br/><br/>
		total Robot moviments = ${this.iteration}<br/>
		total Robot rework = ${this.iteration - tilesToClean} moviments -> ${this.toPercentual((this.iteration / tilesToClean) - 1)} %<br/>
		total Robot head turns = ${this.totalHeadTurns}<br/>
		total DFS moviments = ${this.DFSmoviments}<br/>
		total DFS calls = ${this.DFScalls}<br/>
		`)
	}

	toPercentual(x){
		return x * 100
	}
}