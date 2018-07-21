import React, {Component} from 'react';
import Counter from './Counter';

const url = 'http://unsmiling-plugs.000webhostapp.com/images/product/';
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}
class Product extends Component{
	constructor(props){
		super(props);
        this.state = {
            selectedProduct: {},
            quickViewProdcut: {},
            isAdded: false
        }
    }
    addToCart(image, name, price, id, quantity){
        this.setState({
            selectedProduct: {
                image: image,
                name: name,
                price: price,
                id: id,
                quantity: quantity
            }
        }, function(){
            this.props.addToCart(this.state.selectedProduct);
        })
        this.setState({
            isAdded: true
        }, function(){
            setTimeout(() => {
                this.setState({
                    isAdded: false,
                    selectedProduct: {}
                });
            }, 3500);
        });
    }
    quickView(image, name, price, id, quantity, color, material, description){
        this.setState({
            quickViewProdcut: {
                image: image,
                name: name,
                price: price,
                id: id,
								quantity: quantity,
								color: color,
								material: material,
								description: description
            }
        }, function(){
            this.props.openModal(this.state.quickViewProdcut);
        })
    }
    render(){
        let image = this.props.image;
				let src = `${url}${image}`;
				console.log('src:::', src);
					// console.log('src:::', src);
        let name = this.props.name;
        let price = this.props.price;
				let material = this.props.product.material;
				let color = this.props.product.color;
				let description = this.props.product.description;
        let id = this.props.id;
        let quantity = this.props.productQuantity;
        return(
            <div className="product">
                <div className="product-image">
                    <img src={`${url}${image}`} alt={this.props.name} onClick={this.quickView.bind(this, image, name, price, id, quantity, color, material, description)}/>
                </div>
                <h4 className="product-name">{this.props.name}</h4>
                <p className="product-price">{numberWithCommas(this.props.price)}</p>
                <Counter productQuantity={quantity} updateQuantity={this.props.updateQuantity} resetQuantity={this.resetQuantity}/>
                <div className="product-action">
                    <button className={!this.state.isAdded ? "" : "added"} type="button" onClick={this.addToCart.bind(this, image, name, price, id, quantity)}>{!this.state.isAdded ? "THÊM VÀO GIỎ" : "✔ ĐÃ THÊM"}</button>
                </div>
            </div>
        )
    }
}

export default Product;
