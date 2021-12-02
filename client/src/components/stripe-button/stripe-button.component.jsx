import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import mainLogo from'../../assets/crown.svg';

import { connect, useDispatch } from 'react-redux';
import { moveOrder } from '../../redux/cart/cart.actions';

const StripeCheckoutButton = ({ price,cartItems,moveOrder,currentUser }) => {


  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51HGb9dCgtVEMMSlAv6nacRAG6UFhqOrcao58OU28XqcshPvwqbDDf3cm6Q1t3EcpZUHBmGxe8uQYBVIIkKt38Ry400954qD00W';

  const onToken = token => {
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token: token
      }
    })
      .then(response => {
        moveOrder(cartItems,currentUser)

        alert('succesful payment');


      })
      .catch(error => {
        console.log('Payment Error: ', (error));
        alert(
          'There was an issue with your payment! Please make sure you use the provided credit card.'
        );
      });
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image={mainLogo}
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
    // <button onClick={onToken}>click</button>
  );
};


const mds=(state)=>{
  return {
    cartItems:state.cart.cartItems,
    currentUser:state.user.currentUser
  }
}

const msp=(dispatch)=>({
  moveOrder:(items,currentUser)=>dispatch(moveOrder(items,currentUser))
})

export default connect(mds,msp)(StripeCheckoutButton);
