import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_LOBBIES } from '../utils/queries';

export default function Home() {
    const {loading, data } = useQuery(QUERY_ALL_LOBBIES, {
        fetchPolicy: "no-cache"
    })

    const lobbyList = data?.allLobbies || []

    return (
        <>
            {lobbyList.map((lobby) => {
                return (
                    <li key={lobby.id}>
                        <Link to={{pathname: `/lobby/${lobby.id}`}}>
                            {lobby.name}
                        </Link>
                    </li>
                )
            })}
        </>
    )
}