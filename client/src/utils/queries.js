import { gql } from '@apollo/client'

export const QUERY_ME = gql`
query me {
    me {
        _id
        email
        username
        password
        friends {
            _id
            username
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

export const QUERY_SINGLE_USER = gql`
query user($userId: ID) {
    user(id: $userId) {
        username
        aboutme
        email
    }
}
`
