const { ApolloServer, gql } = require('apollo-server-lambda')

const typeDefs = gql`
  type Mutation {
    addAuthor(name: String, id: Int, married: Boolean): Author
  }
  type Query {
    hello: String
    allAuthors: [Author!]
    author(id: Int!): Author
    authorByName(name: String): [Author]
  } 
  type Author {
    id: ID
    name: String
    married: Boolean
  }
`

const authors = [
  { id: 1, name: 'Terry Pratchett', married: false },
  { id: 2, name: 'Stephen King', married: true },
  { id: 3, name: 'JK Rowling', married: false }
]

const resolvers = {
  Query: {
    hello: (root, args, context) => {
      return 'Hello, world!'
    },
    allAuthors: (root, args, context) => {
      return authors
    },
    author: (root, args, context) => {
      return
    },
    authorByName: (root, {name}, context) => {
      const searchedName = name ? name.toLowerCase() : null 
      const filteredByName = authors.filter(({name}) => name.toLowerCase().includes(searchedName));
      return filteredByName.length > 0 ? filteredByName : authors
    }
  },
  Mutation:{
    addAuthor: (root, args,) => {
     const author = {
       id: args.id,
       name: args.name,
       married: args.married
     }
     authors.push(author)
     return author
    }
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

exports.handler = server.createHandler({
  cors:{
    origin: "*"
  }
})
