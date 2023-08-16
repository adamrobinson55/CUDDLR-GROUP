import { gql } from '@apollo/client'

export const CREATE_LOBBY = gql`
    mutation createLobby($name: String!, $tags: [TagInput]) {
        createLobby(name: $name, tags: $tags) {
            name
            tags {
                name
            }
        }
    }`

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        user {
          _id
          username
        }
      }
    }
  `

export const CREATE_USER = gql`
mutation createUser($email: String!, $name: String!, $password: String!) {
    createUser(email: $email, name: $name, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`

export const USER_JOIN_LOBBY = gql`
mutation userJoinLobby($name: String!) {
    userJoinLobby(name: $name) {
        lobby
    }
}
`

export const USER_DISCONNECT_LOBBY = gql`
mutation userDisconnectLobby($name: String!) {
    userDisconnectLobby(name: $name) {
        lobby
    }
}
`

export const ADD_FRIEND = gql`
  mutation addFriend($id: ID) {
    addFriend(id: $id) {
      user {
        _id 
        username
      }
    }
  }
`