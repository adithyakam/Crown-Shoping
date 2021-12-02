import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { firestore, getCurrentUser } from '../../firebase/firebase.utils';
import { CheckoutPageContainer } from '../../pages/checkout/checkout.styles';
import { orderUpdate } from '../../redux/user/user.actions';
import { CheckoutItemContainer, ImageContainer, QuantityContainer, TextContainer } from '../checkout-item/checkout-item.styles';
import { OrderContainer } from './Order.styles'

function Order({currentUser,orderUpdate}) {

    // console.log(currentUser.prevOrders,'users');

    const [load,setload]=useState(false)
    const [orders,setorders]=useState('')


    useEffect(() => {
       
            if(currentUser){
                const a=firestore.collection('users').doc(`${currentUser.id}`).get().then((doc)=>{
                 
                    return (doc.data().prevOrders);
                          
                       }).then(ele=>{
                        if(ele )orderUpdate({prevOrders:[...orders,...ele]})
                       })
                       console.log(currentUser.prevOrders);

            }

    },[])

    


    
    return (
        
            (!currentUser)?(<h1>loading</h1>):(
            
                <OrderContainer>
               
                <div>
                    <h2>Previous order</h2>
    
                    <CheckoutPageContainer>
    
    
                {
                    currentUser.prevOrders?(
    
                        currentUser.prevOrders.map(ele=>{
                           return( <CheckoutItemContainer>
                                <ImageContainer>
                                    <img src={ele.imageUrl} alt='item' />
                                </ImageContainer>
                                <TextContainer>{ele.name}</TextContainer>
                                <TextContainer>{ele.quantity}</TextContainer>
    
                                <TextContainer>{ele.price}</TextContainer>
                                <TextContainer>completed</TextContainer>
    
                    </CheckoutItemContainer>)
                        })
    
                    ):(
                        <TextContainer>No previous orders</TextContainer>
                    )
                }
    
                    </CheckoutPageContainer>
    
                </div>
    
            </OrderContainer>



            )
        


    )
}


const msp=(state)=>{
    return{
        currentUser:state.user.currentUser

    }
}

const mds=(dispatch)=>{
    return{
        orderUpdate:(items)=>dispatch(orderUpdate(items))
    }
}

export default connect(msp,mds)(Order)
