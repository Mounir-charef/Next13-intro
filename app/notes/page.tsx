
async function getNotes() {
    const res = await fetch('http://127.0.0.1:8090/api/collections/notes/records')
}

async function Page() {
    return (
        <div></div>
    );
}

export default Page;