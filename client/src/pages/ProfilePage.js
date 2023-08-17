import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_FRIEND } from '../utils/mutations'
import { QUERY_SINGLE_USER } from '../utils/queries'
import { useParams } from 'react-router-dom'

export default function ProfilePage() {
  const { id } = useParams()
  const [friendList, setFriendList] = useState([])
  const [favList, setFavList] = useState([])

  // set up states
  console.log(id)
  const { loading, data } = useQuery(QUERY_SINGLE_USER, {
    variables: { id: id } // would this work? (ask TA)
  }) 

  const [ addFriend, { error }] = useMutation(ADD_FRIEND, { 
    variables: { id: id } // ask TA if addFriend needs variable here or on line 45
  }) 

  if (loading) {
    return <div>Loading...</div>
  }

  setFriendList(data.friends)
  setFavList(data.favorites)
  
 if(error) {
    return console.error("There has been an error")
 }

  // get user data from getSingleUser query


  console.log(data.user)
  const user = data.user || {}

  // setup button to add friend 

  const handleAddFriend = (e) => {
    e.preventDefault()
    console.log("BUTTON WORKS!!!") 
    addFriend({
      variables: data._id
    })
   // return <button>Add Friend</button>
}
  // if statement in the return

    return (
      <div className="bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-md w-80">
          <img
            className="w-32 h-32 rounded-full mx-auto"
            src="https://via.placeholder.com/150"
            alt="Profile"
          /> 
          {/* username should change depending on who signs in */}
          <h1 className="text-xl font-semibold mt-4">{user.name}</h1>
          <p className="text-gray-600 mt-2">User</p>
          <div className="mt-4">
          {/* if this is your profile you can edit the about me */}
            <p className="text-gray-700">About Me</p>
            <p className="text-gray-600">
              {user.aboutme}
            </p>
          </div>
          <div className="mt-4">
            <button onClick={addFriend} className="bg-blue-500 text-white px-4 py-2 rounded-md"> 
            {/* ask TA about onClick */}
              Add Friend
            </button>
          </div>
        </div>
      </div>
    );
  };