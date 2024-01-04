import {
  FlexRow,
  Button,
  Badge,
  Text,
  LinkButton,
  StatusIndicator,
  Panel,
} from '@epam/uui';
import { FlexCell, FlexSpacer } from '@epam/uui-components';
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
          <FlexRow cx={styles.sectionHeadline}>
            <h3>How it works:</h3>
          </FlexRow>
          {/* TODO: VERTICAL ALIGN */}
          <FlexCell>
            {mockBlocks.map((block, index) => (
              <FlexRow key={block.id} cx={styles.blockWrapper}>
                <Panel cx={styles.block}>
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
                </Panel>
              </FlexRow>
            ))}
          </FlexCell>
          <FlexRow />
        </FlexCell>
      </FlexRow>
      {/* Current tenders */}
      <FlexRow cx={styles.sectionAlignment}>
        <FlexCell width="100%">
          <FlexRow cx={styles.sectionHeadline}>
            <h3>Current tenders</h3>
            <LinkButton
              caption="View all tenders"
              link={{ pathname: '/' }}
              size="42"
            />
          </FlexRow>
          <Panel cx={styles.sectionContentWrapper}>
            {tenders.map((tender) => (
              <FlexCell key={tender.id} cx={styles.tenderCard}>
                <FlexRow cx={styles.meta}>
                  <FlexCell grow={1} textAlign="left">
                    <FlexRow cx={styles.firstRow}>
                      {tender.tags.map((tag) => (
                        <Badge
                          key={tag}
                          color="neutral"
                          fill="solid"
                          caption={tag}
                          size="18"
                          cx={styles.tag}
                        />
                      ))}
                      <FlexRow cx={styles.location}>
                        <GeoLocationIcon />
                        {tender.location}
                      </FlexRow>
                    </FlexRow>
                    <FlexRow cx={styles.secondRow}>
                      <Text cx={styles.author}>
                        Posted by: <span>{tender.author}</span>
                      </Text>
                      <StatusIndicator
                        size="18"
                        caption=""
                        cx={styles.statusIndicator}
                      />
                      <Badge
                        size="24"
                        color="neutral"
                        fill="solid"
                        icon={AttachmentIcon}
                        caption={tender.attachments.length}
                      />
                      <StatusIndicator
                        size="18"
                        caption=""
                        cx={styles.statusIndicator}
                      />
                      <Text cx={styles.postedDate}>
                        Posted: <span>{tender.published}</span>
                      </Text>
                    </FlexRow>
                  </FlexCell>
                  <FlexCell grow={1} textAlign="right">
                    <FlexRow cx={styles.status}>
                      <StatusIndicator
                        size="18"
                        caption=""
                        cx={styles.statusIndicator}
                      />
                      Proposals {tender.status}
                    </FlexRow>
                    <FlexRow cx={styles.delivery}>
                      Expected delivery of work: <span>{tender.delivery}</span>
                    </FlexRow>
                  </FlexCell>
                </FlexRow>
                <FlexCell>
                  <Text cx={styles.tenderTitle}>{tender.title}</Text>
                  <Text cx={styles.description}>{tender.description}</Text>
                  {tender.status === 'Submission' && (
                    <Button
                      color="primary"
                      caption="Submit Proposal"
                      onClick={() => null}
                    />
                  )}
                </FlexCell>
                {/* TODO: Small proposals card component */}
                {tender.status === 'Voting' && (
                  <FlexCell cx={styles.submittedProposals}>
                    <FlexRow>
                      <h5 className={styles.proposalsTitle}>
                        Submitted proposals ({tender.proposals.length})
                      </h5>
                    </FlexRow>
                    <FlexRow>
                      {tender.proposals.slice(0, 2).map((proposal) => (
                        <FlexRow
                          key={proposal.id}
                          cx={styles.smallProposalCard}
                        >
                          <img src={`images/${proposal.thumbnail}_small.png`} />
                          <FlexCell grow={1} cx={styles.proposalInfo}>
                            <FlexRow cx={styles.proposalLikes}>
                              <ThumbUpIcon />
                              {proposal.likes}
                            </FlexRow>
                            <LinkButton
                              caption={proposal.title}
                              link={{ pathname: '/' }}
                              size="42"
                            />
                            <Text cx={styles.proposalAuthorTitle}>Author:</Text>
                            {proposal.authors.map((author) => (
                              <FlexCell
                                key={author.id}
                                cx={styles.proposalAuthorInfo}
                              >
                                {proposal.authors.length === 1 && (
                                  <img
                                    className={styles.proposalAuthorPic}
                                    src={`images/${author.authorPic}`}
                                  />
                                )}
                                <FlexCell
                                  width="auto"
                                  cx={styles.proposalAuthorData}
                                >
                                  <Text cx={styles.proposalAuthorName}>
                                    {author.authorName}
                                  </Text>
                                  {proposal.authors.length === 1 && (
                                    <Text cx={styles.proposalAuthorRole}>
                                      {author.authorRole}
                                    </Text>
                                  )}
                                </FlexCell>
                                <FlexCell
                                  width="auto"
                                  cx={styles.proposalAuthorSocials}
                                >
                                  <LinkedInIcon />
                                  <EmailIcon />
                                </FlexCell>
                              </FlexCell>
                            ))}
                          </FlexCell>
                        </FlexRow>
                      ))}
                    </FlexRow>
                  </FlexCell>
                )}
                {tender.proposals.length > 2 && (
                  <FlexRow>
                    <FlexSpacer />
                    <LinkButton
                      caption="MORE PROPOSALS"
                      link={{ pathname: '/' }}
                      size="42"
                    />
                    <FlexSpacer />
                  </FlexRow>
                )}
              </FlexCell>
            ))}
          </Panel>
        </FlexCell>
      </FlexRow>
      {/* Current proposals */}
      <FlexRow cx={styles.sectionAlignment}>
        <FlexCell width="100%">
          <FlexRow cx={styles.sectionHeadline}>
            <h3>Current proposals</h3>
            <LinkButton
              caption="View all proposals"
              link={{ pathname: '/' }}
              size="42"
            />
          </FlexRow>
          <Panel cx={styles.sectionContentWrapper}>
            {tenders.map((tender) =>
              tender.proposals.slice(0, 3).map((proposal) => (
                <FlexCell key={proposal.id} cx={styles.bigProposalCard}>
                  <img
                    className={styles.bigProposalCardThumb}
                    src={`images/${proposal.thumbnail}_big.png`}
                  />
                  <Panel cx={styles.bigProposalCardContent}>
                    <FlexRow cx={styles.meta}>
                      <FlexCell grow={1} textAlign="left">
                        <FlexRow cx={styles.firstRow}>
                          <Text cx={styles.postedDate}>
                            Submitted: <span>{proposal.published}</span>
                          </Text>
                        </FlexRow>
                        <FlexRow cx={styles.secondRow}>
                          <Text cx={styles.related}>
                            Related to tender:
                            <LinkButton
                              caption={tender.title}
                              link={{ pathname: '/' }}
                              size="42"
                            />
                          </Text>
                        </FlexRow>
                      </FlexCell>
                      <FlexCell grow={1} textAlign="right">
                        <FlexRow cx={styles.status}>
                          <StatusIndicator
                            size="18"
                            caption=""
                            cx={styles.statusIndicator}
                          />
                          {proposal.status}
                        </FlexRow>
                      </FlexCell>
                    </FlexRow>
                    <FlexRow cx={styles.thirdRow}>
                      <FlexCell
                        cx={styles.proposalCardTitleWrapper}
                        width="100%"
                      >
                        <Text cx={styles.tenderTitle}>{proposal.title}</Text>
                        {proposal.selected && (
                          <Badge
                            icon={MedalIcon}
                            color="success"
                            fill="outline"
                            caption="Winner"
                            size="18"
                          />
                        )}
                      </FlexCell>
                      <Text
                        cx={`${styles.proposalLikes} ${
                          proposal.liked && styles.liked
                        }`}
                      >
                        <ThumbUpIcon />
                        {proposal.likes}
                      </Text>
                    </FlexRow>
                    <Text cx={styles.description}>{proposal.description}</Text>
                    <Text cx={styles.proposalAuthorTitle}>Author:</Text>
                    <FlexCell cx={styles.bigCardProposalAuthorWrapper}>
                      {proposal.authors.map((author) => (
                        <FlexCell
                          key={author.id}
                          cx={styles.proposalAuthorInfo}
                          width="auto"
                        >
                          <img
                            className={styles.proposalAuthorPic}
                            src={`images/${author.authorPic}`}
                          />

                          <FlexCell width="auto" cx={styles.proposalAuthorData}>
                            <Text cx={styles.proposalAuthorName}>
                              {author.authorName}
                            </Text>

                            <Text cx={styles.proposalAuthorRole}>
                              {author.authorRole}
                            </Text>
                          </FlexCell>
                          <FlexCell
                            width="auto"
                            cx={styles.proposalAuthorSocials}
                          >
                            <LinkedInIcon />
                            <EmailIcon />
                          </FlexCell>
                        </FlexCell>
                      ))}
                    </FlexCell>
                    <FlexCell cx={styles.proposalCtas}>
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
                    </FlexCell>
                  </Panel>
                </FlexCell>
              )),
            )}
          </Panel>
        </FlexCell>
      </FlexRow>
    </>
  );
};
