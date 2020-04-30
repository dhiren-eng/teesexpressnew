import axiosInstance from '../../../backendApiCall/axiosInstance';
import actions from './actions';
import fetchErrorAction from '../../../commonActions/fetchErrorAction';
const fetchCategories = () => async (dispatch) => {
  const response = await axiosInstance
    .get('/api/category/all')
    .catch((error) => {
      dispatch(fetchErrorAction(error));
    });
  if (response) {
    dispatch(fetchErrorAction(null));
    dispatch(actions.receiveCtgList(response.data));
  }
};
const fetchCategory = (id) => async (dispatch) => {
  console.log('fetchCategory');
  const response = await axiosInstance
    .get(`/api/category/${id}`)
    .catch((error) => {
      dispatch(fetchErrorAction(error));
    });
  if (response) {
    console.log(response);
    dispatch(fetchErrorAction(null));
    dispatch(actions.receiveCtg(response.data));
  }
};
export default { fetchCategories, fetchCategory };
