import { Panel, FlexRow, Button } from '@epam/uui';
import { FlexCell } from '@epam/uui-components';
import styles from './MainPage.module.scss';

export const MainPage = () => {
  return (
    <Panel>
      <FlexRow>
        <FlexCell
          width="100%"
          grow={2}
          style={{ background: '#D9E2FC', padding: '0 120px' }}
        >
          <FlexRow>
            <p className={styles.title}>Welcome to Artograd!</p>
          </FlexRow>
          <FlexRow>
            <p className={styles.subtitle}>
              The largest community of creators. <br />
              Be the one who changes the world around.
            </p>
          </FlexRow>
          <FlexRow>
            <div className={styles.cta}>
              <Button
                color="primary"
                caption="Join Creators Community"
                onClick={() => null}
              />
            </div>
          </FlexRow>
        </FlexCell>
        {/* <FlexCell width="auto" grow={2}>
          <FlexRow padding="24">
            <Text fontSize="24" lineHeight="30" color="brand">
              How it works:
            </Text>
          </FlexRow>
          <FlexRow />
          <FlexRow>
            <Text fontSize="24" lineHeight="30" color="brand">
              1.
            </Text>
          </FlexRow>
          <FlexRow>
            <Text fontSize="18" lineHeight="18" color="brand">
              State officer opens tender for a street art object.
            </Text>
          </FlexRow>
          <FlexRow />
          <FlexRow padding="24">
            <Text fontSize="24" lineHeight="30" color="brand">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.
            </Text>
          </FlexRow>
          <FlexRow padding="24">
            <Text fontSize="18" lineHeight="18" color="brand">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Creative people
              submit their ideas and everyone around can vote for the liked
              ones.
            </Text>
          </FlexRow>
          <FlexRow />
          <FlexRow>
            <Text fontSize="24" lineHeight="30" color="brand">
              3.
            </Text>
          </FlexRow>
          <FlexRow>
            <Text fontSize="18" lineHeight="18" color="brand">
              Investors fund implementation of the winner's idea
            </Text>
          </FlexRow>
          <FlexRow />
          <FlexRow padding="24">
            <Text fontSize="24" lineHeight="30" color="brand">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.
            </Text>
          </FlexRow>
          <FlexRow padding="24">
            <Text fontSize="18" lineHeight="18" color="brand">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Winner and
              investors get profit from tourists' and citizens' donations.
            </Text>
          </FlexRow>
        </FlexCell> */}
      </FlexRow>
    </Panel>
  );
};
