'use client';

import Database from "@/lib/Database";

export default function DownloadButton({id} : {id: number}){
    const downloadFile = async ()=>{
        const response = await Database.getFile(id);
        if(!response)
            return null;

        const [blob, filename] = response;
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return <button className="bg-purple-700 p-4 font-sans text-3xl font-extrabold text-white w-full hover:scale-110 transition" onClick={downloadFile}>Download</button>
}