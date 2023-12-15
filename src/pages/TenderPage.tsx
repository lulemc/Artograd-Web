// TenderPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import TenderComponent from './components/TenderComponent';
import { mockTenders } from '../mocks/mockTenders';

const TenderPage: React.FC = () => {
    const { tenderId } = useParams<{ tenderId: string }>();
    const tender = mockTenders.find(t => t.id === parseInt(tenderId));

    return (
        <div>
            {tender ? <TenderComponent tender={tender} /> : <p>Tender not found</p>}
        </div>
    );
};

export default TenderPage;
