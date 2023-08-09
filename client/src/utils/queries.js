import { gql } from '@apollo/client'

export const QUERY_ME = gql`
query user {
    user {
        _id
        email
        username
        password
        friends {
            _id
            Username
        }
        favorites {
            _id
            name
        }
    }
}`

export const QUERY_ALL_LOBBIES = gql`
query allLobbies {
    allLobbies {
        _id
        name
    }
}`

