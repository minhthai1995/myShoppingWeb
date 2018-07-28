import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
const url = 'http://unsmiling-plugs.000webhostapp.com/images/product/';
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}
class QuickView extends Component{
	constructor(props){
		super(props);
	}
  componentDidMount() {
		document.addEventListener('click', this.handleClickOutside.bind(this), true);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.handleClickOutside.bind(this), true);
	}

	handleClickOutside(event) {
    const domNode = findDOMNode(this.refs.modal);
		if (!domNode || !domNode.contains(event.target)) {
			this.props.closeModal();
		}
  }

  handleClose(){
    this.props.closeModal();
  }

  render(){
		console.log('product ne::', this.props.product);
    return(
      <div className={this.props.openModal ? "modal-wrapper active" : "modal-wrapper"}>
        <div className="modal" ref="modal">
          <button type="button" className="close" onClick={this.handleClose.bind(this)}>&times;</button>
          <div className="quick-view">
            <div className="quick-view-image"><img src={`${url}${this.props.product.image}`} alt={this.props.product.name}/></div>
            <div className="quick-view-details">
							<div className="main-details">
								<span className="product-name">{this.props.product.name}</span>
								<span className="product-price">{this.props.product.price ? numberWithCommas(this.props.product.price) : ''}</span>
							</div>
							<div className="main-details">
								<div className="product-color"><span className="product-title-color">Màu sắc:</span> {this.props.product.color}</div>
								<div className="product-material"><span className="product-title-color">Chất liệu:</span> {this.props.product.material}</div>
							</div>
							<div className="product-description"><span className="product-title-color">Mô tả: </span>{this.props.product.description}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default QuickView;
