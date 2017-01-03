// Include React 
var React = require('react');

// Component creation
class Results extends React.Component{
	constructor(){
		super();
		this.renderData = this.renderData.bind(this);
	}
	renderData(resultsArray){
		console.log(resultsArray);
		return resultsArray.map((arrayCell, index)=>{
			return (
				<li key={index}>
				<a href={arrayCell.web_url} target="_blank">{arrayCell.headline.main.toString()}</a>
				<button onClick={this.props.onSave} className="save btn btn-primary" data-title={arrayCell.headline.main.toString()} data-date={arrayCell.pub_date} data-url={arrayCell.web_url}>Save</button>
				</li>
			)
		});
	}

	// Here we render the function
	render(){

		return(

			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title text-center">Results</h3>
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
module.exports = Results;