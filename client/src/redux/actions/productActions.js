import product, { setProducts, setError, setLoading, setPagination, setFavorites, setFavoritesToggle } from '../slices/product';
import axios from 'axios';

export const getProducts = (page, favoriteToggle) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const { data } = await axios.get(`/api/products/${page}/${10}`);
    const { products, pagination } = data;
    console.log(pagination)
    dispatch(setProducts(products));
    dispatch(setPagination(pagination));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'An expected has occured.'
      )
    );
  }
};

export const addToFavorites = (id) => async (dispatch, getState) =>{
  const { product: {favorites}} = getState()

  const newFavorites =[...favorites, id]
  localStorage.setItem('favorites', JSON.stringify(newFavorites))
  dispatch(setFavorites(newFavorites))
}

export const removeFromFavorites = (id) => async (dispatch, getState) =>{
  const { product: {favorites}} = getState()

  const newFavorites = favorites.filter((favoritesId) => favoritesId !== id)
  localStorage.setItem('favorites', JSON.stringify(newFavorites))
  dispatch(setFavorites(newFavorites))
}

export const toggleFavorites =(toggle) => async (dispatch, getState) =>{
  const { product: {favorites, products}} = getState()

  if (toggle) {
    const filtredProducts = products.filter((product) => favorites.includes(product._id))
    dispatch(setFavoritesToggle(toggle))
    dispatch(setProducts(filtredProducts))
  } else {
    dispatch(setFavoritesToggle(false))
    dispatch(getProducts(1))
  }
}