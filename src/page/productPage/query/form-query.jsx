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

const GET_PRODUCT_BY_PK = gql`
  query product($uuid: uuid!) {
    product_by_pk(uuid: $uuid) {
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

export { GET_PRODUCT, GET_PRODUCT_BY_PK };
