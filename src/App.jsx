import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const AUTHORS = gql`
  {
    allAuthors{
      name
    }
  }
`;

export default function App() {
  console.log(process.env.NODE_ENV);
  const { loading, error, data } = useQuery(AUTHORS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);
  return data.allAuthors.map(( author ) => (
    <div key={author.id}>
      <p>
        {author.name}
      </p>
    </div>
  ));
}
