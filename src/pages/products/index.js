import React, { Component } from 'react';
import api from '../../services/api'
import { Link } from 'react-router-dom';

export default class Product extends Component {
	state = {
		product: {}
	}

	async componentDidMount() {
		const { id } = this.props.match.params;
		const response = await api.get(`/products/${id}`);

		this.setState({product: response.data});
	}

	render() {
		const { product } = this.state;
		return (
			<div className="product-info">
				<h1>Product: {product.title}</h1>
				<p>{product.description}</p>
				<Link to="/">Back</Link>
			</div>
		);
		return 'banana';
	}
}
