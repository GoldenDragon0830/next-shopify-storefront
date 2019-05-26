import { gql } from 'apollo-boost';
import { actions } from '../store';
import { shopify } from './apis';

export const productQuery = gql`
  query product($handle: String!) {
    productByHandle(handle: $handle) {
      title
      description
      images(first: 1) {
        edges {
          node {
            originalSrc
          }
        }
      }
      options {
        id
        name
        values
      }
      variants(first: 250) {
        edges {
          node {
            id
            title
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;

export function fetch(productHandle: string): Function {
  return async (dispatch: Function): Promise<void> => {
    try {
      dispatch(actions.product.request());

      const response = await shopify.query({
        query: productQuery,
        variables: {
          handle: productHandle
        }
      });

      const item = response.data.productByHandle;

      dispatch(actions.product.success({ item }));
    } catch (error) {
      dispatch(actions.product.failure({ error }));
    }
  };
}
