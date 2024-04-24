import { createSlice } from '@reduxjs/toolkit';
interface profileFundraisingState {
  'custom:bank_use_default': boolean;
  'custom:bank_benefit_name': string;
  'custom:bank_benefit_bank': string;
  'custom:bank_account': string;
  'custom:bank_iban': string;
  'custom:bank_swift': string;
}

const profileFundraisingState = {
  'custom:bank_use_default': false,
  'custom:bank_benefit_name': '',
  'custom:bank_benefit_bank': '',
  'custom:bank_account': '',
  'custom:bank_iban': '',
  'custom:bank_swift': '',
};

export const initialState: profileFundraisingState = profileFundraisingState;

const profileFundraisingSlice = createSlice({
  name: 'profileFundraising',
  initialState,
  reducers: {
    updateProfileFundraising(state, action) {
      Object.assign(state, action.payload);
    },
    resetFundraising(state, action) {
      return (state = action.payload);
    },
  },
});

export const { updateProfileFundraising, resetFundraising } =
  profileFundraisingSlice.actions;
export default profileFundraisingSlice.reducer;
