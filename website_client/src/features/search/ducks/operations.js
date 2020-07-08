import axiosInstance from '../../../backendApiCall/axiosInstance';
import fetchErrorAction from '../../../commonActions/fetchErrorAction';
import actions from './actions';
const searchProduct = async (term, dispatch) => {
  try {
    const response = await axiosInstance.get(`/api/category/search/${term}`);
    if (response) {
      dispatch(actions.productSearch(response.data));
    }
  } catch (err) {
    console.log(err);
  }
};
export default { searchProduct };
