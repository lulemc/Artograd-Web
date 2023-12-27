import React from 'react';
import {
  Panel,
  FlexRow,
  FlexCell,
  Text,
  Button,
  ProgressBar,
} from '@epam/promo';
import { Tender } from '../../model/Tender';

type TenderPageProps = {
  tender: Tender;
};

const TenderComponent: React.FC<TenderPageProps> = ({ tender }) => {
  return (
    <Panel shadow margin="24">
      <FlexRow alignItems="center">
        <FlexCell grow={1}>
          <Text size="36" font="sans">
            {tender.shortDescription}
          </Text>
          <Text size="24" font="sans">
            {tender.fullDescription}
          </Text>
          <Text size="18" font="sans">
            Posted by: {tender.opened_by_org}
          </Text>
        </FlexCell>
        <FlexCell width="auto">
          <Button color="green" caption="Update Tender" />
          <Button color="blue" caption="Assign Contractor" />
        </FlexCell>
      </FlexRow>
      <FlexRow>
        {/* ... Other content based on the design ... */}
        {tender.status === 'investing' && (
          <ProgressBar
            progress={(tender.budgetGathered / tender.budgetTotal) * 100}
          />
        )}
        {/* Include other conditions for 'voting', 'implementing', 'done' */}
      </FlexRow>
      {/* Include other sections such as Tender Details, Proposal Author, etc. */}
    </Panel>
  );
};

export default TenderComponent;
