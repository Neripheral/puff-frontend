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

    return <button onClick={downloadFile}>Download</button>
}