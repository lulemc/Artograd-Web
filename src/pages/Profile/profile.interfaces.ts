export interface SocialMedia {
  id: string;
  url: string;
}

export interface SocialMediaList {
  id: string;
  name: string;
}

export interface ProfileInformationItems {
  email: string;
  family_name: string;
  given_name: string;
  jobtitle: string;
  location: string;
  organization: string;
  show_email: boolean;
  phone_number: string;
  socialMedia: SocialMedia[];
}

export interface AvatarImage {
  picture: string;
}

export interface ProfileFundraisingItems {
  bank_use_default: boolean;
  bank_benefit_name: string;
  bank_benefit_bank: string;
  bank_account: string;
  bank_iban: string;
  bank_swift: string;
}

export interface ProfileInformationCustomPrefix
  extends ProfileInformationItems,
    ProfileFundraisingItems {}

export interface ProfileResponseItem {
  [key: string]: { name: string; value: string };
}

export interface ProfilePayloadItem {
  name: string;
  value: string;
}
export interface ProfileResponse {
  data: ProfileResponseItem[];
}
