import { testWrapper } from '../../../utils/testWrapper';
import { TeamPage } from '../TeamPage';
import { createMemoryHistory } from 'history';

describe('Team page', () => {
  const history = createMemoryHistory();
  test('Should create the team page', async () => {
    const component = await testWrapper({
      component: <TeamPage />,
      history,
    });

    expect(component).toMatchSnapshot();
  });
});
