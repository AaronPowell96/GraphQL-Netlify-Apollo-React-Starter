import {gql} from 'apollo-boost'

export const typeDefs = gql`
extend type Mutation{
    ChangeTest: String!
}
`


const GET_TEST = gql`
    {
        test @client
    }
`
export const resolvers = {
    Mutation: {
        changeTest: (root, {test}, {client}) => { 
            client.writeQuery({
                query: GET_TEST,
                data: {test}
            })
            return test
        }
    }
}