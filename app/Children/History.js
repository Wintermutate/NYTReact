// Include React 
var React = require('react');

// Component creation
var History = React.createClass({

	renderData: function(historyArray){
		console.log(historyArray);
		return historyArray.map(function(arrayCell){
			return (<p>{arrayCell.location + " " + arrayCell.findDate}</p>)
		})
	},

	// Here we render the function
	render: function(){

		return(

			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title text-center">History</h3>
				</div>
				<div className="panel-body text-center">
						
						{this.renderData(this.props.results)}

				</div>
			</div>

		)
	}
});

// Export the component back for use in other files
module.exports = History;