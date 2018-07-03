import React, {Component} from 'react';
import CartScrollBar from './CartScrollBar';
import Counter from './Counter';
import EmptyCart from '../empty-states/EmptyCart';
import Facebook from './Facebook';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {findDOMNode} from 'react-dom';
import global from './global';

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: false,
            showCart: false,
            cart: this.props.cartItems,
            mobileSearch: false,
            isLoggedIn: false,
            checkOut: false,
            userName: '',
            userPhone:'',
            userAddress:''
        };
        global.onSignIn = this.onSignIn.bind(this);
    }
    onSignIn(user) {
    this.setState({ user });
    console.log('user ne', this.state.user);
    }
    handleCart(e){
        e.preventDefault();
        this.setState({
            showCart: !this.state.showCart
        })
    }
    handleSubmit(e){
        e.preventDefault();
    }
    handleMobileSearch(e){
        e.preventDefault();
        this.setState({
            mobileSearch: true
        })
    }
    handleSearchNav(e){
        e.preventDefault();
        this.setState({
            mobileSearch: false
        }, function(){
            this.refs.searchBox.value = "";
            this.props.handleMobileSearch();
        })
    }
    handleClickOutside(event) {
        const cartNode = findDOMNode(this.refs.cartPreview);
        const buttonNode = findDOMNode(this.refs.cartButton);
        if(cartNode.classList.contains('active')){
            if (!cartNode || !cartNode.contains(event.target)){
                this.setState({
                    showCart: false
                })
                event.stopPropagation();
            }
        }
    }
    handleCheckOut(){

    }
    componentDidMount() {
      document.addEventListener('click', this.handleClickOutside.bind(this), true);
    }
    componentWillUnmount() {
      document.removeEventListener('click', this.handleClickOutside.bind(this), true);
    }
    onUserSignIn(){
      this.setState({
        isLoggedIn: true
      })
    }
    proceedCheckOut(){
      this.setState({
        checkOut: true
      })
    }
    handleName(e){
      this.setState({
        userName: e.target.value
      })
    }
    handlePhone(e){
      this.setState({
        userPhone: e.target.value
      })
    }
    handleAddress(e){
      this.setState({
        userAddress: e.target.value
      })
    }
    render(){
      console.log('phone,name,address');
      console.log(this.state.userName, this.state.userPhone, this.state.userAddress);
      let checkOut = this.state.isLoggedIn ? (
        <button type="button" onClick={this.proceedCheckOut.bind(this)} className={this.state.cart.length > 0 ? " " : "disabled"}>THANH TOÁN</button>
      ) : <Facebook onUserSignIn={this.onUserSignIn.bind(this)}/>
        let cartItems;
        cartItems = this.state.cart.map(product =>{
			return(
				<li className="cart-item" key={product.name}>
                    <img className="product-image" src={product.image} />
                    <div className="product-info">
                        <p className="product-name">{product.name}</p>
                        <p className="product-price">{product.price}</p>
                    </div>
                    <div className="product-total">
                        <p className="quantity">{product.quantity} {product.quantity > 1 ?"Nos." : "No." } </p>
                        <p className="amount">{product.quantity * product.price}</p>
                    </div>
                    <a className="product-remove" href="#" onClick={this.props.removeProduct.bind(this, product.id)}>×</a>
      </li>
			)
		});
        let view;
        if(cartItems.length <= 0){
			view = <EmptyCart />
		} else{
			view = <CSSTransitionGroup transitionName="fadeIn" transitionEnterTimeout={500} transitionLeaveTimeout={300} component="ul" className="cart-items">{cartItems}</CSSTransitionGroup>
		}
        return(
            <header>
                <div className="container">
                    <div className="brand">
                        <img className="logo" src="https://res.cloudinary.com/sivadass/image/upload/v1493547373/dummy-logo/Veggy.png" alt="Veggy Brand Logo"/>
                    </div>

                    <div className="search">
                        <a className="mobile-search" href="#" onClick={this.handleMobileSearch.bind(this)}><img src="https://res.cloudinary.com/sivadass/image/upload/v1494756966/icons/search-green.png" alt="search"/></a>
                        <form action="#" method="get" className={this.state.mobileSearch ? "search-form active" : "search-form"}>
                            <a className="back-button" href="#" onClick={this.handleSearchNav.bind(this)}><img src="https://res.cloudinary.com/sivadass/image/upload/v1494756030/icons/back.png" alt="back"/></a>
                            <input type="search" ref="searchBox" placeholder="Tìm món đồ chơi bạn thích" className="search-keyword" onChange={this.props.handleSearch}/>
                            <button className="search-button" type="submit" onClick={this.handleSubmit.bind(this)}></button>
                        </form>
                    </div>

                    <div className="cart">
                        <div className="cart-info">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Số lượng</td>
                                        <td>:</td>
                                        <td><strong>{this.props.totalItems}</strong></td>
                                    </tr>
                                    <tr>
                                        <td>Thành tiền</td>
                                        <td>:</td>
                                        <td><strong>{this.props.total}</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <a className="cart-icon" href="#" onClick={this.handleCart.bind(this)} ref="cartButton">
                            <img className={this.props.cartBounce ? "tada" : " "} src="https://res.cloudinary.com/sivadass/image/upload/v1493548928/icons/bag.png" alt="Cart"/>
                            {this.props.totalItems ? <span className="cart-count">{this.props.totalItems}</span> : "" }
                        </a>
                        <div className={this.state.showCart ? "cart-preview active" : "cart-preview"} ref="cartPreview">
                            <CartScrollBar>
                                {view}
                            </CartScrollBar>
                            <div className="action-block">
                                {checkOut}
                            </div>
                        </div>
                        <div className={this.state.checkOut ? "checkout-preview active" : "cart-preview"} ref="checkOutPreview">
                            <form action="#" method="get" className="fill-form">
                              <input type="search" ref="searchBox" placeholder="Nhập vào tên của bạn" className="fill-keyword" onChange={this.handleName.bind(this)}/>
                              <input type="search" ref="searchBox" placeholder="Nhập vào số điện thoại của bạn" className="fill-keyword" onChange={this.handlePhone.bind(this)}/>
                              <input type="search" ref="searchBox" placeholder="Nhập vào địa chỉ của bạn" className="fill-keyword" onChange={this.handleAddress.bind(this)}/>
                              <button className="fill-button" type="submit" onClick={this.handleCheckOut.bind(this)}>Xác nhận thông tin</button>
                          </form>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;
