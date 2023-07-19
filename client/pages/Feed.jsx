import React, { useEffect, useState } from 'react';

function Feed() {
  const [feedState, setfeedState] = useState({});

  useEffect(() => {
    fetch('/api/post')
      .then((res) => res.json)
      .then((data) => console.log(data));
  }, []);

  return (
    <div className="wrapper">
      <div>
        Feed Page
      </div>
    </div>
  )
}

export default Feed;
