import React, {useState} from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_AUTHORS = gql`
  query getAuthorByName($name: String) {
    authorByName(name: $name) {
      name
      married
      id
    }
  }
`;

const ADD_AUTHOR = gql`
  mutation addAuthor($name: String, $id: Int, $married: Boolean) {
    addAuthor(name: $name, id: $id, married: $married){
        name
    }
  }
`;

const AddAuthor = () => {
    const [addAuthor] = useMutation(ADD_AUTHOR);
    // console.log(addAuthor);
    // addAuthor({variables: {name: "test", id: 5, married: false}})
    let name;
    let married;
    return(
        <form
        onSubmit={e => {
          e.preventDefault();
          console.log(e);
          addAuthor({variables: {name: name.value, id: Math.floor((Math.random()*5)*Math.random()*100), married: !!married.checked}})
        }}
      >

      <label htmlFor="name">
        Enter Name: <input required label="name" type="text" ref={node => (name = node)} />
      </label>
        <label htmlFor="married">
        Married?: <input label="married" type="checkbox" ref={node => (married = node)} />
        </label>

        <button type="submit">Add an Author</button>
      </form>
    )
}

export default function Authors() {
  const [searchedName, setSearchedName] = useState(null);
  let input;
  const { loading, error, data } = useQuery(GET_AUTHORS, {
    variables: { name: searchedName }
  });
  if (loading) {
    return <h1>...LOADING</h1>;
  }

  if (error) {
    return (
      <React.Fragment>
        <h1>Error searching for Author</h1>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
    <AddAuthor/>
      <h1>Search for Author:</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          setSearchedName(input.value);
          input.value = "";
        }}
      >
        <input ref={node => (input = node)} />
        <button type="submit">Search for Author</button>
      </form>
      {data.authorByName.map(author => {
        return (
          <div key={author.name}>
            <h3>{author.name}</h3>
            <ul>
                <li>Married: {author.married ? 'Yes' : 'No'}</li>
            </ul>
          </div>
        );
      })}
    </React.Fragment>
  );
}
