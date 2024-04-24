import api from '../axiosConfig';

enum TenderStatusCodes {
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
  Ideation = 'IDEATION',
  Voting = 'VOTING',
  Selection = 'SELECTION',
  Cancelled = 'CANCELLED',
  Closed = 'CLOSED',
  Deleted = 'DELETED',
}

export const ACTIVE_TENDERS = [
  TenderStatusCodes.Published,
  TenderStatusCodes.Ideation,
  TenderStatusCodes.Voting,
  TenderStatusCodes.Selection,
];
export const OTHER_TENDERS = [
  TenderStatusCodes.Draft,
  TenderStatusCodes.Cancelled,
  TenderStatusCodes.Closed,
  TenderStatusCodes.Deleted,
];
export const tenderApi = {
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
