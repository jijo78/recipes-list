import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Form from './form';
import '../scss/main.scss';
import config from '../../config'
//`https://api.edamam.com/search?q=chicken&app_id=${config.id}&app_key=${config.api}`
export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			inputValue: '',
			error : {},
			data: [],
			filteredData: undefined
		};
		
		this.initSearch = this.initSearch.bind(this);
		this.renderResults = this.renderResults.bind(this);
		this.debounce = this.debounce.bind(this);		
		this.fetchData = this.debounce(this.fetchData.bind(this),250);
		
	}

	//The DOM wants the element to be focused in order to receive the keyboard event.
	//If you don't want to hack the element with tabIndex or contentEditable
	//to get it to focus, you could use native DOM event listeners on window,
	//and define a different handler in each component that handles keyboard events.
  
	componentWillMount() {
		window.addEventListener('keydown', this.initSearch);
	}
	// componentWillUpdate(nextProps, nextState) {
	// 	console.log('componentWillUpdate',nextState);
	// 	//this.fetchData(this.state.inputValue);				
	// }
	// componentWillUnmount(){
    //  	window.removeEventListener('keyup', this.fetchData);
    // }

	fetchData(term = ''){
		fetch(`https://api.edamam.com/search?q=${term}&app_id=${config.id}&app_key=${config.api}`)
		.then(response => response.json())
		.then(response => (
			this.setState({
				data: response.hits
			})			
		)).catch(error => {
			const errors = error;
			errors.summary = error.message;
		  
			this.setState({
				error : errors
			});
		});
	}

	// Returns a function, that, as long as it continues to be invoked, will not
	// be triggered. The function will be called after it stops being called for
	// N milliseconds. If `immediate` is passed, trigger the function on the
	// leading edge, instead of the trailing.
	//courtesy of https://davidwalsh.name/javascript-debounce-function
	debounce(func, wait, immediate) {
		var timeout;
		return function() {
			let context = this, args = arguments;
			let later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			let callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};

	/**
	 * [ submit the form ]
	 * @param  {[event]} e [event object]
	 */
  	initSearch(e){

		let filterdData = this.state.data;
		
			if(e.target.value.length >= 3){
				this.fetchData(this.state.inputValue);							
				filterdData.filter((val)=>{
					if(val.recipe.label.toLowerCase().match(this.state.inputValue) ){
						return val;
					}
				});
			}
			if(e.target.value === ''){
				this.setState({
					filteredData: undefined,
					inputValue: ''
				});
			}
				
		this.setState({
			filteredData: filterdData,
			inputValue: e.target.value
		});
	}

	renderResults(){
		if(this.state.filteredData){
			console.log('renderResults',this.state.filteredData);
			return(
				this.state.filteredData.map((val,i)=>{
						return(
							<li key={i} className='card__block'>
								<img className="card__img" alt="100%x180" src={val.recipe.image} data-holder-rendered="true" />
								<div className='card__block-inner'>
									<h3 className='card__title'>{val.recipe.label}</h3>
									<h4>Total Calories: {Math.ceil(val.recipe.calories)} { val.recipe.totalNutrients.ENERC_KCAL.unit}</h4>
									<h5 className='ingredients'>Health Labels: {val.recipe.healthLabels}</h5>
									<p className='card__text ingredients'>Ingredients: {val.recipe.ingredientLines}</p>
									<a href={val.recipe.url} title=''>Full recipe</a>											
								</div>
								<div className="card__extra-info rating">
									<span>☆</span>
									<span>☆</span>
									<span>☆</span>
									<span>☆</span>
									<span>☆</span> 
								</div>
							</li>

						)
					}
				)
			)
		}
	}

  render() {
		const error = this.state.error;
    return (
		<main className="main">
			<section className="search">
				<h1>No Ideas for cooking? Search for one</h1>
				<form action="" className="search__form" role="search">
					<fieldset>
						<label for="search" className="search__form--hidden">Find your recipe</label>
						<input type="text" placeholder="Find your recipe" name="name" value={this.state.inputValue} onChange={this.initSearch} className="search__input"   />
					</fieldset>
				</form>
			</section>
			<section>
				<ul className="search__results card">
						{this.renderResults()}
				</ul>
				{
					error.summary ? (
						<p className='search__error-msg'>{error.summary }</p>
					):(
						<p></p>						
					)
				}
			</section>
		</main>
	);
  }
}
