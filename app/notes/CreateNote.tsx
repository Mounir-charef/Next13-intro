'use client'
import {useState} from "react";
import {useRouter} from "next/navigation";
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

function CreateNote() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const createNote = async () => {
        console.log(title, content)
        await pb.collection('notes').create({'title':title, 'content': content});
    }


    return (
        <form onSubmit={createNote}>
            <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)}/>
            <textarea  placeholder='Content' value={content} onChange={e => setContent(e.target.value)}/>

            <button type='submit'>
                Create Note
            </button>
        </form>
    );
}

export default CreateNote;