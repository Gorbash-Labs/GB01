import React, { useRef } from 'react';
import { Button, TextField } from '@mui/material';

export default function SearchBar(props) {
  const query = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    const queryVal = query.current.value;

    fetch('/api/tech/search', {
      method: POST,
      body: JSON.stringify({
        searchString: queryVal,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <TextField
        className="search-bar"
        label="Search apis"
        variant="outlined"
        placeholder="Search for Api..."
        required={true}
        inputRef={query}
      />
      <Button className="searchBtn" variant="outlined" type="submit">
        Search
      </Button>
    </form>
  );
}

// export default class SearchContainer extends Component {
//   state = {
//     searchString: ''
//   }

//   fetchNames = (query) => {

//     fetch ('/api/tech/search')
//       .then((res) => res.json())
//       .then((data)=> {
//         this.setState({
//           searchString: data
//         })
//       })
//   }

// }
//use onChange
//handle onChange
//then need to prop drill
//searchString
//then use an useEffect after receviing postman, IF IT exists

// export default function searchBar () {
//   return  (
//     <input type='text' placeholder='Submit your search here...'></input>
//   )
// }
