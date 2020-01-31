import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const BOOKS = gql`
  {
    books {
      title
      author
    }
  }
`;

export default function App() {
  console.log(process.env.NODE_ENV);
  const { loading, error, data } = useQuery(BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);
  return data.books.map(({ title, author }) => (
    <div key={title}>
      <p>
        {title}: {author}
      </p>
    </div>
  ));
}
