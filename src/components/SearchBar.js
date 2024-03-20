
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function SearchBar({ search }) {
  const handleSearch = (e) => {
    search(e.target.value);
  };

  return (
    <div className='searchBar'>
      <div className="searchContainer">
        <FontAwesomeIcon className="icon" icon={faSearch} />
        <input 
          type='text'
          placeholder='Search for a country'
          onChange={handleSearch}
        />
      </div>
    </div>
  );
}

export default SearchBar;
