import axiosInstance from './axios-config';

export const GETProfile = async () => {
  return await axiosInstance
    .get('/users/profile')
    .then((res) => {
      return res.data;
    })
    .catch((err) => err);
};
