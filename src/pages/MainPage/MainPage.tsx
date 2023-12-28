import { FlexRow, Button, Text } from '@epam/uui';
import { FlexCell } from '@epam/uui-components';
import styles from './MainPage.module.scss';
import { mockBlocks } from './mocks/mockBlocks';
import { tenders } from './mocks/mockTenders';
import { ReactComponent as GeoLocationIcon } from '@epam/assets/icons/common/communication-geo_tag-18.svg';
import { ReactComponent as AttachmentIcon } from '@epam/assets/icons/common/file-attachment-18.svg';
import { ReactComponent as ThumbUpIcon } from '@epam/assets/icons/common/social-thumb-up-12.svg';
import { ReactComponent as LinkedInIcon } from '@epam/assets/icons/common/linkedin-18.svg';
import { ReactComponent as EmailIcon } from '@epam/assets/icons/common/communication-mail-18.svg';

export const MainPage = () => {
  return (
    <>
      {/* Header section */}
      {/* TODO: ADD IMAGE */}
      <FlexRow>
        <FlexCell
          width="100%"
          style={{ background: '#D9E2FC', padding: '0 120px' }}
        >
          <FlexRow>
            <p className={styles.title}>Welcome to Artograd!</p>
          </FlexRow>
          <FlexRow>
            <p className={styles.subtitle}>
              The largest community of creators. <br />
              Be the one who changes the world around.
            </p>
          </FlexRow>
          <FlexRow>
            <div className={styles.cta}>
              <Button
                color="primary"
                caption="Join Creators Community"
                onClick={() => null}
              />
            </div>
          </FlexRow>
        </FlexCell>
      </FlexRow>
      {/* How it works section */}
      <FlexRow>
        <FlexCell width="100%" style={{ padding: '0 120px' }}>
          <FlexRow>
            <Text fontSize="24" lineHeight="30" color="brand">
              How it works:
            </Text>
          </FlexRow>
          <FlexRow />
          {/* TODO: ALIGN */}
          {mockBlocks.map((block, index) => (
            <div className={styles.block}>
              <FlexRow>
                <p className={styles.blockNumber}>
                  {(index + 1).toString().padStart(2, '0')}.
                </p>
              </FlexRow>
              <FlexRow>
                <p className={styles.blockTitle}>{block.title}</p>
              </FlexRow>
              <FlexRow>
                <p className={styles.blockDescription}>{block.description}</p>
              </FlexRow>
            </div>
          ))}
          <FlexRow />
        </FlexCell>
      </FlexRow>
      {/* Current tenders */}
      {/* TODO: ADD CURRENT TENDERS TITLE */}
      {/* TODO: ADD CURRENT TENDERS LINK */}
      <FlexRow>
        <FlexCell width="100%" style={{ padding: '0 120px' }}>
          <div className={styles.wrapper}>
            {tenders.map((tender) => (
              <div className={styles.tenderCard}>
                <div className={styles.meta}>
                  <div className={styles.leftColumn}>
                    <div className={styles.firstRow}>
                      {tender.tags.map((tag) => (
                        <span className={styles.tag}>{tag}</span>
                      ))}
                      <div className={styles.verticalDivider} />
                      <div className={styles.location}>
                        <GeoLocationIcon />
                        {tender.location}
                      </div>
                    </div>
                    <div className={styles.secondRow}>
                      <div className={styles.author}>
                        Posted by: <span>{tender.author}</span>
                      </div>
                      {/* TODO: make dot as a separated reusable component */}
                      <div className={styles.dot} />
                      <div className={styles.attachments}>
                        <AttachmentIcon />
                        <span>3</span>
                      </div>
                      <div className={styles.dot} />
                      <div className={styles.postedDate}>
                        Posted: <span>{tender.published}</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.rightColumn}>
                    <div className={styles.status}>
                      <div className={styles.dot} />
                      Proposals {tender.status}
                    </div>
                    <div className={styles.delivery}>
                      Expected delivery of work: <span>{tender.delivery}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className={styles.tenderTitle}>{tender.title}</p>
                  <p className={styles.description}>{tender.description}</p>
                  {tender.status === 'Submission' && (
                    <Button
                      color="primary"
                      caption="Submit Proposal"
                      onClick={() => null}
                    />
                  )}
                </div>
                {/* TODO: Small proposals */}
                {tender.status === 'Voting' && (
                  <div className={styles.submittedProposals}>
                    <p className={styles.proposalsTitle}>
                      Submitted proposals ({tender.proposals.length})
                    </p>
                    <div className={styles.proposals}>
                      {tender.proposals.slice(0, 2).map((proposal) => (
                        <div className={styles.smallProposalCard}>
                          <img src={`images/${proposal.thumbnail}`} />
                          <div className={styles.proposalInfo}>
                            <div className={styles.proposalLikes}>
                              <ThumbUpIcon />
                              {proposal.likes}
                            </div>
                            <div className={styles.proposalLink}>
                              {proposal.title}
                            </div>
                            <p className={styles.proposalAuthorTitle}>
                              Author:
                            </p>
                            <div className={styles.proposalAuthorInfo}>
                              <img
                                className={styles.proposalAuthorPic}
                                src={`images/${proposal.authorPic}`}
                              />
                              <div className={styles.proposalAuthorData}>
                                <p className={styles.proposalAuthorName}>
                                  {proposal.authorName}
                                </p>
                                <p className={styles.proposalAuthorRole}>
                                  {proposal.authorRole}
                                </p>
                              </div>
                              <div className={styles.proposalAuthorSocials}>
                                <LinkedInIcon />
                                <EmailIcon />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* TODO: MORE PROPOSALS LINK */}
              </div>
            ))}
          </div>
        </FlexCell>
      </FlexRow>
      {/* TODO: CURRENT PROPOSALS SECTION */}
    </>
  );
};
