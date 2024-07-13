import Database from "@/lib/Database";
import DownloadButton from "@/app/components/DownloadButton";

let fileId = 0;

async function getFilename(){
    return Database.getFileData(fileId);
}

export default async function Page({params}: {params: {fileId: number}}){
    fileId = params.fileId;
    const filename = await getFilename();

    return (
        <main className="px-8">
            <section className="mx-auto p-5 text-white text-center ">
                <h1 className="font-sans text-5xl font-extrabold py-4">Get droplet:</h1>
                <h2 className="text-2xl">{filename}</h2>
            </section>
            <section className="w-1/3 mx-auto">
                <DownloadButton id={params.fileId}/>
            </section>
        </main>
    );
}