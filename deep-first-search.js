module.exports = class DeepFirstClass {
	constructor(graphNode, graphConnections) {
		this.graphNode = graphNode;
		this.graphConnections = graphConnections;

	}

	search(origin, destination) {
		console.log('<h1>DFS just started</h1>')
		console.log(`going to find steps from (${origin}) to (${destination}) </br>`)
		let stack = [];
		let visited = [];

		for (let i = 0; i <= this.graphNode.length; i++) {
			visited[i] = false
		}

		let originIndex = this.graphNode.indexOf(origin);

		stack.push(originIndex); //starting the stack
		console.log('</br>stack started with: </br>')
		console.log(stack);
		console.log('</br>')
		let found = false;

		let output = [];
		while (stack.length !== 0 && !found) {
			let visitedSomething = false
			//top of stack, i might be able to do stack.pop
			console.log('<br/>stack:</br>')
			for(let i in stack){
				console.log(`( ${this.graphNode[stack[i]]}) ,`)
			}
			console.log('</br>')
			let nodeIndexToDig = stack[stack.length -1]//stack[0];

			if (!visited[nodeIndexToDig]) {
				visited[nodeIndexToDig] = true;
				console.log(`just visited node ${this.graphNode[nodeIndexToDig]} </br>`)
				console.log(`node connections: (${this.graphConnections[nodeIndexToDig].join(') , (')}) <br/>`)
			}

			for (let i = 0; i < this.graphConnections[nodeIndexToDig].length; i++) {
				let node = this.graphConnections[nodeIndexToDig][i];
				let nodeIndex = this.graphNode.indexOf(node);
				//if node havent been visited
				console.log(`connection been checked ${node}, node index = ${nodeIndex}, visited = ${visited[nodeIndex]} <br/>`)
				if (node === destination) {
					console.log('found the desired node!!! </br>')
					found = true;
				}
				if (!visited[nodeIndex]) {
					console.log(`added to stack ${node} </br>`)
					stack.push(nodeIndex)
					visitedSomething = true
					break;
				} 
			}
			if(!visitedSomething) { // if there is no place to go from the node, remove it
				stack.pop();
			}
		}

		if (found) {
			console.log(`path to go from ${origin} to ${destination} is:)</br>`)
			for(let i in stack){
				output.push(this.graphNode[stack[i]])
				console.log(`( ${this.graphNode[stack[i]]}) ,`)
			}
			console.log('</br>')
		}
		else {
			console.log(`DFS could not find a path from ${origin} to ${destination} </br>`)
		}

		return output;
	}
}