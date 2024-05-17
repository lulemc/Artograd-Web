import {
  Badge,
  Button,
  ControlGroup,
  FlexCell,
  FlexRow,
  FlexSpacer,
  InputAddon,
  Panel,
  PickerInput,
  SearchInput,
  Spinner,
  Text,
} from '@epam/uui';
import styles from './TendersPage.module.scss';
import EmptyFolderIcon from '../../images/emptyFolderIcon.svg';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { TenderCard } from '../../components/TenderCard/TenderCard';
import { useEffect, useState } from 'react';
import {
  CategoryItemType,
  CityItemType,
  Tender,
  TenderStatus,
} from '../../types';
import { useArrayDataSource } from '@epam/uui-core';
import { getCityList } from '../../requests';
import { useQuery } from '../../utils/useQuery';
import InfiniteScroll from 'react-infinite-scroll-component';
import { DeviceType, useMediaQuery } from '../../utils/useMediaQuery';
import { EmptyContent } from '../../components/EmptyContent/EmptyContent';
import { tendersApi } from '../../services/api/tendersApi';

enum Queries {
  location = 'locationLeafIds',
  status = 'statuses',
  search = 'title',
  owner = 'ownerId',
}

export const TendersPage = () => {
  const newQueryParams = new URLSearchParams();
  // hooks
  const history = useHistory();
  const { t } = useTranslation();
  const query = useQuery();
  const isMobile = useMediaQuery(DeviceType.mobile);

  // Local states
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [ownerId, setOwnerId] = useState('');
  const [tendersList, setTendersList] = useState<Tender[]>([]);
  const [searchValue, setSearchFilterValue] = useState<string>();
  const [listOfCities, setListOfCities] = useState<CityItemType[]>();
  const [statusFilterValue, setStatusFilterValue] = useState<
    CategoryItemType[]
  >([]);
  const [locationFilterValue, setLocationFilterValue] = useState<
    CityItemType[]
  >([]);

  const userRoles = useSelector(
    (state: RootState) => state?.identity?.userData['cognito:groups'],
  );
  const username = useSelector(
    (state: RootState) => state.identity.userData['cognito:username'],
  );

  const isOfficer = userRoles?.includes('Officials');
  const statusesList = Object.values(TenderStatus)
    .map((status, index) => ({
      id: index,
      name: status.toLowerCase(),
    }))
    .filter((status) => status.name !== TenderStatus.DELETED.toLowerCase());

  const statusesProvider = useArrayDataSource(
    {
      items: statusesList,
    },
    [],
  );

  const citiesProvider = useArrayDataSource(
    {
      items: listOfCities,
    },
    [],
  );

  const moveAttentionRequiredTender = (tenders: Tender[]) => {
    tenders.map((tender, index) => {
      if (
        tender.status.toLowerCase() === TenderStatus.SELECTION.toLowerCase()
      ) {
        tenders.splice(index, 1);
        tenders.splice(0, 0, tender);
      }
    });
    return tenders;
  };

  const loadMoreTenders = (pageNumber: number) => {
    setIsLoading(true);
    return tendersApi
      .get(
        pageNumber + 1,
        statusFilterValue,
        locationFilterValue,
        searchValue,
        ownerId,
      )
      .then((response) => {
        setTendersList(
          moveAttentionRequiredTender([...tendersList, ...response]),
        ),
          setPage(pageNumber + 1);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  const getTendersList = (pageNumber = 0) => {
    setIsLoading(true);
    return tendersApi
      .get(
        pageNumber,
        statusFilterValue,
        locationFilterValue,
        searchValue,
        ownerId,
      )
      .then((response) => setTendersList(moveAttentionRequiredTender(response)))
      .finally(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  };

  const getQueryAndSync = () => {
    const locationsQuery = query.get(Queries.location);
    const locationsArrayFromQuery = locationsQuery?.split(',');
    const statusesQuery = query.get(Queries.status);
    const statusesArrayFromQuery = statusesQuery?.split(',');
    const searchQuery = query.get(Queries.search);
    const ownerQuery = query.get(Queries.owner);
    const isStatusQueryEmpty = statusesArrayFromQuery?.[0] !== '';
    const isLocationQueryEmpty =
      listOfCities && locationsArrayFromQuery?.[0] !== '';
    const isSearchQueryEmpty = searchQuery && searchQuery?.length >= 1;
    const isOwnerQueryEmpty = ownerQuery && ownerQuery?.length >= 1;

    if (isStatusQueryEmpty) {
      const filtered = statusesArrayFromQuery?.map((status) => {
        return statusesList.find((statuses) => {
          return statuses.name === status.toLowerCase();
        });
      });
      setStatusFilterValue(filtered as CategoryItemType[]);
    }

    if (isLocationQueryEmpty) {
      const filtered = locationsArrayFromQuery?.map((location) => {
        return listOfCities?.find((locations: CityItemType) => {
          return locations?.id === location;
        });
      });

      setLocationFilterValue(filtered as CityItemType[]);
    }

    if (isSearchQueryEmpty) {
      setSearchFilterValue(searchQuery);
    }

    if (isOwnerQueryEmpty) {
      setOwnerId(ownerQuery);
    }

    if (
      isStatusQueryEmpty ||
      isLocationQueryEmpty ||
      isSearchQueryEmpty ||
      isOwnerQueryEmpty
    ) {
      getTendersList();
    }
  };

  useEffect(() => {
    setIsLoading(true);
    switch (true) {
      case locationFilterValue?.length >= 1:
        newQueryParams.set(
          Queries.location,
          locationFilterValue
            .map((item) => item.id)
            .join(decodeURIComponent('%2c')),
        );
        break;
      case statusFilterValue?.length >= 1:
        newQueryParams.set(
          Queries.status,
          statusFilterValue
            .map((item) => item.name.toUpperCase())
            .join(decodeURIComponent('%2c')),
        );
        break;
      case !!ownerId:
        newQueryParams.set(Queries.owner, ownerId);
        break;
      case statusFilterValue?.length === 0:
        newQueryParams.delete(Queries.status);
        break;
      case locationFilterValue?.length === 0:
        newQueryParams.delete(Queries.location);
        break;
    }
    if (searchValue) {
      newQueryParams.set(Queries.search, searchValue);
    }
    history.push({
      pathname: history.location.pathname,
      search: newQueryParams.toString(),
    });
    if (!isLoading) {
      getTendersList().then(() => setIsLoading(false));
    }
  }, [locationFilterValue, statusFilterValue, searchValue, ownerId]);

  useEffect(() => {
    getCityList()
      .then((response) => setListOfCities(response))
      .catch(() => {
        setListOfCities([]);
      });
  }, []);

  useEffect(() => {
    getQueryAndSync();
  }, [listOfCities]);

  const deleteTender = (tender: Tender) => {
    tendersApi
      .put(tender.id, { ...tender, status: TenderStatus.DELETED })
      .then(() => history.go(0));
  };

  return (
    <Panel cx={styles.wrapper}>
      <FlexRow>
        <FlexCell width="100%">
          <Text cx={styles.pageTitle}>
            {t('tendersPages.tenders.pageTitle')}
          </Text>
        </FlexCell>
        <FlexSpacer />
        <FlexCell width="100%">
          {tendersList?.length >= 1 && isOfficer && (
            <Button
              color="accent"
              caption={t('tendersPages.tenders.tendersCta')}
              onClick={() => history.push('/tenders/new')}
              rawProps={{ 'data-testid': `header-create-new-tender-cta` }}
              cx={styles.headerTendersCta}
            />
          )}
        </FlexCell>
      </FlexRow>
      <Panel cx={styles.contentWrapper}>
        <FlexRow cx={styles.filtersWrapper} alignItems="top">
          {isOfficer && (
            <FlexRow cx={styles.creatorFilter}>
              <Badge
                color={ownerId !== '' ? 'neutral' : 'info'}
                fill="solid"
                caption={t('tendersPages.tenders.allCta')}
                onClick={() => setOwnerId('')}
              />

              <Badge
                color={ownerId === '' ? 'neutral' : 'info'}
                fill="solid"
                caption={t('tendersPages.tenders.createdByMeCta')}
                onClick={() => setOwnerId(username)}
              />
            </FlexRow>
          )}
          <ControlGroup cx={styles.pickerInputHolder}>
            <FlexRow>
              <InputAddon
                content={t('tendersPages.tenders.statusFilterPrefix')}
                cx={styles.prefix}
              />
              <PickerInput
                dataSource={statusesProvider}
                value={statusFilterValue}
                onValueChange={setStatusFilterValue}
                entityName="Status filter"
                selectionMode="multi"
                valueType="entity"
                getName={(item) => t(`global.statuses.${item.name}`)}
                inputCx={styles.statusInput}
                placeholder={t('tendersPages.tenders.statusFilterPlaceholder')}
              />
            </FlexRow>
            <FlexRow>
              <InputAddon
                content={t('tendersPages.tenders.cityFilterPrefix')}
                cx={styles.prefix}
              />
              <PickerInput
                dataSource={citiesProvider}
                value={locationFilterValue}
                onValueChange={setLocationFilterValue}
                entityName="Cities filter"
                selectionMode="multi"
                valueType="entity"
                inputCx={styles.citiesInput}
                placeholder={t('tendersPages.tenders.cityFilterPlaceholder')}
                sorting={{ field: 'name', direction: 'asc' }}
              />
            </FlexRow>
          </ControlGroup>
          {!isMobile && <FlexSpacer />}
          <FlexCell width="auto" cx={styles.inputHolder}>
            <SearchInput
              value={searchValue}
              onValueChange={setSearchFilterValue}
              placeholder={t('tendersPages.tenders.searchInputPlaceholder')}
              debounceDelay={1000}
              cx={styles.searchField}
            />
          </FlexCell>
        </FlexRow>

        <InfiniteScroll
          dataLength={tendersList?.length}
          next={() => loadMoreTenders(page)}
          hasMore={tendersList?.length === (page + 1) * 10}
          loader={
            isLoading && (
              <FlexRow justifyContent="center">
                <Spinner />
              </FlexRow>
            )
          }
          endMessage={null}
        >
          {tendersList?.length >= 1 &&
            tendersList?.map((tender) => (
              <TenderCard
                key={tender.id}
                {...tender}
                onTenderDelete={() => deleteTender(tender)}
              />
            ))}
        </InfiniteScroll>
        {tendersList?.length === 0 && isOfficer && !isLoading && (
          <EmptyContent
            icon={EmptyFolderIcon}
            title={t('tendersPages.tenders.tendersTitle')}
            description={t('tendersPages.tenders.tendersDescription')}
            ctaText={t('tendersPages.tenders.tendersCta')}
            ctaOnClick={() => history.push('/tenders/new')}
          />
        )}
      </Panel>
    </Panel>
  );
};
