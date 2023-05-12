import { gql } from "@apollo/client";

const GET_PRODUCT = gql`
  query Data {
    product {
      uuid
      timeStamp
      productName
      productType
      imageProduct
      productDescription
      productPrice
    }
  }
`;

const GET_USER = gql`
  query profile {
    profile {
      uuid,
      username,
    }
  }
`;

export { GET_PRODUCT, GET_USER };
