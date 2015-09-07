import $ from "jquery";
import _ from "lodash";
import Backbone from "backbone";
import React from "react";

var SetIntervalMixin = {
	componentWillMount: function() {
		this.intervals = [];
	},
	setInterval: function() {
		this.intervals.push(setInterval.apply(null, arguments));
	},
	componentWillUnmount: function() {
		this.intervals.map(clearInterval);
	}
};

var TickTock = React.createClass({
	mixins: [SetIntervalMixin], // Use the mixin
	getInitialState: function() {
		return {seconds: 0};
	},
	componentDidMount: function() {
		console.log(this.setInterval);
		this.setInterval(this.tick, 1000); // Call a method on the mixin
	},
	tick: function() {
		this.setState({seconds: this.state.seconds + 1});
	},
	render: function() {
		return (
			<p>
				React has been running for {this.state.seconds} seconds.
			</p>
		);
	}
});

var MyComponent = React.createClass({
	handleClick: function() {
		// Explicitly focus the text input using the raw DOM API.
		React.findDOMNode(this.refs.myTextInput).focus();
	},
	render: function() {
		// The ref attribute adds a reference to the component to
		// this.refs when the component is mounted.
		return (
			<div>
				<input type="text" ref="myTextInput" />
				<input
					type="button"
					value="Focus the text input"
					onClick={this.handleClick}
					/>
			</div>
		);
	}
});
//var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var TodoList = React.createClass({
	getInitialState: function() {
		return {items: ['hello', 'world', 'click', 'me']};
	},
	handleAdd: function() {
		var newItems =
			this.state.items.concat([prompt('Enter some text')]);
		this.setState({items: newItems});
	},
	handleRemove: function(i) {
		var newItems = this.state.items;
		newItems.splice(i, 1);
		this.setState({items: newItems});
	},
	render: function() {
		var cx = React.addons.classSet;
		var importantModifier = 'message-important';
		var readModifier = 'message-read';
		var classes = cx('message', importantModifier, readModifier);
		// same final string, but much cleaner
		return <div className={classes}>Great, I'll be there.</div>;
	}
});

var Swapper = React.createClass({
	propTypes: {
		// `leftChildren` and `rightChildren` can be a string, element, array, etc.
		leftChildren: React.PropTypes.node,
		rightChildren: React.PropTypes.node,

		swapped: React.PropTypes.bool
	},
	render: function() {
		var children;
		if (this.props.swapped) {
			children = [this.props.rightChildren, this.props.leftChildren];
		} else {
			children = [this.props.leftChildren, this.props.rightChildren];
		}
		return <div>{children}</div>;
	}
});

var _makeBlue = function(element) {
	return React.addons.cloneWithProps(element, {style: {color: 'blue'}});
};

var Blue = React.createClass({
	render: function() {
		var blueChildren = React.Children.map(this.props.children, _makeBlue);
		return <div>{blueChildren}</div>;
	}
});

React.render(
	<Blue>
		<p>This text is blue.</p>
	</Blue>,
	document.getElementById('example')
);



var tree = {};
tree.decorate = function () {
	console.log('Make sure the tree won\'t fall');
};

tree.getDecorator = function (deco) {
	tree[deco].prototype = this;
	return new tree[deco];
};

tree.RedBalls = function () {
	this.decorate = function () {
		this.RedBalls.prototype.decorate(); // 第7步：先执行原型（这时候是Angel了）的decorate方法
		console.log('Put on some red balls'); // 第8步 再输出 red
		// 将这2步作为RedBalls的decorate方法
	}
};

tree.BlueBalls = function () {
	this.decorate = function () {
		this.BlueBalls.prototype.decorate(); // 第1步：先执行原型的decorate方法，也就是tree.decorate()
		console.log('Add blue balls'); // 第2步 再输出blue
		// 将这2步作为BlueBalls的decorate方法
	}
};

tree.Angel = function () {
	this.decorate = function () {
		this.Angel.prototype.decorate(); // 第4步：先执行原型（这时候是BlueBalls了）的decorate方法
		console.log('An angel on the top'); // 第5步 再输出angel
		// 将这2步作为Angel的decorate方法
	}
};

tree = tree.getDecorator('BlueBalls'); // 第3步：将BlueBalls对象赋给tree，这时候父原型里的getDecorator依然可用
tree = tree.getDecorator('Angel'); // 第6步：将Angel对象赋给tree，这时候父原型的父原型里的getDecorator依然可用
tree = tree.getDecorator('RedBalls'); // 第9步：将RedBalls对象赋给tree

tree.decorate(); // 第10步：执行RedBalls对象的decorate方法