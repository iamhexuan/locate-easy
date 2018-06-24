const findPath = (start, finish) => {
	return dijkstra(graph, start, finish);
};

const lowestCostNode = (costs, processed) => {
	return Object.keys(costs).reduce((lowest, node) => {
		if (lowest === null || costs[node] < costs[lowest]) {
			if (!processed.includes(node)) {
				lowest = node;
			}
		}
		return lowest;
	}, null);
};

const dijkstra = (graph, start, finish) => {
	const costs = Object.assign({ [finish]: Infinity }, graph[start]);
	const parents = { [finish]: null };

	for (let child in graph[start]) {
		// add children of start node
		parents[child] = start;
	}
	const processed = [];
	let node = lowestCostNode(costs, processed);
	while (node) {
		let cost = costs[node];
		let children = graph[node];
		for (let n in children) {
			let newCost = cost + children[n];
			if (!costs[n]) {
				costs[n] = newCost;
				parents[n] = node;
			}
			if (costs[n] > newCost) {
				costs[n] = newCost;
				parents[n] = node;
			}
		}
		processed.push(node);
		node = lowestCostNode(costs, processed);
	}
	let optimalPath = [finish];
	let parent = parents[finish];
	while (parent != start) {
		optimalPath.push(parent);
		parent = parents[parent];
	}
	optimalPath.push(start);

	optimalPath.reverse(); // reverse array to get correct order
	const results = {
		distance: costs.finish,
		path: optimalPath
	};
	return results;
}; //finish of function
