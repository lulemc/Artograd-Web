import axios from 'axios';
import {
  CategoryItemType,
  CityItemType,
  NewTenderFormType,
  Tender,
  TenderStatus,
} from '../../types';
import api from '../axiosConfig';
import { CustomFileCardItem } from '../../components/FileUpload/CustomFileCardItem';

type TenderApiPostPayload = {
  formData: NewTenderFormType;
  cityData?: CityItemType;
  tenderAttachments?: CustomFileCardItem[];
  addressValue?: string;
  commentsValue?: string;
  tenderStatus?: TenderStatus;
  filesDirectoryId?: string;
  username?: string;
};

export const tendersApi = {
  get: async (
    page?: number,
    statuses?: CategoryItemType[],
    locations?: CityItemType[],
    title?: string,
    owner?: string,
    tenderId?: string,
  ) => {
    try {
      const response = await axios.get(
        tenderId
          ? `${process.env.REACT_APP_BACKEND_URL}/tenders/${tenderId}`
          : `${process.env.REACT_APP_BACKEND_URL}/tenders?page=${page}${
              statuses && statuses.length !== 0
                ? `&statuses=${statuses
                    .map((item) => item.name.toUpperCase())
                    .join(decodeURIComponent('%2c'))}`
                : ''
            }${
              locations && locations.length !== 0
                ? `&locationLeafIds=${locations.map((location) => location.id)}`
                : ''
            }${title ? `&title=${title}` : ''}${
              owner ? `&ownerId=${owner}` : ''
            }`,
      );
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  post: async ({
    formData,
    cityData,
    tenderAttachments,
    addressValue,
    commentsValue,
    tenderStatus,
    filesDirectoryId,
    username,
  }: TenderApiPostPayload) => {
    return await api.post(`/tenders`, {
      title: formData?.tenderTitle,
      description: formData?.tenderDescription,
      submissionStart: formData?.tenderValidity?.from,
      submissionEnd: formData?.tenderValidity?.to,
      expectedDelivery: formData?.tenderExpectedDelivery,
      category: formData?.tenderCategory,
      locationLeafId: cityData?.id,
      location: {
        nestedLocation: {
          name: cityData?.name,
          id: cityData?.id,
        },
        geoPosition: {
          latitude: cityData?.lat,
          longitude: cityData?.lng,
        },
        addressLine: addressValue,
        addressComment: commentsValue,
      },
      ownerName: `${formData?.ownerFirstName} ${formData?.ownerLastName}`,
      ownerId: username,
      organization: formData?.ownerOrganization,
      showEmail: formData?.emailSharingAgreement,
      files: tenderAttachments?.map((attachment) => ({
        extension: attachment.extension,
        name: attachment.name,
        path: attachment.path,
        size: attachment.size,
        snapPath: attachment.snapPath,
        type: attachment.type,
      })),
      status: tenderStatus,
      filesDirectoryId,
    });
  },
  put: async (id: string, params: Tender) => {
    return await api.put(`tenders/${id}`, params);
  },
  delete: async (id: string) => {
    return await api.delete(`/tenders/${id}`);
  },
};
