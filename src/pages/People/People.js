import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDebounce } from 'utils/useDebounce';
import { Container } from 'components/Container';
import Button from 'components/Button';
import {
  PageHeader,
  PageHeaderControl,
  PageHeaderHelpText,
  PageHeaderTitle,
} from 'components/PageHeader';
import PeopleTable from './PeopleTable';
import { useGetPeopleList } from 'api/hooks';
import LoadingLogo from 'components/LoadingLogo';
import { Card, CardBody } from 'components/Card';
import { Search, Searchbar } from 'components/Search';
import { ErrorMessage } from 'components/ErrorMessage';
import { formatPlural } from 'utils/format';
import { MutationError } from "./MutationError";

export function People() {
  const [recordsCount, setRecordsCount] = useState();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const { isLoading, isError, data, error } = useGetPeopleList(debouncedQuery);
  let history = useHistory();

  // We need a flag if we have immidiate data to diplay.
  // If we don't have any data at all, we show the page loader.
  // Otherwise we show the data we have at the moment.
  useEffect(() => {
    if (data !== undefined) {
      setRecordsCount(data.length);
    }
  }, [data]);

  function handleAddMember() {
    history.push('/add');
  }

  function handleSearch(event) {
    setQuery(event.target.value);
  }

  return (
    <Container>
      <PageHeader>
        <PageHeaderTitle>People</PageHeaderTitle>
        {recordsCount !== undefined && (
          <PageHeaderHelpText>
            {formatPlural(recordsCount, 'employee', 'employees')}
          </PageHeaderHelpText>
        )}
        <PageHeaderControl>
          <Button icon="user" onClick={handleAddMember} hasShadow>
            Add member
          </Button>
        </PageHeaderControl>
      </PageHeader>
      {recordsCount === undefined && isLoading && <LoadingLogo />}
      {isError && (
        <ErrorMessage code={error.message}>
          Something went wrong while loading data.
        </ErrorMessage>
      )}
      {recordsCount !== undefined && (
        <Card>
          <CardBody>
           <MutationError />
            <Searchbar>
              <Search
                placeholder="Search employees..."
                value={query}
                onChange={handleSearch}
                isLoading={isLoading && query.length > 0}
              />
            </Searchbar>
            <PeopleTable data={data} />
          </CardBody>
        </Card>
      )}
    </Container>
  );
}
