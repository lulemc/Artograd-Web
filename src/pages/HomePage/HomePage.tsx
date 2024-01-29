import { FlexRow, FlexCell, Text, Panel, Button } from '@epam/uui';
import styles from './HomePage.module.scss';
import DragAndDropIcon from './assets/draganddrop.svg';
import EmptyIcon from './assets/empty.svg';
import LaptopIcon from './assets/laptop.svg';
import { Step } from './components/Step/Step';

export const HomePage = () => {
  const steps = [
    {
      id: 1,
      title: 'Tenders for art project are created',
      description:
        'Tenders created to beautify the neighborhood through various art projects, which may span across multiple formats such as murals, installations, sculptural works, landscape art, and more.',
      linkText: undefined,
      linkUrl: undefined,
      icon: undefined,
      iconOnTop: false,
    },
    {
      id: 2,
      title: 'Creators submit their proposals',
      description: `Creators are invited to submit their proposals for art projects based on the tenders released, sharing their concept, expected budget, timeframe, and how their work aims to enhance the neighborhood's aesthetics and culture.`,
      linkText: 'View open tenders',
      linkUrl: '/',
      icon: DragAndDropIcon,
      iconOnTop: true,
    },
    {
      id: 3,
      title: 'You vote for submitted art projects proposals',
      description: `As a resident, you can vote for submitted art projects proposals considering their potential aesthetic impact and value addition to the community's culture, and the benefits they would bring to the neighborhood.`,
      linkText: 'Vote for proposed art projects',
      linkUrl: '/',
      icon: LaptopIcon,
      iconOnTop: false,
    },
    {
      id: 4,
      title: 'Artists and creators start working on the project chosen',
      description: `Once the winning proposals are selected, creators and artists begin the implementation process. They bring their artistic vision to life, adhering to the project's budget and timeline, and working towards enhancing the neighborhood's aesthetic and cultural appeal.`,
      linkText: 'View and support art projects',
      linkUrl: '/',
      icon: EmptyIcon,
      iconOnTop: false,
    },
    {
      id: 5,
      title: 'New art project in your city/ location',
      description:
        'A new art project is set to enliven our city. Everyone’s participation is welcomed in enhancing local aesthetics and convenience, and continuously contribute to the enrichment of our cityscape, either by submitting proposals or voting for their favorite projects.',
      linkText: undefined,
      linkUrl: undefined,
      icon: undefined,
      iconOnTop: false,
    },
  ];

  return (
    <>
      <Panel cx={styles.headerWrapper}>
        <FlexRow alignItems="center">
          <FlexCell width="100%" textAlign="center" alignSelf="center">
            <Text cx={styles.headerTitle} fontWeight="600">
              Welcome to Artograd
            </Text>
            <Text cx={styles.headerSubTitle} fontWeight="600">
              The largest community of creators and city residents. <br /> Be
              the one who changes the world around.
            </Text>
            <FlexRow cx={styles.headerCta}>
              <Button caption="Join Community" onClick={() => null} />
            </FlexRow>
          </FlexCell>
        </FlexRow>
      </Panel>

      <FlexCell width="100%" cx={styles.steps}>
        <Text cx={styles.stepsTitle} fontWeight="700">
          How it works
        </Text>
        <FlexRow cx={styles.stepsSection}>
          <FlexCell width="auto">
            {steps
              .filter((step) => step.id % 2 === 1)
              .map((step) => (
                <Step
                  key={step.id}
                  id={step.id}
                  title={step.title}
                  iconOnTop={step.iconOnTop}
                  icon={step.icon}
                  description={step.description}
                  linkUrl={step.linkUrl}
                  linkText={step.linkText}
                />
              ))}
          </FlexCell>
          <FlexCell width="auto">
            {steps
              .filter((step) => step.id % 2 === 0)
              .map((step) => (
                <Step
                  id={step.id}
                  title={step.title}
                  iconOnTop={step.iconOnTop}
                  icon={step.icon}
                  description={step.description}
                  linkUrl={step.linkUrl}
                  linkText={step.linkText}
                />
              ))}
          </FlexCell>
        </FlexRow>
      </FlexCell>
    </>
  );
};
