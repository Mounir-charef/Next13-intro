import Link from "next/link";
import PocketBase from 'pocketbase';
import CreateNote from "./CreateNote";

const pb: any = new PocketBase('http://127.0.0.1:8090');

async function getNotes() {

    const data = await pb.collection('notes').getList(1, 50);

    // const res = await fetch('http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=30', {
    //     cache: "no-cache"
    // })
    // const data = await res.json()
    return data?.items as any[]
}

async function Page() {
    const notes = await getNotes()
    return (
        <>
             <div>
               <h1> Notes</h1>
               <div className='grid'>
                   {notes?.map(note => <Note key={note.id} note={note} />)}
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