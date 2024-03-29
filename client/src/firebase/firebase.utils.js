import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCVcd_JuxPK0lL6R4PbQHYsR3BzBarucpQ",
  authDomain: "crown-db-3fe4b.firebaseapp.com",
  databaseURL: "https://crown-db-3fe4b.firebaseio.com",
  projectId: "crown-db-3fe4b",
  storageBucket: "crown-db-3fe4b.appspot.com",
  messagingSenderId: "548550657878",
  appId: "1:548550657878:web:b881e86330af06691778f7"
};

firebase.initializeApp(config);

export const ordersCreation=async(orders,currentUser)=>{


  const userRef = firestore.doc(`users/${currentUser.id}`);

  const snapShot = await userRef.get();

  let prev

  if(currentUser.prevOrders){
    prev=[...currentUser.prevOrders]
  }else{
    prev=[]
  }


  let prevOrders =[...prev,...orders]

  console.log(prev,'prev',orders,'orders',prevOrders);

const {createdAt,displayName,email} =currentUser


  try {
     await userRef.set({
      createdAt,
      displayName,
      email,
      prevOrders
    })

     
  } catch (error) {
    return  new Error('cant able to update previous order')
  }



return userRef
}



export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();


  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
