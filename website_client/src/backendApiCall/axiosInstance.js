import axios from 'axios';
export default axios.create({
  headers: {
    Accept: 'application/json',
    ContentType: 'application/json',
  },
});
