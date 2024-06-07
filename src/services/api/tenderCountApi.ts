import { TenderStatus } from '../../types';
import api from '../axiosConfig';

export const ACTIVE_TENDERS = [
  TenderStatus.PUBLISHED,
  TenderStatus.IDEATION,
  TenderStatus.VOTING,
  TenderStatus.SELECTION,
];
export const OTHER_TENDERS = [
  TenderStatus.DRAFT,
  TenderStatus.CANCELLED,
  TenderStatus.CLOSED,
];
export const tenderCountApi = {
  get: async (username: string, params?: string[]) => {
    try {
      const response = await api.request({
        url: `tenders/count/${username}`,
        method: 'GET',
        params: {
          statuses: params,
        },
      });
      return response;
    } catch (err) {
      console.error(err);
    }
  },
};
