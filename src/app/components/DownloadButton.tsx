'use client';

import Database from "@/lib/Database";

export default function DownloadButton({id, filename} : {id: number, filename: string}) {
    const downloadFile = async () => {
        const response = await Database.getFile(id);
        if (!response)
            return null;

        const [blob, filename] = response;
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return <h2 className="break-words text-white text-4xl text-center cursor-pointer w-full max-w-3xl rounded-3xl bg-black/30 p-6 hover:scale-110 transition align-middle underline border-4 border-purple-600/20" onClick={downloadFile}>{filename}</h2>;
}