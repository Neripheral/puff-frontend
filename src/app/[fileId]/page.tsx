import Database from "@/lib/Database";
import DownloadButton from "@/app/components/DownloadButton";

let fileId = 0;

async function getFilename(){
    return Database.getFileData(fileId);
}

export default async function Page({params}: {params: {fileId: number}}){
    fileId = params.fileId;
    const filename: string = await getFilename() || "error_filename_missing";

    return (
        <main className="px-8 h-screen flex">
            <div className="m-auto">
                <section className="mx-auto mb-10 text-white text-center">
                    <h1 className="font-sans text-5xl font-extrabold">Download <span className="text-sky-300">droplet</span>:</h1>
                </section>
                <section className="w-full">
                    <DownloadButton id={params.fileId} filename={filename}/>
                </section>
            </div>
        </main>
    );
}