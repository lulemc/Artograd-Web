import {
  AvatarImage,
  ProfileFundraisingItems,
  ProfileInformationItems,
  ProfilePayloadItem,
  ProfileResponse,
  ProfileResponseItem,
  SocialMedia,
} from '../../pages/Profile/profile.interfaces';

const socialMediaPayload = [
  { name: 'custom:linkedin', value: '' },
  { name: 'custom:facebook', value: '' },
  { name: 'custom:instagram', value: '' },
  { name: 'website', value: '' },
];

export const STANDARD_ATTR = [
  'given_name',
  'family_name',
  'picture',
  'email',
  'phone_number',
  'socialMedia',
];
enum checkboxes {
  email = 'custom:show_email',
  bankByDefault = 'custom:bank_use_default',
}

export const createProfilePayload = (
  data: ProfileInformationItems | ProfileFundraisingItems | AvatarImage,
) => {
  let payload: ProfilePayloadItem[] = [];
  const params = Object.keys(data);
  const rowData = Object.assign(data);

  params.forEach((propertyName) => {
    const isCustom = STANDARD_ATTR.includes(propertyName);
    const name = isCustom ? propertyName : `custom:${propertyName}`;
    const property = rowData[propertyName];
    const value =
      name === checkboxes.email || name === checkboxes.bankByDefault
        ? Number(property)
        : property;

    if (propertyName === 'socialMedia') {
      payload = [...payload, ...handleSocialMediaPayload(value)];
    } else {
      payload.push({
        name,
        value,
      });
    }
  });
  return payload;
};

const handleSocialMediaPayload = (data: SocialMedia[] = []) => {
  const payload = structuredClone(socialMediaPayload);
  return payload.map((item: ProfilePayloadItem) => {
    const updateItem = data.find((media) => media.id === item.name);
    return updateItem ? { name: updateItem.id, value: updateItem.url } : item;
  });
};

export const handleProfileInfoResponse = (res: ProfileResponse) => {
  const data = res.data;
  const pofileInf = data.reduce(
    (acc: ProfileResponseItem, curr: ProfileResponseItem) => {
      const attrName = curr.name as unknown as string;
      const attr = { [attrName]: curr.value };
      return Object.assign(acc, attr);
    },
    {},
  );

  return pofileInf;
};

export const addCustomPrefix = (
  data: ProfileInformationItems | ProfileFundraisingItems,
) => {
  const formatted: { [key: string]: string } = {};
  const rowData = Object.assign(data);
  const params = Object.keys(data).filter((val) => rowData[val]);
  params.forEach((propertyName) => {
    const isCustom = STANDARD_ATTR.includes(propertyName);
    const name = isCustom ? propertyName : `custom:${propertyName}`;
    formatted[name] = rowData[propertyName];
  });
  return formatted;
};
