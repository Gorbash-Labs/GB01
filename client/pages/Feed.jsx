import React, { useEffect, useState } from 'react';

function Feed() {
  const [feedState, setfeedState] = useState({});

  useEffect(() => {
    fetch('/api/post')
      .then((res) => res.json)
      .then((data) => console.log(data));
  }, []);

  return <div>Feed Page</div>;
}

export default Feed;
