import React, { useRef, useContext, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { OverlayDispatchContext, OverlayFormContext } from '../pages/Home.jsx';

export default function SearchBar(props) {
  const query = useRef();
  const dispatch = useContext(OverlayDispatchContext);
  const handleSearch = async (e) => {
    // const dispatch = useContext(OverlayDispatchContext); // you may need to import the context
    // which may mean we want the contexts to be in a separate file to import in home as well

    e.preventDefault();
    let queryVal = query.current.value;
    queryVal = queryVal.replace(/\s/g, '+');
    console.log('queryVal', queryVal);
    // fetch(`/api/tech/search/?keywords=${queryVal}`,
    const fetchData = await fetch(`/api/tech/search/?keywords=${queryVal}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (fetchData.status !== 200) {
      return 'This was an error in the fetch';
    }
    const data = await fetchData.json();
    console.log('data', data);

    // subscribe the search bar to the dispatch context from the home
    dispatch({ type: 'NEW_DATA', payload: data });

    // console.log('data', data);
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
