import axiosInstance from './axios-config';

export const GETTodos = async (page: number) => {
  return axiosInstance
    .get(`/todos/not?page=${page}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => err);
};
