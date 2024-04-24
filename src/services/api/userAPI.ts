import api from '../axiosConfig';
import { ProfilePayloadItem } from '../../pages/Profile/profile.interfaces';

export const userApi = {
  get: async (username: string) => {
    try {
      const response = await api.request({
        url: `users/${username}`,
        method: 'GET',
      });
      return response;
    } catch (err) {
      console.error(err);
    }
  },
  put: async (username: string, params: ProfilePayloadItem[]) => {
    return await api.put(`users/${username}`, params);
  },
  delete: async (username: string) => {
    return await api.delete(`users/${username}`);
  },
};
