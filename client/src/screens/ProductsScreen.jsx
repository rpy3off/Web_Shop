import { Box, Wrap, WrapItem, Center, Button } from '@chakra-ui/react';
import ProductCart from '../components/ProductCart';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../redux/actions/productActions';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

const ProductsScreen = () => {
  const dispatch = useDispatch();
  const { loading, error, products, pagination, favoritesToggled } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts(1));
  }, [dispatch]);

  const paginationButtonClick = (page) => {
    dispatch(getProducts(page));
  };

  return (
    <>
      {products.length >= 1 && (
        <Box>
          <Wrap spacing='30px' justify='center' minHeight='80vh' mx={{ base: '12', md: '20', lg: '22' }}>
            {products.map((product) => (
              <WrapItem key={product._id}>
                <Center w='250px' h='450px'>
                  <ProductCart product={product} loading={loading} />
                </Center>
              </WrapItem>
            ))}
          </Wrap>
          {!favoritesToggled && (
            <Wrap spacing='10px' justify='center' p='5'>
              <Button colorScheme='cyan' onClick={() => paginationButtonClick(1)}>
                <ArrowLeftIcon />
              </Button>

              {Array.from(Array(pagination.totalPages), (e, i) => {
                return <Button colorScheme={pagination.currentPage === i + 1 ? 'cyan' : 'gray'} key={i}
                onClick={() => paginationButtonClick(i +1)}>{i+1}</Button>;
              })}

              <Button colorScheme='cyan' onClick={() => paginationButtonClick(pagination.totalPages)}>
                <ArrowRightIcon />
              </Button>
            </Wrap>
          )}
        </Box>
      )}
    </>
  );
};

export default ProductsScreen;
