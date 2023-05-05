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

export { GET_PRODUCT };
