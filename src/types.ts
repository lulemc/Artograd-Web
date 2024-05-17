import { LatLngLiteral } from 'leaflet';

export type Author = {
  id: number;
  authorPic: string;
  authorName: string;
  authorRole: string;
  authorLinkedIn: string;
  authorEmail: string;
};

export type LocationType = {
  nestedLocation: {
    _id: string;
    name: string;
  };
  geoPosition: {
    latitude: string;
    longitude: string;
  };
  addressLine: string;
  addressComment: string;
};

export type Proposals = {
  id: string;
  published: string;
  thumbnail: string;
  winner: boolean;
  title: string;
  description: string;
  ownerId: string;
  ownerName: string;
  ownerPicture: string;
  ownerOrg: string;
  likedByUsers: string[];
  createdAt: string;
  modifiedAt: string;
};

export type Tender = {
  id: string;
  tags: string[];
  location: LocationType;
  author: string;
  attachments: string[];
  published: string;
  delivery: string;
  status: TenderStatus;
  title: string;
  description: string;
  proposals: Proposals[];
};

export type CategoryItemType = {
  name: string;
  id: number;
};

export type CityItemType = LatLngLiteral & {
  name: string;
  id?: string;
};

export enum TenderStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  IDEATION = 'IDEATION',
  VOTING = 'VOTING',
  SELECTION = 'SELECTION',
  CANCELLED = 'CANCELLED',
  CLOSED = 'CLOSED',
  DELETED = 'DELETED',
}

export type NewTenderFormType = {
  sub?: string;
  tenderTitle?: string;
  tenderDescription?: string;
  tenderValidity?: { from: string; to: string };
  tenderExpectedDelivery?: string;
  tenderCategory?: number[];
  emailSharingAgreement?: boolean;
  locationCityName?: CityItemType;
  locationComments?: string;
  locationAddress?: string;
  locationCoordinates?: LatLngLiteral;
  ownerFirstName?: string;
  ownerLastName?: string;
  ownerEmail?: string;
  ownerOrganization?: string;
};
