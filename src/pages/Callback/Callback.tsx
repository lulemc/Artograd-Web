import { Panel, Text } from '@epam/uui';
import { useHistory } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { saveUserData, userLogin, UserData } from '../../store/identitySlice';
import { useQuery } from '../../utils/useQuery';
import { handleProfileInfoResponse } from '../../services/helpers/profileHelper';
import { userApi } from '../../services/api/userAPI';
import {
  setUserData,
  updateProfileInformation,
} from '../../store/slices/profileInformationSlice';
import { profileAvatarChanged } from '../../store/slices/profileInformationSlice';
import { updateProfileFundraising } from '../../store/slices/profileFundrasingSlice';
import { ProfileResponse } from '../Profile/profile.interfaces';

const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
};

export const CallbackPage = () => {
  const query = useQuery();
  const history = useHistory();
  const dispatch = useDispatch();
  // TODO: REPLACE WITH AXIOS
  fetch(
    `${process.env.REACT_APP_TOKEN_URL}&redirect_uri=${
      window.location.origin + process.env.REACT_APP_REDIRECT_PAGE
    }&code=${query.get('code')}`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.id_token) {
        const decoded: UserData = jwtDecode(data.id_token);
        dispatch(saveUserData(decoded));
        dispatch(userLogin(true));
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('id_token', data.id_token);
        localStorage.setItem('expires_in', data.expires_in);

        dispatch(setUserData(decoded));

        //TODO probably need to move into middleware. RxJS combineLatest?
        userApi
          .get(decoded['cognito:username'])
          .then((res) => {
            dispatch(
              updateProfileInformation(
                handleProfileInfoResponse(res as ProfileResponse),
              ),
            );
            dispatch(
              profileAvatarChanged(
                handleProfileInfoResponse(res as ProfileResponse),
              ),
            );
            dispatch(
              updateProfileFundraising(
                handleProfileInfoResponse(res as ProfileResponse),
              ),
            );
          })
          .catch(() => null);
      }
    })
    .catch(() => history.push('/error'))
    .finally(() => history.push('/'));

  return (
    <Panel>
      <Text>Redirecting...</Text>
    </Panel>
  );
};
