import PropTypes from 'prop-types';
import { ReactComponent as IconSearch } from 'theme/icons/search.svg';
import { SearchStyled, SearchInput } from './styles';
import { Spinner } from 'components/Spinner';

export function Search({ onKeyDown, isLoading = false, ...props }) {
  function handleKeyDown(event) {
    if (typeof onKeyDown === 'function') onKeyDown(event);
    if (event.key === 'Escape') {
      event.target.value = '';
      props.onChange(event);
    }
  }

  const searchProps = {
    onKeyDown: handleKeyDown,
    spellcheck: false,
    ...props,
  };

  return (
    <SearchStyled role="search">
      {isLoading ? <Spinner variant="secondary" /> : <IconSearch />}
      <SearchInput {...searchProps} />
    </SearchStyled>
  );
}

Search.propTypes = {
  /** Display loading state */
  isLoading: PropTypes.bool,
};
