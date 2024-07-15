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
        <main className="px-8 h-screen flex">
            <div className="m-auto">
                <section className="mx-auto mb-20 p-5 text-white text-center">
                    <h1 className="font-sans text-5xl font-extrabold py-4">Get droplet:</h1>
                    <h2 className="text-2xl w-full max-w-100 rounded-full bg-black/30 p-4">{filename}</h2>
                </section>
                <section className="w-full">
                    <DownloadButton id={params.fileId}/>
                </section>
            </div>
        </main>
    );
}