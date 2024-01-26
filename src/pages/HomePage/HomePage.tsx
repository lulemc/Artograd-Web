import { FlexRow, FlexCell, Text, Panel, LinkButton, Button } from '@epam/uui';
import styles from './HomePage.module.scss';
import DragAndDropIcon from './assets/draganddrop.svg';
import EmptyIcon from './assets/empty.svg';
import LaptopIcon from './assets/laptop.svg';

export const HomePage = () => {
  const steps = [
    {
      title: 'Tenders for art project are created',
      description:
        'Tenders created to beautify the neighborhood through various art projects, which may span across multiple formats such as murals, installations, sculptural works, landscape art, and more.',
      linkText: undefined,
      linkUrl: undefined,
      icon: undefined,
      iconOnTop: false,
    },
    {
      title: 'Creators submit their proposals',
      description: `Creators are invited to submit their proposals for art projects based on the tenders released, sharing their concept, expected budget, timeframe, and how their work aims to enhance the neighborhood's aesthetics and culture.`,
      linkText: 'View open tenders',
      linkUrl: '/',
      icon: DragAndDropIcon,
      iconOnTop: true,
    },
    {
      title: 'You vote for submitted art projects proposals',
      description: `As a resident, you can vote for submitted art projects proposals considering their potential aesthetic impact and value addition to the community's culture, and the benefits they would bring to the neighborhood.`,
      linkText: 'Vote for proposed art projects',
      linkUrl: '/',
      icon: LaptopIcon,
      iconOnTop: false,
    },
    {
      title: 'Artists and creators start working on the project chosen',
      description: `Once the winning proposals are selected, creators and artists begin the implementation process. They bring their artistic vision to life, adhering to the project's budget and timeline, and working towards enhancing the neighborhood's aesthetic and cultural appeal.`,
      linkText: 'View and support art projects',
      linkUrl: '/',
      icon: EmptyIcon,
      iconOnTop: false,
    },
    {
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
      <Panel>
        <FlexRow>
          <FlexCell width="100%" cx={styles.steps}>
            <Text cx={styles.stepsTitle} fontWeight="700">
              How it works
            </Text>
            {steps.map((step, index) => (
              <FlexRow key={index} cx={styles.stepWrapper}>
                <Panel cx={styles.step}>
                  <FlexRow alignItems="bottom">
                    <FlexCell width="auto">
                      <h2 className={styles.stepNumber}>
                        {(index + 1).toString().padStart(2, '0')}.
                      </h2>
                      <Text cx={styles.stepTitle}>{step.title}</Text>
                    </FlexCell>
                    {step.iconOnTop && step.icon && (
                      <FlexCell width="auto">
                        <img src={step.icon} className={styles.stepIcon} />
                      </FlexCell>
                    )}
                  </FlexRow>
                  <Text cx={styles.stepDescription}>{step.description}</Text>
                  {((step.linkText && step.linkUrl) ||
                    (!step.iconOnTop && step.icon)) && (
                    <FlexRow alignItems="top">
                      {step.linkText && step.linkUrl && (
                        <FlexCell width="auto">
                          <LinkButton
                            caption={step.linkText}
                            link={{ pathname: step.linkUrl }}
                            size="42"
                            captionCX={styles.stepLink}
                          />
                        </FlexCell>
                      )}
                      {!step.iconOnTop && step.icon && (
                        <FlexCell width="auto">
                          <img src={step.icon} className={styles.stepIcon} />
                        </FlexCell>
                      )}
                    </FlexRow>
                  )}
                </Panel>
              </FlexRow>
            ))}
          </FlexCell>
        </FlexRow>
      </Panel>
    </>
  );
};
