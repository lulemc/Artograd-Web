import { FlexRow, Button, Text } from '@epam/uui';
import { FlexCell } from '@epam/uui-components';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <FlexRow>
      <FlexCell width="100%" cx={styles.headerWrapper}>
        <FlexRow>
          <Text cx={styles.title}>Welcome to Artograd!</Text>
        </FlexRow>
        <FlexRow>
          <Text cx={styles.subtitle}>
            The largest community of creators. <br />
            Be the one who changes the world around.
          </Text>
        </FlexRow>
        <FlexRow>
          <Button
            cx={styles.cta}
            color="primary"
            caption="Join Creators Community"
            onClick={() => null}
          />
        </FlexRow>
      </FlexCell>
      {/* TODO: ADD PICTURE */}
    </FlexRow>
  );
};
