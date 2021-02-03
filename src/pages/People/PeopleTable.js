import React from 'react';
import { Link } from 'components/Link';
import { Table, TableCell, TableRow, TableThCell } from 'components/Table';
import { formatCurrency, formatJobTitle } from 'utils/format';
import Text from 'components/Text';
import { usePrefetchPerson } from 'api/hooks';

function PeopleTable({ data }) {
  const prefetchPerson = usePrefetchPerson();

  return (
    <Table>
      <thead>
        <TableRow>
          <TableThCell>Name</TableThCell>
          <TableThCell>Type</TableThCell>
          <TableThCell>Country</TableThCell>
          <TableThCell align="right">Salary</TableThCell>
          <TableThCell width="120" />
        </TableRow>
      </thead>
      <tbody>
        {data.map((person) => (
          <TableRow key={person.id || 0}>
            <TableCell>
              <Text size="bodySmallBold">{person.name}</Text>
            </TableCell>
            <TableCell>
              {formatJobTitle(person.jobTitle, person.employment)}
            </TableCell>
            <TableCell>{person.country}</TableCell>
            <TableCell align="right">
              {formatCurrency(person.salary, person.currency)}
            </TableCell>
            <TableCell
              align="right"
              onMouseEnter={() => prefetchPerson(person.id)}
              onFocus={() => prefetchPerson(person.id)}
            >
              {person.id ? <Link to={`/edit/${person.id}`}>Edit</Link> : 'Edit'}
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
}

// Bail out of re-rendering while waiting for the search results to be loaded from API.
// Show the previous result instead.
function memoLoading(Component) {
  return React.memo(Component, (_, props) => props.data === undefined);
}

export default memoLoading(PeopleTable);
