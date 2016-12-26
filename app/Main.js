// Include React 
import React from "react";

// Here we include all of the sub-components
import Form  from './Children/Form';
// Helper Function
import helpers from './utils/helpers.js';

// This is the main component. 
export default class Main extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			searchTerm: "",
			startYear: 0,
			endYear: 0,
			results: "",
			history:[]
		}
		this.saveButton = this.saveButton.bind(this);
		this.deleteButton = this.deleteButton.bind(this);
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

	removeButton(event){
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
			endYear: endYear,
		})
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
					}

				});		
		}

	}
   // On load display the number of clicks
  	componentDidMount() {
    console.log("COMPONENT MOUNTED");

	    // The moment the page renders on page load, we will retrieve the previous click count.
	    // We will then utilize that click count to change the value of the click state.
	    helpers.getHistory()
	      .then((response)=> {
	        // Using a ternary operator we can set newClicks to the number of clicks in our response object
	        // If we don't have any clicks in our database, set newClicks to 0
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

				</div>

			</div>
		)
	}
}
