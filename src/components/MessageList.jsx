import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, onSnapshot, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { FaEdit, FaTrash } from 'react-icons/fa';

const formatTimestamp = (timestamp) => {
    const date = timestamp.toDate();
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, 
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
};

const MessagesList = () => {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [newMessageText, setNewMessageText] = useState('');

    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const msgs = [];
            querySnapshot.forEach((doc) => {
                msgs.push({ id: doc.id, ...doc.data() });
            });
            setMessages(msgs);
        });

        return () => unsubscribe();
    }, []);

    const handleEditMessage = async (id) => {
        const messageRef = doc(db, 'messages', id);
        await updateDoc(messageRef, { text: newMessageText });
        setEditMode(false);
        setSelectedMessage(null);
        setNewMessageText('');
    };

    const handleDeleteMessage = async (id) => {
        const messageRef = doc(db, 'messages', id);
        await deleteDoc(messageRef);
    };

    const handleSelectMessage = (msg) => {
        setSelectedMessage(msg);
        setNewMessageText(msg.text);
        setEditMode(true);
    };

    return (
        <div className="p-4 w-[50%] mx-auto mt-[50px] max-sm:mx-[120px] sm:mx-[200px] md:mx-[300px] lg:mx-[200px] xl:mx-[250px] rounded">
            <p className='text-3xl py-5'>
                Messages
            </p>
            {messages.length > 0 ? (
                <ul className="list-disc pl-5">
                    {messages.map((msg) => (
                        <li 
                            key={msg.id} 
                            className="mb-2 p-2 rounded cursor-pointer"
                            onClick={() => handleSelectMessage(msg)}
                        >
                            <div className='text-xl'>{msg.text}</div>
                            <div className="italic text-sm">{formatTimestamp(msg.timestamp)}</div>
                            {selectedMessage?.id === msg.id && (
                                <div className="flex space-x-2 mt-2">
                                    <FaEdit 
                                        className="cursor-pointer" 
                                        onClick={() => setEditMode(true)}
                                    />
                                    <FaTrash 
                                        className="cursor-pointer" 
                                        onClick={() => handleDeleteMessage(msg.id)}
                                    />
                                </div>
                            )}
                            {editMode && selectedMessage?.id === msg.id && (
                                <div className="mt-2">
                                    <input 
                                        type="text" 
                                        value={newMessageText} 
                                        onChange={(e) => setNewMessageText(e.target.value)}
                                        className="border text-black p-1 rounded w-full"
                                    />
                                    <button 
                                        onClick={() => handleEditMessage(msg.id)}
                                        className="text-white text-md font-medium px-3 py-1 rounded transition-colors duration-200 ease-in hover:bg-[rgba(55,65,81,0.2)]"
                                    >
                                        Save
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No messages yet.</p>
            )}
        </div>
    );
};

export default MessagesList;
