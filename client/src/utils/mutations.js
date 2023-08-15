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