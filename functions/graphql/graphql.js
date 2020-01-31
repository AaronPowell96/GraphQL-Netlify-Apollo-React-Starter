// src/lambda/graphql.js
const { ApolloServer, gql } = require('apollo-server-lambda');

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  type Mutation {
    addBook(title: String, author: String): Book
  }

  type People {
    name: String
    isChild: Boolean
    description: String
    role: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    pdh(name: String): [People]
  }
`;

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling'
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  },
  {
    title: '1111',
    author: 'Michael Crichton'
  }
];

const people = [
  {
    name: 'Rory',
    age: 12,
    height: '5ft 1"',
    role: 'a child prodigy genius'
  },
  {
    name: 'David',
    age: 28,
    height: '7ft 4"',
    role: 'built like a tank'
  },
  {
    name: 'Pedro',
    age: 25,
    height: '2ft 4"',
    role: 'a rich boy'
  },
  {
    name: 'Phil',
    age: 30,
    height: '6ft 4"',
    role: 'the protector of the realm'
  }
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    pdh: (root, { name }, context) => {
      return {
        ...(name ? people.filter((person) => person.name === name) : people)
      };
    }
  },
  People: {
    description: ({ height, name, role, age }, args, context) => {
      let isAdult = age < 18 ? 'a child' : 'an adult';
      return `${name} is ${isAdult} who is ${role} at the height of ${height}`;
    }
  }
};

let server;

if (process.env.NODE_ENV !== 'production') {
  server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true
  });
} else {
  server = new ApolloServer({
    typeDefs,
    resolvers
  });
}
exports.handler = server.createHandler({
  cors: {
    origin: '*'
  }
});
