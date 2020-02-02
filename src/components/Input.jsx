import React from 'react';
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const TEST = gql`
  {
    test @client
  }
`;

const CHANGE_TEST = gql`
  mutation ChangeTest($test: String) {
    changeTest(test: $test) @client
  }
`;
export default function Input() {
  const [changeTest] = useMutation(CHANGE_TEST);
  const { loading, error, data } = useQuery(TEST);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  let input;
  return (
    <div key={data.test}>
      <p>{data.test}</p>
      <form
        onSubmit={e => {
          e.preventDefault();
          changeTest({ variables: { test: input.value } });

          input.value = "";
        }}
      >
        <input ref={node => (input = node)} />
        <button type="submit">Update test</button>
      </form>
    </div>
  );
}
