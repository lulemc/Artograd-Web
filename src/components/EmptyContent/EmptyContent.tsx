import { Button, FlexCell, FlexRow, Text } from '@epam/uui';
import styles from './EmptyContent.module.scss';

type EmptyContentProps = {
  icon: string;
  title: string;
  description: string;
  ctaText: string;
  ctaOnClick: () => void;
};

export const EmptyContent = ({
  icon,
  title,
  description,
  ctaText,
  ctaOnClick,
}: EmptyContentProps) => {
  return (
    <FlexRow>
      <FlexCell cx={styles.tenders} width="100%" textAlign="center">
        <img className={styles.icon} src={icon} />
        <Text cx={styles.tendersTitle}>{title}</Text>
        <Text cx={styles.tendersDescription}>{description}</Text>

        <Button
          color="accent"
          caption={ctaText}
          onClick={ctaOnClick}
          rawProps={{ 'data-testid': `content-create-new-tender-cta` }}
        />
      </FlexCell>
    </FlexRow>
  );
};
