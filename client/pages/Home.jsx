import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar.jsx';
import '../styles/Home.scss';
import { HomeHeaderContainer } from '../containers/HomeHeaderContainer.jsx';
import { HomeApiContainer } from '../containers/HomeApiContainer.jsx';

export const Home = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/tech', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        const newData = JSON.parse(JSON.stringify(data));
        setApiData(newData);
      } catch (err) {
        return err;
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <HomeHeaderContainer />
      <HomeApiContainer apiData={apiData} setApiData={setApiData} />
    </div>
  );
};

// const mockData = [
//   {
//     header: 'Google Maps API',
//     link: 'https://developers.google.com/maps/documentation/javascript/overview',
//     paragraph:
//       'Google Maps API allows you to embed maps into your website or application and customize them to fit your needs.',
//     image: 'https://i.ibb.co/jzvCsB1/Screenshot-2023-07-16-at-3-17-57-PM.png',
//   },
//   {
//     header: 'Google Maps API',
//     link: 'https://developers.google.com/maps/documentation/javascript/overview',
//     paragraph:
//       'Google Maps API allows you to embed maps into your website or application and customize them to fit your needs.',
//     image: 'https://i.ibb.co/jzvCsB1/Screenshot-2023-07-16-at-3-17-57-PM.png',
//   },
//   {
//     header: 'Google Maps API',
//     link: 'https://developers.google.com/maps/documentation/javascript/overview',
//     paragraph:
//       'Google Maps API allows you to embed maps into your website or application and customize them to fit your needs.',
//     image: 'https://i.ibb.co/jzvCsB1/Screenshot-2023-07-16-at-3-17-57-PM.png',
//   },
//   {
//     header: 'Google Maps API',
//     link: 'https://developers.google.com/maps/documentation/javascript/overview',
//     paragraph:
//       'Google Maps API allows you to embed maps into your website or application and customize them to fit your needs.',
//     image: 'https://i.ibb.co/jzvCsB1/Screenshot-2023-07-16-at-3-17-57-PM.png',
//   },
//   {
//     header: 'Google Maps API',
//     link: 'https://developers.google.com/maps/documentation/javascript/overview',
//     paragraph:
//       'Google Maps API allows you to embed maps into your website or application and customize them to fit your needs.',
//     image: 'https://i.ibb.co/jzvCsB1/Screenshot-2023-07-16-at-3-17-57-PM.png',
//   },
//   {
//     header: 'Google Maps API',
//     link: 'https://developers.google.com/maps/documentation/javascript/overview',
//     paragraph:
//       'Google Maps API allows you to embed maps into your website or application and customize them to fit your needs.',
//     image: 'https://i.ibb.co/jzvCsB1/Screenshot-2023-07-16-at-3-17-57-PM.png',
//   },
//   {
//     header: 'Google Maps API',
//     link: 'https://developers.google.com/maps/documentation/javascript/overview',
//     paragraph:
//       'Google Maps API allows you to embed maps into your website or application and customize them to fit your needs.',
//     image: 'https://i.ibb.co/jzvCsB1/Screenshot-2023-07-16-at-3-17-57-PM.png',
//   },
//   {
//     header: 'Google Maps API',
//     link: 'https://developers.google.com/maps/documentation/javascript/overview',
//     paragraph:
//       'Google Maps API allows you to embed maps into your website or application and customize them to fit your needs.',
//     image: 'https://i.ibb.co/jzvCsB1/Screenshot-2023-07-16-at-3-17-57-PM.png',
//   },
// ];
