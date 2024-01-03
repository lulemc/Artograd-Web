import { FlexRow, Button, Badge, Text, LinkButton } from '@epam/uui';
import { FlexCell } from '@epam/uui-components';
import styles from './MainPage.module.scss';
import { mockBlocks } from './mocks/mockBlocks';
import { tenders } from './mocks/mockTenders';
import { ReactComponent as GeoLocationIcon } from '@epam/assets/icons/common/communication-geo_tag-18.svg';
import { ReactComponent as AttachmentIcon } from '@epam/assets/icons/common/file-attachment-18.svg';
import { ReactComponent as ThumbUpIcon } from '@epam/assets/icons/common/social-thumb-up-12.svg';
import { ReactComponent as LinkedInIcon } from '@epam/assets/icons/common/linkedin-18.svg';
import { ReactComponent as EmailIcon } from '@epam/assets/icons/common/communication-mail-18.svg';
import { ReactComponent as CheckmarkIcon } from '@epam/assets/icons/common/notification-done-18.svg';
import { ReactComponent as FollowIcon } from '@epam/assets/icons/common/content-bookmark-outline-18.svg';
import { ReactComponent as MedalIcon } from '@epam/assets/icons/common/medal-18.svg';
import { Header } from './components/Header/Header';

export const MainPage = () => {
  return (
    <>
      {/* TODO: ADD IMAGE */}
      <Header />
      {/* How it works section */}
      <FlexRow cx={styles.sectionAlignment}>
        <FlexCell width="100%">
          <FlexRow cx={styles.sectionHeading}>
            <h3>How it works:</h3>
          </FlexRow>
          {/* TODO: ALIGN */}
          <FlexCell>
            {mockBlocks.map((block, index) => (
              <FlexRow key={block.id} cx={styles.blockWrapper}>
                <div className={styles.block}>
                  <FlexRow>
                    <h2 className={styles.blockNumber}>
                      {(index + 1).toString().padStart(2, '0')}.
                    </h2>
                  </FlexRow>
                  <FlexRow>
                    <Text cx={styles.blockTitle}>{block.title}</Text>
                  </FlexRow>
                  <FlexRow>
                    <Text cx={styles.blockDescription}>
                      {block.description}
                    </Text>
                  </FlexRow>
                </div>
              </FlexRow>
            ))}
          </FlexCell>
          <FlexRow />
        </FlexCell>
      </FlexRow>
      {/* Current tenders */}
      <FlexRow cx={styles.sectionAlignment}>
        <FlexCell width="100%">
          <FlexRow cx={styles.sectionHeading}>
            <h3>Current tenders</h3>
            <LinkButton caption="View all tenders" link={{ pathname: '/' }} />
          </FlexRow>
          <div className={styles.wrapper}>
            {tenders.map((tender) => (
              <div key={tender.id} className={styles.tenderCard}>
                <div className={styles.meta}>
                  <div className={styles.leftColumn}>
                    <div className={styles.firstRow}>
                      {tender.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
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
                      <div
                        className={styles.dot}
                        style={{
                          backgroundColor:
                            tender.status === 'Submission'
                              ? '#0954A5'
                              : '#B114D1',
                        }}
                      />
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
                {/* TODO: Small proposals card component */}
                {tender.status === 'Voting' && (
                  <div className={styles.submittedProposals}>
                    <p className={styles.proposalsTitle}>
                      Submitted proposals ({tender.proposals.length})
                    </p>
                    <div className={styles.proposals}>
                      {tender.proposals.slice(0, 2).map((proposal) => (
                        <div
                          key={proposal.id}
                          className={styles.smallProposalCard}
                        >
                          <img src={`images/${proposal.thumbnail}_small.png`} />
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
                            {proposal.authors.map((author) => (
                              <div
                                key={author.id}
                                className={styles.proposalAuthorInfo}
                              >
                                {proposal.authors.length === 1 && (
                                  <img
                                    className={styles.proposalAuthorPic}
                                    src={`images/${author.authorPic}`}
                                  />
                                )}
                                <div className={styles.proposalAuthorData}>
                                  <p className={styles.proposalAuthorName}>
                                    {author.authorName}
                                  </p>
                                  {proposal.authors.length === 1 && (
                                    <p className={styles.proposalAuthorRole}>
                                      {author.authorRole}
                                    </p>
                                  )}
                                </div>
                                <div className={styles.proposalAuthorSocials}>
                                  <LinkedInIcon />
                                  <EmailIcon />
                                </div>
                              </div>
                            ))}
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
      {/* Current proposals */}
      <FlexRow cx={styles.sectionAlignment}>
        <FlexCell width="100%">
          <div className={styles.sectionHeader}>
            <h3>Current proposals</h3>
            <a href="#">View all proposals</a>
          </div>
          <div className={styles.wrapper}>
            {tenders.map((tender) =>
              tender.proposals.slice(0, 3).map((proposal) => (
                <div key={proposal.id} className={styles.bigProposalCard}>
                  <img
                    className={styles.bigProposalCardThumb}
                    src={`images/${proposal.thumbnail}_big.png`}
                  />
                  <div
                    style={{ width: '100%', padding: '18px 24px 24px 24px' }}
                  >
                    <div className={styles.meta}>
                      <div className={styles.leftColumn}>
                        <div className={styles.firstRow}>
                          <div className={styles.postedDate}>
                            Submitted: <span>{proposal.published}</span>
                          </div>
                        </div>
                        <div className={styles.secondRow}>
                          <div className={styles.related}>
                            Related to tender: <span>{tender.title}</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.rightColumn}>
                        <div className={styles.status}>
                          <div
                            className={styles.dot}
                            style={{
                              backgroundColor:
                                proposal.status === 'Proposals Voting'
                                  ? '#B114D1'
                                  : proposal.status === 'Winner Selection'
                                  ? '#773CEC'
                                  : '#FDD63B',
                            }}
                          />
                          {proposal.status}
                        </div>
                      </div>
                    </div>
                    <div className={styles.thirdRow}>
                      <div className={styles.proposalCardTitleWrapper}>
                        <p className={styles.tenderTitle}>{proposal.title}</p>
                        {proposal.selected && (
                          <Badge
                            icon={MedalIcon}
                            color="success"
                            fill="outline"
                            caption="Winner"
                            size="18"
                          />
                        )}
                      </div>
                      <div
                        className={`${styles.proposalLikes} ${
                          proposal.liked && styles.liked
                        }`}
                      >
                        <ThumbUpIcon />
                        {proposal.likes}
                      </div>
                    </div>
                    <p className={styles.description}>{proposal.description}</p>
                    <p className={styles.proposalAuthorTitle}>Author:</p>
                    <div className={styles.bigCardProposalAuthorWrapper}>
                      {proposal.authors.map((author) => (
                        <div
                          key={author.id}
                          className={styles.proposalAuthorInfo}
                        >
                          <img
                            className={styles.proposalAuthorPic}
                            src={`images/${author.authorPic}`}
                          />

                          <div className={styles.proposalAuthorData}>
                            <p className={styles.proposalAuthorName}>
                              {author.authorName}
                            </p>

                            <p className={styles.proposalAuthorRole}>
                              {author.authorRole}
                            </p>
                          </div>
                          <div className={styles.proposalAuthorSocials}>
                            <LinkedInIcon />
                            <EmailIcon />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className={styles.proposalCtas}>
                      {proposal.status === 'Fundraising' && (
                        <Button
                          color="primary"
                          caption="Make investment"
                          onClick={() => null}
                        />
                      )}
                      {proposal.liked && (
                        <Button
                          color="primary"
                          fill="outline"
                          caption="Vote for Proposal"
                          icon={ThumbUpIcon}
                          onClick={() => null}
                        />
                      )}
                      {!proposal.liked && proposal.status !== 'Fundraising' && (
                        <Button
                          isDisabled
                          fill="outline"
                          color="primary"
                          caption="You voted"
                          icon={CheckmarkIcon}
                          onClick={() => null}
                        />
                      )}
                      <Button
                        icon={FollowIcon}
                        caption="Follow"
                        fill="ghost"
                        color="secondary"
                        onClick={() => null}
                      />
                    </div>
                  </div>
                </div>
              )),
            )}
          </div>
        </FlexCell>
      </FlexRow>
    </>
  );
};
