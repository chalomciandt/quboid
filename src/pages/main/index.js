import React, { Component } from 'react';
import api from '../../services/api';
import { Link }  from 'react-router-dom';

export default class Main extends Component {
	state = {
		products: [],
		info: {},
		page: 1
	}

	componentDidMount() {
		this.loadProducts();
	}
	render() {
		const {products, page, info} = this.state;
		return (
	<div className="product-list">
		<p>Página: {page}</p>
		<ul>
			{products.map(product => {
				return (
	<li key={product._id}>{product.title} -&nbsp;
		<Link to={`products/${product._id}`}>Detalhes</Link>
	</li>)
			})}
		</ul>
			<div className="actions">
				<button disabled={page===1} onClick={this.prevPage}>Previous</button>
				<button disabled={page===info.pages} onClick={this.nextPage}>Next</button>
			</div>
	</div>);
	}
	loadProducts = async (page = 1) => {
		const response = await api.get("/products?page=" + page);
		const {docs, ...info} = response.data;

		this.setState({
			products: docs,
			info: info,
			page: page
		});
	}

	prevPage = () => {
		const { page } = this.state;
		if (page === 1) {
			return;
		}
		this.loadProducts(page - 1);
	}
	nextPage = () => {
		const {page, info} = this.state;
		if (page === info.pages) {
			return;
		}
		this.loadProducts(page + 1);
	}
}
