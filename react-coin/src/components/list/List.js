import React from 'react';
import { handleResponse } from '../../helpers';
import { API_URL } from '../../config';
import Loading from '../common/Loading';
import Table from './Table';
import Pagination from './Pagination';

class List extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      currencies: [],
      error: null,
      totalPages: 0,
      page: 1,
    };

    this.handlePaginationClick = this.handlePaginationClick.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  fetchCurrencies() {
    this.setState({ loading: true });

    const { page } = this.state;

    fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
      .then(handleResponse)
      .then((data) => {
        const { currencies, totalPages } = data;

        this.setState({
          // Object literal propertie value shortening
          // currencies: currencies
          // totalPages: totalPages
          currencies,
          totalPages,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.errorMessage,
          loading: false
        });
      });
  }

  handlePaginationClick(direction) {
    let nextPage = this.state.page;

    // Increment next page if direction is next, otherwise decrement
    nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1;

    this.setState({ page: nextPage }, () => {
      // call fetchCurrencies function inside setState's callback
      // because we have to make sure first page state is updated
      this.fetchCurrencies();
    });
  }

  render() {
    // destructuring
    const { loading, error, currencies, page, totalPages } = this.state;
    // is the same as
    // const loading = this.state.loading;
    // const error = this.state.error;
    // etc etc

    // render only loading component if loading state is set to true
    if (loading) {
      return <div className="loading-container"><Loading /></div>
    }

    // rener only error message, if error occured while fetching data
    if (error) {
      return <div className="error">{error}</div>
    }

    return (
      <div>
        <Table
          currencies={currencies}
        />

        <Pagination
          page={page}
          totalPages={totalPages}
          handlePaginationClick={this.handlePaginationClick}
        />
      </div>
    );
  }
}

export default List;
