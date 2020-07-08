import axiosInstance from '../../../backendApiCall/axiosInstance';
import actions from './actions';
import fetchErrorAction from '../../../commonActions/fetchErrorAction';
import { useContext, useEffect } from 'react';
import { contextObject } from '../../../Context/Store';
import _ from 'lodash';
const fetchCategories = async (dispatch) => {
  const response = await axiosInstance.get('/api/category/all');
  if (response) {
    dispatch(actions.receiveCtgList(response.data));
  }
};
const fetchCategory = async (id, dispatch) => {
  const response = await axiosInstance.get(`/api/category/${id}`);
  if (response) {
    dispatch(actions.receiveCtg(response.data));
  }
};
export default { fetchCategories, fetchCategory };
