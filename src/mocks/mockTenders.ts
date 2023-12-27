import { Tender } from '../model/Tender';

export const mockTenders: Tender[] = [
  {
    id: 1,
    city: 'Budva',
    voting_end_date: '2023-12-15',
    proposals_end_date: '2023-12-10',
    donations_amount: 0,
    impl_progress: 0,
    shortDescription: 'Urban Art Project',
    fullDescription:
      'A large-scale mural project in the city center, involving local and international artists to transform the urban landscape.',
    status: 'voting',
    budgetTotal: 10000,
    budgetGathered: 5000,
    coordinates: { lat: 42.288056, lng: 18.8425 },
    open_date: '2022-01-15',
    expected_implementation_time: '6 months',
    opened_by_org: 'City Art Initiative',
    category: 'mural',
    attachments: ['mural1.jpg', 'mural2.jpg'],
  },
  {
    id: 2,
    city: 'Herceg Novi',
    donations_amount: 0,
    impl_progress: 0,
    voting_end_date: '2023-12-15',
    proposals_end_date: '2023-12-10',
    shortDescription: 'Sculpture Installation',
    fullDescription:
      'Modern sculptures are to be installed in the main park, enhancing its appeal and artistic value. The project aims to attract more visitors and promote local culture.',
    status: 'investing',
    budgetTotal: 15000,
    budgetGathered: 10500,
    coordinates: { lat: 42.453056, lng: 18.5375 },
    open_date: '2022-02-20',
    expected_implementation_time: '4 months',
    opened_by_org: 'Artistic Minds',
    category: 'sculpture',
    attachments: ['sculpture1.jpg', 'sculpture2.jpg'],
  },
  {
    id: 3,
    city: 'Budva',
    donations_amount: 0,
    voting_end_date: '2023-12-15',
    proposals_end_date: '2023-12-10',
    impl_progress: 10,
    shortDescription: 'Historical Monument Restoration',
    fullDescription:
      'This project focuses on the restoration of historical monuments in the old town, preserving the heritage and history for future generations.',
    status: 'implementing',
    budgetTotal: 20000,
    budgetGathered: 18000,
    coordinates: { lat: 42.288056, lng: 18.8425 },
    open_date: '2021-11-05',
    expected_implementation_time: '1 year',
    opened_by_org: 'Heritage Preservers',
    category: 'restoration',
    attachments: ['restoration1.jpg', 'restoration2.jpg'],
  },
  {
    id: 4,
    city: 'Herceg Novi',
    donations_amount: 7200,
    voting_end_date: '2023-12-15',
    proposals_end_date: '2023-12-10',
    shortDescription: 'Street Art Festival',
    impl_progress: 100,
    fullDescription:
      'The annual street art festival showcases works from local and international artists, turning the city into a vibrant canvas of creativity and color.',
    status: 'done',
    budgetTotal: 5000,
    budgetGathered: 5000,
    coordinates: { lat: 42.453056, lng: 18.5375 },
    open_date: '2022-03-12',
    expected_implementation_time: '2 weeks',
    opened_by_org: 'Festival of Colors',
    category: 'festival',
    attachments: ['festival1.jpg', 'festival2.jpg'],
  },
  {
    id: 5,
    city: 'Budva',
    donations_amount: 0,
    voting_end_date: '2023-12-15',
    proposals_end_date: '2023-12-10',
    shortDescription: 'Community Art Workshop',
    fullDescription:
      'Interactive workshops for community members of all ages to create public art, fostering creativity and community spirit.',
    status: 'gathering',
    impl_progress: 0,
    budgetTotal: 8000,
    budgetGathered: 4000,
    coordinates: { lat: 42.288056, lng: 18.8425 },
    open_date: '2022-04-18',
    expected_implementation_time: '3 months',
    opened_by_org: 'Creative Budva',
    category: 'workshop',
    attachments: ['workshop1.jpg', 'workshop2.jpg'],
  },
  {
    id: 6,
    city: 'Kotor',
    donations_amount: 0,
    voting_end_date: '2023-12-15',
    proposals_end_date: '2023-12-10',
    shortDescription: 'Interactive Street Mural',
    fullDescription:
      'An interactive mural project in the heart of Kotor, involving community participation to create a dynamic and engaging street art piece.',
    status: 'gathering',
    impl_progress: 0,
    budgetTotal: 12000,
    budgetGathered: 6000,
    coordinates: { lat: 42.424662, lng: 18.771234 },
    open_date: '2022-05-10',
    expected_implementation_time: '2 months',
    opened_by_org: 'Kotor Art Collective',
    category: 'mural',
    attachments: ['mural_kotor1.jpg', 'mural_kotor2.jpg'],
  },
  {
    id: 7,
    city: 'Tivat',
    donations_amount: 0,
    voting_end_date: '2023-12-15',
    proposals_end_date: '2023-12-10',
    shortDescription: 'Outdoor Sculpture Gallery',
    fullDescription:
      'A new outdoor sculpture gallery along the Tivat coastline, showcasing contemporary works by renowned national and international sculptors.',
    status: 'investing',
    impl_progress: 0,
    budgetTotal: 25000,
    budgetGathered: 15000,
    coordinates: { lat: 42.436975, lng: 18.696041 },
    open_date: '2022-06-15',
    expected_implementation_time: '5 months',
    opened_by_org: 'Tivat Art Space',
    category: 'sculpture',
    attachments: ['sculpture_tivat1.jpg', 'sculpture_tivat2.jpg'],
  },
  {
    id: 8,
    city: 'Podgorica',
    donations_amount: 0,
    voting_end_date: '2023-12-15',
    proposals_end_date: '2023-12-10',
    shortDescription: 'Cultural Heritage Exhibition',
    fullDescription:
      'An exhibition dedicated to the cultural heritage of Podgorica, featuring multimedia installations, art pieces, and historical artifacts.',
    status: 'implementing',
    impl_progress: 80,
    budgetTotal: 18000,
    budgetGathered: 12000,
    coordinates: { lat: 42.442574, lng: 19.262892 },
    open_date: '2021-12-01',
    expected_implementation_time: '8 months',
    opened_by_org: 'Podgorica Cultural Center',
    category: 'exhibition',
    attachments: ['exhibition_podgorica1.jpg', 'exhibition_podgorica2.jpg'],
  },
  {
    id: 9,
    city: 'Cetinje',
    donations_amount: 0,
    voting_end_date: '2024-01-15',
    proposals_end_date: '2023-12-10',
    shortDescription: 'Public Art Initiative',
    fullDescription:
      'A public art initiative in Cetinje, involving the creation of several large-scale installations across the city to boost cultural engagement.',
    status: 'voting',
    impl_progress: 0,
    budgetTotal: 9000,
    budgetGathered: 4500,
    coordinates: { lat: 42.386285, lng: 18.922759 },
    open_date: '2022-07-20',
    expected_implementation_time: '4 months',
    opened_by_org: 'Cetinje Art Council',
    category: 'installation',
    attachments: ['art_initiative_cetinje1.jpg', 'art_initiative_cetinje2.jpg'],
  },
  {
    id: 10,
    city: 'Bar',
    donations_amount: 0,
    voting_end_date: '2023-12-15',
    proposals_end_date: '2023-12-10',
    shortDescription: 'Historical Art Restoration',
    fullDescription:
      'A project focused on the restoration and preservation of historical artworks located in the city of Bar, including paintings and frescoes.',
    status: 'investing',
    impl_progress: 0,
    budgetTotal: 22000,
    budgetGathered: 11000,
    coordinates: { lat: 42.099377, lng: 19.104086 },
    open_date: '2022-03-05',
    expected_implementation_time: '1 year',
    opened_by_org: 'Bar Heritage Society',
    category: 'restoration',
    attachments: ['restoration_bar1.jpg', 'restoration_bar2.jpg'],
  },
];
