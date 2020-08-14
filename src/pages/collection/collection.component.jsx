import React from "react";
import { connect } from "react-redux";

import { selectCollections } from "../../redux/shop/shop.selector";

import "./collection.styles.scss";

const CollectionPage = ({ collection }) => {
  console.log(collection);
  return (
    <div className="collection-page">
      <h2>Category</h2>
    </div>
  );
};

const mapStateToProp = (state, ownProps) => {
  collection: selectCollections(ownProps.match.params.collectionId)(state);
};

export default connect(mapStateToProp)(CollectionPage);
