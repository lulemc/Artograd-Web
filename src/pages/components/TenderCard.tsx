import React from 'react';
import {
  Panel,
  FlexRow,
  FlexCell,
  Text,
  Badge,
  Button,
  Dropdown,
  IconContainer,
  LinkButton,
} from '@epam/uui';
import { Tender } from '../../model/Tender';
import { ReactComponent as navigationDownIcon } from '@epam/assets/icons/common/navigation-chevron-down-18.svg';
import { ReactComponent as iconAttachment } from '@epam/assets/icons/common/file-attachment-18.svg';
import { ReactComponent as iconCity } from '@epam/assets/icons/common/communication-geo_tag-18.svg';
import { ReactComponent as radioPoint } from '@epam/assets/icons/common/radio-point-10.svg';

interface TenderCardProps {
  tender: Tender; // Use the Tender interface here
}

export const TenderCard: React.FC<TenderCardProps> = ({ tender }) => {
  const mapping = {
    gathering: 'Gathering proposals',
    voting: 'Voting for proposals',
    investing: 'Looking for investments',
    implementing: 'In implementation',
    done: 'Completed',
  };

  const TenderStatusContent: React.FC<TenderCardProps> = ({ tender }) => {
    let content;

    switch (tender.status) {
      case 'gathering':
        content = (
          <Text fontSize="14" lineHeight="18">
            Time to implement: {tender.expected_implementation_time}
          </Text>
        );
        break;
      case 'investing':
        // const progressValue = (tender.budgetGathered / tender.budgetTotal) * 100;
        //content = <ProgressBar cx={ css.bar } progress={progressValue} size="18" />
        content = (
          <Text fontSize="14" lineHeight="18">
            {tender.budgetTotal - tender.budgetGathered} remains.{' '}
          </Text>
        );
        break;
      case 'voting':
        content = (
          <Text fontSize="14" lineHeight="18">
            Voting ends on: {tender.voting_end_date}
          </Text>
        );
        break;
      case 'implementing':
        content = (
          <Text fontSize="14" lineHeight="18">
            Implementation progress: {tender.impl_progress}%
          </Text>
        );
        break;
      case 'done':
        content = (
          <Text fontSize="14" lineHeight="18">
            Total donations: {tender.donations_amount}
          </Text>
        );
        break;
      default:
        content = (
          <Text fontSize="14" lineHeight="18">
            Status not recognized
          </Text>
        );
    }

    return <FlexCell width="auto">{content}</FlexCell>;
  };

  return (
    <Panel shadow background="surface-main">
      <FlexRow spacing="12" vPadding="12" padding="12">
        <FlexCell width="auto">
          <Badge color="neutral" fill="solid" caption={tender.category} />
        </FlexCell>
        <FlexCell grow={1}>
          <FlexRow>
            <IconContainer icon={iconCity} style={{ fill: 'grey' }} />
            <Text fontSize="14" lineHeight="18">
              {tender.city}
            </Text>
          </FlexRow>
        </FlexCell>
        <FlexCell width="auto">
          <Badge
            color={tender.status === 'done' ? 'success' : 'info'}
            fill="outline"
            caption={mapping[tender.status]}
          />
        </FlexCell>
      </FlexRow>

      <FlexRow spacing="12" vPadding="12" padding="12">
        <FlexCell width="auto">
          <Text fontSize="14" lineHeight="18">
            Posted by: {tender.opened_by_org}
          </Text>
        </FlexCell>
        <FlexCell width="auto">
          <IconContainer icon={radioPoint} style={{ fill: 'grey' }} />
        </FlexCell>
        <FlexCell width="auto">
          <Dropdown
            renderBody={() => null}
            renderTarget={(props) => (
              <Badge
                {...props}
                dropdownIcon={navigationDownIcon}
                dropdownIconPosition="right"
                color="neutral"
                fill="solid"
                icon={iconAttachment}
                caption={tender.attachments.length}
              />
            )}
            placement="bottom-end"
          />
        </FlexCell>
        <FlexCell width="auto">
          <IconContainer icon={radioPoint} style={{ fill: 'grey' }} />
        </FlexCell>
        <FlexCell grow={1}>
          <Text fontSize="14" lineHeight="18">
            Posted: {tender.open_date}
          </Text>
        </FlexCell>
        <FlexCell width="auto">
          <TenderStatusContent tender={tender} />
        </FlexCell>
      </FlexRow>

      <FlexRow spacing="12" padding="12">
        <FlexCell grow={1}>
          <LinkButton
            href={'/object/' + tender.id}
            size="48"
            caption={tender.shortDescription}
          ></LinkButton>
          <Text>{tender.fullDescription}</Text>
        </FlexCell>
      </FlexRow>
      <FlexRow spacing="12" vPadding="12" padding="12">
        <Button color="primary" caption="Submit Proposal" />
      </FlexRow>
    </Panel>
  );
};
