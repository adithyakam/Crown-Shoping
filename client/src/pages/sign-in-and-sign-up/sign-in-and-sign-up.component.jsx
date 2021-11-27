import React from 'react';
import { connect } from 'react-redux';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import Spinner from '../../components/spinner/spinner.component';


import { SignInAndSignUpContainer } from './sign-in-and-sign-up.styles';

const SignInAndSignUpPage = ({loading}) => (


  <SignInAndSignUpContainer>
   { loading ? <Spinner/>:<>
   
    <SignIn />
    <SignUp />
   
   </>}

  </SignInAndSignUpContainer>
);

const mapStateToProp=(state)=>{
  return{
    loading:state.user.loadingUser
  }
}


export default connect(mapStateToProp)(SignInAndSignUpPage);
