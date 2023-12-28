import React from 'react';
import {
  Panel,
  FlexRow,
  FlexCell,
  Text,
  Button,
  ProgressBar,
} from '@epam/electric';
import { Tender } from '../../model/Tender';

type TenderPageProps = {
  tender: Tender;
};

const TenderComponent: React.FC<TenderPageProps> = ({ tender }) => {
  return (
    <Panel shadow margin="24">
      <FlexRow alignItems="center">
        <FlexCell grow={1}>
          <Text size="36">{tender.shortDescription}</Text>
          <Text size="24">{tender.fullDescription}</Text>
          <Text size="18">Posted by: {tender.opened_by_org}</Text>
        </FlexCell>
        <FlexCell width="auto">
          <Button caption="Update Tender" />
          <Button caption="Assign Contractor" />
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
