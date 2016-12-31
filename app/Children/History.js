// Include React 
var React = require('react');

// Component creation
class History extends React.Component{
	constructor(){
		super()
		this.renderData = this.renderData.bind(this);
	}
	renderData(historyArray){
		console.log(historyArray);
		return historyArray.map((arrayCell, index)=>{
			return (
				<li key={index}>
				<a href={arrayCell.url} target="_blank">{arrayCell.title}</a>
				<button onClick = {this.props.onRemove} className = "remove btn btn-danger" data-id={arrayCell._id}>Remove</button>
				</li>
			)
		})
	}

	// Here we render the function
	render(){

		return(

			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title text-center">History</h3>
				</div>
				<div className="panel-body text-center">
						<ul>
						{this.renderData(this.props.results)}
						</ul>
				</div>
			</div>

		)
	}
};

// Export the component back for use in other files
module.exports = History;