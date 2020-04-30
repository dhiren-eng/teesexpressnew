export const FETCH_ERROR = 'FETCH_ERROR';
const fetchErrorAction = (error) => {
  return {
    type: FETCH_ERROR,
    error: error,
  };
};
export default fetchErrorAction;
