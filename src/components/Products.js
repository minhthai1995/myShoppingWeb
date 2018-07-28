import React, {Component} from 'react';
import Product from './Product';
import LoadingProducts from '../loaders/Products';
import NoResults from "../empty-states/NoResults";
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import global from './global';

class Products extends Component{
	constructor(){
		super();
		this.state = {
			render: false //Set render state to false
	}
	global.forceUpdate = this.forceUpdate.bind(this);
	}
	forceUpdate(){
		this.setState({
		});
	}
	componentDidMount() {
  setTimeout(function() { //Start the timer
      this.setState({render: true}) //After 1 second, set render to true
  }.bind(this), 2000)
	}
  	render(){
    	let productsData = [];
			let searchProducts;
    	let term = this.props.searchTerm;
    	let x;
			console.log('render:::',this.state.render);
		function searchingFor(term){
			return function(x){
				return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
			}
		}
		if (this.state.render){
			productsData = this.props.productsList.filter(searchingFor(term)).map(product =>{
				//console.log('product images', product);
				return(
							<Product key={product.id} price={product.price} product={product} name={product.name} image={product.images[0]} id={product.id} addToCart={this.props.addToCart} productQuantity={this.props.productQuantity} updateQuantity={this.props.updateQuantity} openModal={this.props.openModal}/>
					)
				}
			);
		}

		searchProducts = this.props.allProduct.filter(searchingFor(term)).map(product =>{
			return(
						<Product key={product.id} price={product.price} product={product} name={product.name} image={product.image} id={product.id} addToCart={this.props.addToCart} productQuantity={this.props.productQuantity} updateQuantity={this.props.updateQuantity} openModal={this.props.openModal}/>
				)
			}
		);

		// Empty and Loading States
		let view;
		if (term != ''){
			view = <CSSTransitionGroup
				transitionName="fadeIn"
				transitionEnterTimeout={500}
				transitionLeaveTimeout={300}
				component="div"
				className="products">
					{searchProducts}
			</CSSTransitionGroup>
		}
		else if(productsData.length <= 0 && !term){
			view = <LoadingProducts />
		} else if(productsData.length <= 0 && term){
			view = <NoResults />
		} else{
			view = <CSSTransitionGroup
				transitionName="fadeIn"
				transitionEnterTimeout={500}
				transitionLeaveTimeout={300}
				component="div"
				className="products">
					{productsData}
			</CSSTransitionGroup>
		}
		return(
			<div className="products-wrapper">
				<div className="products-type">{this.props.productType}</div>
				{view}
			</div>
		)
	}
}

export default Products;
