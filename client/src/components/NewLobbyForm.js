// this file should be fine
import React, { useState } from 'react';
import { CREATE_LOBBY } from '../utils/mutations';
import { useMutation } from '@apollo/client';
// get list of all tags, probably all rooms as well to prevent dupes

export default function NewLobbyForm() {
    const [lobbyName, setLobbyName] = useState('')
    const [lobbyTags, setLobbyTags] = useState([])
    const [tagInput, setTagInput] = useState('')

    const [userInput, setUserInput] = useState(
        {
            inputName: '',
            inputTags: []
        }
    )

    const [createLobby, { error }] = useMutation(CREATE_LOBBY)

    const nameInputHandler = (e) => {
        setUserInput((prevState) => {
            return {
                ...prevState,
                inputName: e.target.value
            }
        })
    }

    const handleTagInputChange = (e) => {
        setTagInput(e.target.value)
    };

    const addTag = () => {
        if (tagInput.trim() !== '') {
            const updatedLobbyTags = [...lobbyTags, { name: tagInput.trim() }]
            setLobbyTags(updatedLobbyTags)
            console.log('LOBBY TAGS: ', updatedLobbyTags)
            setUserInput((prevState) => {
                return {
                    ...prevState,
                    inputTags: updatedLobbyTags
                }
            })

            setTagInput('');
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: userInput.inputName,
            tags: userInput.inputTags
        }
        console.log(formData)
        createLobby({
            variables: {
                ...formData
            }
        })

        setUserInput({
            inputName: '',
            inputTags: []
        })
        setLobbyTags([])
    }


    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-80">
                <h2 className="text-xl font-semibold mb-4">Create a New Lobby</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-blue-300 focus:border-blue-300"
                            value={userInput.inputName}
                            onChange={nameInputHandler}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Tags</label>
                        <div className="flex items-center">
                            <input
                                type="text"
                                className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-blue-300 focus:border-blue-300"
                                value={tagInput}
                                onChange={handleTagInputChange}
                            />
                            <button
                                type="button"
                                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                                onClick={addTag}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Tag List</label>
                        <ul className="list-disc ml-6">
                            {lobbyTags.map((tag, index) => (
                                <li key={index}>{tag.name}</li>
                            ))}
                        </ul>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}