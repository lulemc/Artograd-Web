import React, { useState } from 'react';
import { FlexRow, Panel, Badge } from '@epam/uui';
import { TenderCard } from './components/TenderCard';
import { mockTenders } from '../mocks/mockTenders';
import { Tender } from '../model/Tender';

type StatusKey = 'gathering'| 'voting' | 'investing' | 'implementing' | 'done';

// Example usage
export const TendersList = () => {
  return (
    <div>
      {mockTenders.map((tender, index) => (
        <FlexRow key={index} vPadding="12" columnGap="12" >
          <div style={{width: '100%'}}>
            <TenderCard tender={tender} />
          </div>
        </FlexRow>
      ))}
    </div>
  );
};
export const TendersPage = () => {
  const [statusFilter, setStatusFilter] = useState({
    gathering: false,
    voting: false,
    investing: false,
    implementing: false,
    done: true,
  });
  
  const toggleStatus = (status: StatusKey) => {
    setStatusFilter({ ...statusFilter, [status]: !statusFilter[status] });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <Panel background="surface-main" margin="24" style={{ width: '80vw' }} shadow>
        <FlexRow padding="12" vPadding="12" columnGap="12">
	          <Badge color="info" fill={statusFilter.gathering ? "solid" : "outline"} caption="Gathering proposals" onClick={() => toggleStatus('gathering')} />
	          <Badge color="info" fill={statusFilter.voting ? "solid" : "outline"} caption="Voting for proposals" onClick={() => toggleStatus('voting')} />
	          <Badge color="info" fill={statusFilter.investing ? "solid" : "outline"} caption="Looking for investments" onClick={() => toggleStatus('investing')} />
	          <Badge color="info" fill={statusFilter.implementing ? "solid" : "outline"} caption="In implementation" onClick={() => toggleStatus('implementing')} />
	          <Badge color="info" fill={statusFilter.done ? "solid" : "outline"} caption="Completed" onClick={() => toggleStatus('done')} />
        </FlexRow>
        
        	<TendersList/>
        
      </Panel>
    </div>
  );
};




