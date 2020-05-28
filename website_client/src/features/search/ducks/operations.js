import axiosInstance from '../../../backendApiCall/axiosInstance';
import fetchErrorAction from '../../../commonActions/fetchErrorAction';
import actions from './actions';
const searchProduct = (term) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`/api/category/search/${term}`);
    if (response) {
      dispatch(fetchErrorAction(null));
      dispatch(actions.productSearch(response.data));
    }
  } catch (err) {
    console.log(err);
    dispatch(fetchErrorAction(err));
  }
};
export default { searchProduct };
