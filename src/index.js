import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './components/Header';
import Products from './components/Products';
import Pagination from './components/Pagination';
import Footer from './components/Footer';
import QuickView from './components/QuickView';
import './scss/style.scss';
import initData from './api/initData';
import checkLogin from './api/checkLogin';
import refreshToken from './api/checkLogin';
import getToken from './api/getToken';
import getListProduct from './api/getListProduct';
import getAllProduct from './api/getAllProduct';
import global from './components/global';
class App extends Component{
	constructor(){
		super();
		this.state = {
			products: [],
			allProduct: [],
			cart: [],
			totalItems: 0,
			totalAmount: 0,
			term: '',
			category: '',
			cartBounce: false,
			quantity : 1,
			quickViewProduct: {},
			modalActive: false,
			productType: [],
			idType: 0,
			firstTime: 0,
			currentType: 'Sản phẩm nổi bật'
		};
		global.resetCart = this.resetCart.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleMobileSearch = this.handleMobileSearch.bind(this);
		this.handleCategory = this.handleCategory.bind(this);
		this.handleAddToCart = this.handleAddToCart.bind(this);
		this.sumTotalItems = this.sumTotalItems.bind(this);
		this.sumTotalAmount = this.sumTotalAmount.bind(this);
		this.checkProduct = this.checkProduct.bind(this);
		this.updateQuantity = this.updateQuantity.bind(this);
		this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}
	resetCart(){
		this.setState({
			cart: [],
			totalItems: 0,
			totalAmount: 0,
		})
	}
	// Fetch Initial Set of Products from external API
	getProducts(){
		//For Localhost use the below url
		//const url = "src/products.json";
		// For Production use the below url
		//const url="https://quarkbackend.com/getfile/sivadass/products";

		// axios.get(url)
		// 	.then(response => {
		// 		console.log('resonse data :::', resonse);
		// 		this.setState({
		// 			products : response.data
		// 		})
		// 	})
		console.log('first time ne`::', this.state.firstTime);
		if (this.state.firstTime == 0){
		initData()
		.then(resJSON => {
			console.log('Data tra ve', resJSON);
			this.setState({
				products: resJSON.product,
				productType: resJSON.type,
				firstTime: this.state.firstTime + 1
			});
		})
		.catch(error => console.log(error));
		console.log('products ne', this.state.products);

		getAllProduct()
		.then(arrProduct => {
			console.log('ALL::', arrProduct);
			this.setState({
				allProduct: arrProduct,
			});
		})
		.catch(err => console.log(err));
	}
	}
	componentWillMount(){
		this.getProducts();
	}
	componentDidMount(){
		getToken()
    .then(token => checkLogin(token))
    .then(res => global.onSignIn(res.user))
    .catch(err => {
      console.log('LOI LOGIN', err);
    });
    setInterval(() => {
      getToken()
      .then(token => {
        refreshToken(token);
        console.log('TOKEN REFRESHED::::', token);
      }
    );
  	}, 300000);
	}
	gotoIndex(){
		initData()
		.then(resJSON => {
			console.log('Data tra ve', resJSON);
			this.setState({
				products: resJSON.product,
				productType: resJSON.type,
				firstTime: this.state.firstTime + 1,
				currentType: 'Sản phẩm nổi bật'
			});
		})
		.catch(error => console.log(error));
	}
	changeProductType(type){
		getListProduct(type.id, 1)
    .then(arrProduct => {
      this.setState({
        products: arrProduct,
				currentType: type.name
      });
    })
    .catch(err => console.log(err));
	}
	// Search by Keyword
	handleSearch(event){
		this.setState({term: event.target.value});
	}
	// Mobile Search Reset
	handleMobileSearch(){
		this.setState({term: ""});
	}
	// Filter by Category
	handleCategory(event){
		this.setState({category: event.target.value});
		console.log(this.state.category);
	}
	// Add to Cart
	handleAddToCart(selectedProducts){
		let cartItem = this.state.cart;
		let productID = selectedProducts.id;
		console.log('product ID::', productID);
		let productQty = selectedProducts.quantity;
		if(this.checkProduct(productID)){
			console.log('hi');
			let index = cartItem.findIndex((x => x.id == productID));
			cartItem[index].quantity = Number(cartItem[index].quantity) + Number(productQty);
			this.setState({
				cart: cartItem
			})
		} else {
			cartItem.push(selectedProducts);
		}
		this.setState({
			cart : cartItem,
			cartBounce: true,
		});
		setTimeout(function(){
			this.setState({
				cartBounce:false,
				quantity: 1
			});
			console.log(this.state.quantity);
			console.log(this.state.cart);
    }.bind(this),1000);
		this.sumTotalItems(this.state.cart);
		this.sumTotalAmount(this.state.cart);
	}
	handleRemoveProduct(id, e){
		let cart = this.state.cart;
		let index = cart.findIndex((x => x.id == id));
		cart.splice(index, 1);
		this.setState({
			cart: cart
		})
		this.sumTotalItems(this.state.cart);
		this.sumTotalAmount(this.state.cart);
		e.preventDefault();
	}
	checkProduct(productID){
		let cart = this.state.cart;
		return cart.some(function(item) {
			return item.id === productID;
		});
	}
	sumTotalItems(){
        let total = 0;
        let cart = this.state.cart;
		total = cart.length;
		this.setState({
			totalItems: total
		})
    }
	sumTotalAmount(){
        let total = 0;
        let cart = this.state.cart;
        for (var i=0; i<cart.length; i++) {
            total += cart[i].price * parseInt(cart[i].quantity);
        }
		this.setState({
			totalAmount: total
		})
    }

	//Reset Quantity
	updateQuantity(qty){
		console.log("quantity added...")
		this.setState({
				quantity: qty
		})
	}
	// Open Modal
	openModal(product){
		this.setState({
			quickViewProduct: product,
			modalActive: true
		})
	}
	// Close Modal
	closeModal(){
		this.setState({
			modalActive: false
		})
	}

	render(){
		return(
			<div className="container">
				<Header
					cartBounce={this.state.cartBounce}
					total={this.state.totalAmount}
					totalItems={this.state.totalItems}
					cartItems={this.state.cart}
					removeProduct={this.handleRemoveProduct}
					handleSearch={this.handleSearch}
					handleMobileSearch={this.handleMobileSearch}
					handleCategory={this.handleCategory}
					categoryTerm={this.state.category}
					updateQuantity={this.updateQuantity}
					productQuantity={this.state.moq}
					productType={this.state.productType}
					changeProductType={this.changeProductType.bind(this)}
					gotoIndex={this.gotoIndex.bind(this)}
				/>
				<Products
					allProduct={this.state.allProduct}
					productsList={this.state.products}
					searchTerm={this.state.term}
					addToCart={this.handleAddToCart}
					productQuantity={this.state.quantity}
					updateQuantity={this.updateQuantity}
					openModal={this.openModal}
					productType={this.state.currentType}
				/>
				<Footer />
				<QuickView product={this.state.quickViewProduct} openModal={this.state.modalActive} closeModal={this.closeModal} />
			</div>
		)
	}
}

ReactDOM.render(
	<App />,
  	document.getElementById('root')
);
