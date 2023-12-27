export type Tender = {
  id: number;
  voting_end_date: string;
  proposals_end_date: string;
  impl_progress: number;
  donations_amount: number;
  city: string;
  shortDescription: string;
  fullDescription: string;
  status: 'gathering' | 'voting' | 'investing' | 'implementing' | 'done';
  budgetTotal: number;
  budgetGathered: number;
  coordinates: { lat: number; lng: number };
  open_date: string;
  expected_implementation_time: string;
  opened_by_org: string;
  category: string;
  attachments: string[]; // Assuming attachments are URLs or file names
};
