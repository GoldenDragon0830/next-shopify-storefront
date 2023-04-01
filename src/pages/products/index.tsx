import { GetServerSideProps } from '@app/utilities/deps';
import { DefaultLayout } from '@app/layouts/DefaultLayout/DefaultLayout';

import { ProductList } from '@app/sections/ProductList/ProductList';
import { getProductList, GetProductListOutput } from '@app/sections/ProductList/ProductList.service';

interface Props {
  productList: GetProductListOutput;
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      productList: await getProductList(),
    },
  };
};

export default function Page(props: Props) {
  return (
    <DefaultLayout>
      <ProductList productList={props.productList}></ProductList>
    </DefaultLayout>
  );
}
