function($scope) {
	
	var c = this;
	
	$scope.categories = c.data.categories;
    
	$scope.totalCount = c.data.categories.reduce(function(a, b) {
		return a + b.count;
	}, 0);
	
	$scope.collapse = function(category) {
		var method = category.open ? 'close' : 'open';
		for (var i = 0; i < $scope.categories.length; i++) {
			collapseTree($scope.categories[i], false, category.value, method);
		}
	};
	
	function collapseTree(tree, toggle, value, open_or_close) {
		if (tree.value == value) {
			tree.open = !tree.open;
			toggle = true;
		} else if (toggle) {
			tree.open = false;
			tree.hidden = true;
		}
		if (tree.categories.length == 0) return;
		if (open_or_close == 'close') {
			for (var i = 0; i < tree.categories.length; i++) {
				collapseTree(tree.categories[i], toggle, value, 'close');
			}
		} else if (toggle) {
			for (var j = 0; j < tree.categories.length; j++) {
				tree.categories[j].hidden = false;
			}
		} else {
			for (var k = 0; k < tree.categories.length; k++) {
				collapseTree(tree.categories[k], toggle, value, 'open');
			}
		}
	}
	
}
