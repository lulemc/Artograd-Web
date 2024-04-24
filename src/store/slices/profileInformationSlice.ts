import { createSlice } from '@reduxjs/toolkit';
import { SocialMedia } from '../../pages/Profile/profile.interfaces';

const LINKS = [
  'custom:linkedin',
  'custom:facebook',
  'custom:instagram',
  'website',
];
interface profileInformationState {
  picture: string;
  given_name: string;
  family_name: string;
  'custom:organization': string;
  'custom:jobtitle': string;
  'custom:location': string;
  email: string;
  'custom:show_email': boolean;
  phone_number: string;
  socialMedia: SocialMedia[];
  activeTenders: number;
  others: number;
  activeArtObjects: number;
  readyArtObjects: number;
}

const profileInformationState: profileInformationState = {
  picture: '',
  given_name: '',
  family_name: '',
  'custom:organization': '',
  'custom:jobtitle': '',
  'custom:location': '',
  email: '',
  'custom:show_email': false,
  phone_number: '',
  socialMedia: [{ id: '', url: '' }],
  activeTenders: 0,
  others: 0,
  activeArtObjects: 0,
  readyArtObjects: 0,
};

export const initialState = profileInformationState;

const profileInformationSlice = createSlice({
  name: 'profileInformation',
  initialState,
  reducers: {
    updateProfileInformation(state, action) {
      const links = Object.entries(action.payload)
        .filter((key) => LINKS.includes(key[0]))
        .map((key) => ({ id: key[0], url: key[1] })) as SocialMedia[];
      if (links.length) {
        state.socialMedia = links;
      }
      Object.assign(state, action.payload);
    },
    setUserData(state, action) {
      state.given_name = action.payload.given_name || '';
      state.family_name = action.payload.family_name || '';
      state.email = action.payload.email || '';
      state.picture = action.payload.picture || '';
      state['custom:organization'] =
        action.payload['custom:organization'] || '';
      state['custom:jobtitle'] = action.payload['custom:jobtitle'] || '';
    },
    profileAvatarChanged(state, action) {
      state.picture = action.payload.picture;
    },
    resetProfile(state, action) {
      return (state = action.payload);
    },
  },
});

export const {
  updateProfileInformation,
  profileAvatarChanged,
  setUserData,
  resetProfile,
} = profileInformationSlice.actions;
export default profileInformationSlice.reducer;
