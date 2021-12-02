import { all, call, takeLatest, put } from 'redux-saga/effects';
import { ordersCreation } from '../../firebase/firebase.utils';

import UserActionTypes from '../user/user.types';
import { clearCart } from './cart.actions';
import CartActionTypes from './cart.types';

export function* clearCartOnSignOut() {
  yield put(clearCart());
}


export function* onOrderfunc({payload:{item,currentUser}}){


  const a=yield ordersCreation(item,currentUser)

  yield call(clearCartOnSignOut)
}



export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}





export function* onorder(){
  yield takeLatest(CartActionTypes.ORDERS,onOrderfunc)

}

export function* cartSagas() {
  yield all([call(onSignOutSuccess),call(onorder)]);
}
