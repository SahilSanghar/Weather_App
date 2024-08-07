import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const MessageForm = () => {
const [message, setMessage] = useState('');

const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
    try {
        await addDoc(collection(db, 'messages'), {
            text: message,
            timestamp: new Date(),
        });
        setMessage('');
    } catch (error) {
        console.error('Error adding document: ', error);
    }
    }
};

return (
    <form onSubmit={handleSubmit} className="p-4 w-[80%] mt-[50px] max-sm:mx-[50px] sm:mx-[140px] md:mx-[160px] lg:mx-[200px] xl:mx-[300px]">
    <p className='text-3xl py-5 max-sm:ml-[80px] sm:ml-[160px] md:ml-[200px] lg:ml-[120px] xl:ml-[120px]'>
        Review
    </p>
    <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
        rows="3"
        className="w-4/5 p-2 mb-2 text-black border border-gray-300 rounded"
    ></textarea><br />
    <button
    type='submit'
    className="text-white text-xl font-medium px-3 py-1 max-sm:ml-[100px] sm:ml-[180px] md:ml-[220px] lg:ml-[140px] xl:ml-[140px] rounded transition-colors duration-200 ease-in hover:bg-[rgba(55,65,81,0.2)]"
    >
        Send
    </button>
    </form>
);
};

export default MessageForm;
