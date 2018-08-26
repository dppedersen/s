(function() {
	data.kb = $sp.getValue("kb_knowledge_base");
	var categoryTree = [];
	var gr = new GlideRecord('kb_category');
	gr.addQuery('parent_id', data.kb);
	gr.query();
	while (gr.next()) {
		var subcategories = getSubcategories(gr.getUniqueValue());
		var hasSubs = !!subcategories.length;
		var subCatCount = subcategories.length;
		categoryTree.push({
			'label': gr.label.getValue(),
			'value': gr.getUniqueValue(),
			'hasSubs': hasSubs,
			'count': $sp.getKBCategoryArticles(gr.getUniqueValue()).length,
			'hidden': false,
			'open': false,
			'categories': subcategories
		});
	}
	data.categories = categoryTree;
})();


function getSubcategories(sys_id) {
	var tree = [];
	var gr = new GlideRecord('kb_category');
	gr.addQuery('parent_id', sys_id);
	gr.query();
	while (gr.next()) {
		var subcategories = getSubcategories(gr.getUniqueValue());
		var hasSubs = !!subcategories.length;
		var subCatCount = subcategories.length;
		tree.push({
			'label': gr.label.getValue(),
			'value': gr.getUniqueValue(),
			'hasSubs': hasSubs,
			'count': $sp.getKBCategoryArticles(gr.getUniqueValue()).length,
			'hidden': true,
			'open': false,
			'categories': subcategories
		});
	}
	return tree;
}
