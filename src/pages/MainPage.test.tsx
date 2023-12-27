import { MainPage } from './MainPage';
import { renderWithContextAsync, screen } from '@epam/uui-test-utils';

describe('MainPage', () => {
  it('should render greetings', async () => {
    await renderWithContextAsync(<MainPage />);
    const greetingsDiv = screen.getByText('Welcome to Artograd!');
    expect(greetingsDiv).toBeDefined();
  });
});
