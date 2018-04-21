import React from 'react';
import { handleResponse } from '../../helpers';
import { API_URL } from '../../config';
import Loading from '../common/Loading';
import Table from './Table';

class List extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      currencies: [],
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    fetch(`${API_URL}/cryptocurrencies?page=1&perPage=99`)
      .then(handleResponse)
      .then((data) => {
        this.setState({
          currencies: data.currencies,
          loading: false
        });
      })
      .catch((error) => {
        this.setState({
          error: error.errorMessage,
          loading: false
        });
      });
  }

  renderChangePercent(percent) {
    if (percent > 0) {
      return <span className="percent-raised">{percent}% &uarr;</span>
    } else if (percent < 0) {
      return <span className="percent-fallen">{percent}% &darr;</span>
    } else {
      return <span>{percent}%</span>
    }
  }

  render() {
    // destructuring
    const { loading, error, currencies } = this.state;
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
      <Table
        currencies={currencies}
        renderChangePercent={this.renderChangePercent}
      />
    );
  }
}

export default List;
