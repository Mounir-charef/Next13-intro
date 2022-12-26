"use client"
import {useEffect, useState, useMemo} from "react";


import Link from "next/link";
import PocketBase from 'pocketbase';
import CreateNote from "./CreateNote";

const pb: any = new PocketBase('http://127.0.0.1:8090');

async function getNotes() {
    const data = await pb.collection('notes').getList(1, 50);
    return data?.items as any[]
}

function Page() {
    const [notes, setNotes] = useState<any[]>([]);
    const [filter, setFilter] = useState('');
    const filteredData = useMemo<any[]>(() => {
        return notes.filter(note => note?.title.toLowerCase().includes(filter.toLowerCase()));
    }, [filter, notes])

    useEffect(() => {
        const fetchData = async() => {
            let data = await getNotes()
            setNotes(data)
        }
        fetchData().catch(console.error)
    },[])

    return (
        <>
             <div>
               <form>
                   <input type="text" placeholder='filter' value={filter} onChange={e => setFilter(e.target.value)}/>
               </form>
               <h1> Notes</h1>
               <div className='grid'>
                   {filteredData?.map(note => <Note key={note.id} note={note} />)}
               </div>
            </div>
            <CreateNote />
        </>
    );
}

function Note({note}: any) {
    const {id, title, content, created} = note || {};

    return (
        <Link href={`/notes/${id}`} style={{flex: 1}}>
            <div className='note'>
                <h2>{title}</h2>
                <h5>{content}</h5>
                <p>{created}</p>
            </div>
        </Link>
    )
}

export const dynamic = 'auto',
  dynamicParams = true,
  revalidate = 0,
  fetchCache = 'auto',
  runtime = 'nodejs',
  preferredRegion = 'auto'

export default Page;