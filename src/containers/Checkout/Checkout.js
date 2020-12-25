import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

import * as actions from '../../store/actions/index';

class Checkout extends Component {
  // state = {
  //   ingredients: {
  //     salad: 1,
  //     meat: 1,
  //     cheese: 1,
  //     bacon: 1,
  //   },
  //   totalPrice: 0,
  // };

  // componentDidMount() {
  //   //     const query = new URLSearchParams(this.props.location.search);
  //   //     const ingredients = {};
  //   //     for (let param of query.entries()) {
  //   //       ingredients[param[0]] = param[1];
  //   //       console.log(param[0], param[1], ingredients);
  //   //     }
  //   //     this.setState({ ingredients: ingredients });
  //   //     console.log(this.state);
  //   console.log(this.props);
  //   this.setState({
  //     ingredients: this.props.history.location.state.ingredients,
  //     totalPrice: this.props.history.location.state.totalPrice,
  //   });
  //   //   { ingredients: this.props.history.location.state },
  //   //   () => console.log(this.state.ingredients),
  //   // );
  // }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
    console.log(this.state);
  };
  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            onCheckoutCancelled={this.checkoutCancelledHandler}
            onCheckoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitPurchase: () => dispatch(actions.purchaseInit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
