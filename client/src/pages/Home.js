import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_LOBBIES } from '../utils/queries';

<<<<<<< HEAD
const Home = () => {
    const { loading, data } = useQuery(QUERY_ALL_LOBBIES, {
=======
export default function Home {
    const {loading, data } = useQuery(QUERY_ALL_LOBBIES, {
>>>>>>> d2df4edc0bca73f0bdd84b1bde02054f15017720
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