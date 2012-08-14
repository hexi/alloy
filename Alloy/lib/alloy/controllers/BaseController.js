var Alloy = require('alloy'), 
	Backbone = Alloy.Backbone,
	_ = Alloy._;

var Controller = function() {
	var fixArgs = Array.prototype.slice.call(arguments),
		roots = [];

	this.__iamalloy = true;
	_.extend(this, Backbone.Events, {
		setParent: function(parent) {
			if (parent.__iamalloy) {
				this.parent = parent.parent;
			} else {
				this.parent = parent;
			}

			for (var i = 0, l = roots.length; i < l; i++) {
				if (roots[i].__iamalloy) {
					roots[i].setParent(this.parent);
				} else {
					this.parent.add(roots[i]);
				}
			}
		},
		addRoot: function(view) {
			roots.push(view);
		},
		getUIRoots: function() {
			return roots;
		},
		getUIRoot: function(index) {
			return roots[index || 0];
		}
	});
	// if (this.__init) { this.__init(); }
	// if (this.preLayout) { this.preLayout.apply(this, fixArgs); }
	// if (this.__layout) { this.__layout(); }
	// if (this.__postLayout) { this.__postLayout.apply(this, fixArgs); }
}
//Controller.extend = Backbone.Model.extend;
// _.extend(Controller.prototype, Backbone.Events, {
// 	setParent: function(parent) {
// 		if (this.root) {
// 			parent.add(this.root);
// 		} 
// 	},
// 	setRoot: function(root) {
// 		this.root = root;
// 	},
// 	getRoot: function() {
// 		return this.root;
// 	}
// });
module.exports = Controller;