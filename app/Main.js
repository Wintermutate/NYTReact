// Include React 
import React from "react";
// Here we include all of the sub-components
import Form from './Children/Form';
import Results from './Children/Results';
// Helper Function
import helpers from './utils/helpers.js';

// This is the main component. 
class Main extends React.Component{
	constructor(){
		super();
		this.state = {
			searchTerm: "",
			startYear: 0,
			endYear: 0,
			results: [],
			history:[]
		}
		this.saveButton = this.saveButton.bind(this);
		this.deleteButton = this.deleteButton.bind(this);
		this.setTerm = this.setTerm.bind(this);
	}

	saveButton(event){
		let button = event.currentTarget;
		let title = button.getAttribute("data-title");
		let date = button.getAttribute("data-date");
		let url = button.getAttribute("data-url");

		let article = {title, date, url};

		helpers.postHistory({article:article}),then(()=>{
			helpers.getHistory().then((response)=>{
				this.setState({
					history: response.data
				});
			});
		});
	}

	deleteButton(event){
		let button = event.currentTarget;
		let articleID = button.getAttribute("data-id");

		helpers.deleteHistory({articleID:articleID}).then(()=>{
			helpers.getHistory().then((response)=>{
				this.setState({
					history: response.data
				})
			});
		});
	}
	// We use this function to allow children to update the parent with searchTerms.
	setTerm(term, startYear, endYear){
		this.setState({
			searchTerm: term,
			startYear: startYear,
			endYear: endYear
		});
	}

	// If the component updates we'll run this code
	componentDidUpdate(prevProps, prevState){

		if(prevState.searchTerm != this.state.searchTerm){
			
			helpers.runQuery(this.state.searchTerm, this.state.startYear, this.state.endYear)
				.then((data)=>{
					if (data != this.state.results)
					{
						console.log("HERE");
						console.log(data);

						this.setState({
							results: data
						})

						console.log(this.state.results);		
					}

				});		
		}

	}
 
  	componentDidMount(){
    console.log("COMPONENT MOUNTED");

	    helpers.getHistory()
	      .then((response)=> {
	        this.setState({
	          history: response.data
	        });
	        console.log("RESULTS", response);
	      });
  	}

	// Here we render the function
	render(){

		return(

			<div className="container">

				<div className="row">

					<div className="jumbotron">
						<h2 className="text-center">Article Finder!</h2>
						<p className="text-center"><em>Enter a article, start year, and end year.</em></p>
					</div>

					<div className="col-md-6">
					
						<Form setTerm={this.setTerm}/>

					</div>
					<div className="col-md-6">
					
						<Results results={this.state.results} onSave={this.saveButton}/>

					</div>

				</div>

			</div>
		)
	}
}
module.exports = Main;