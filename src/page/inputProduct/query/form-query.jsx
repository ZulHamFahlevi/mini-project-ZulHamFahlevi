import { gql } from "@apollo/client";

const GET_PRODUCT = gql`
  query Data {
    product {
      uuid
      timeStamp
      productName
      productType
      imageProduct
      productBrand
      productStock
      productDescription
      productPrice
    }
  }
`;

const ADD_PRODUCT = gql`
  mutation DataMutation($object: product_insert_input!) {
    insert_product_one(object: $object) {
      productName
      productType
      imageProduct
      productBrand
      productStock
      productDescription
      productPrice
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation DataMutation(
    $pk_columns: product_pk_columns_input!
    $_set: product_set_input!
  ) {
    update_product_by_pk(pk_columns: $pk_columns, _set: $_set) {
      uuid
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation DataMutation($uuid: uuid!) {
    delete_product_by_pk(uuid: $uuid) {
      uuid
    }
  }
`;

export { GET_PRODUCT, ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT };
