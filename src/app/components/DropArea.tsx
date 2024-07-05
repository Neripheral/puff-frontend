'use client'

import Image from 'next/image';
import dropIcon from '/public/drop-icon.png'
import {useState} from "react";

export default function DropArea(){
    const [file, setFile] = useState<File>();
    const [fileEnter, setFileEnter] = useState(false);

    return (
        <div className={(fileEnter ? "bg-black/20 scale-110" : "bg-black/30 scale-100") + " transition border-4 border-gray-400/40 border-dashed aspect-square m-5 p-5 rounded-3xl"}
            onDragOver={(e) => {
                e.preventDefault();
                setFileEnter(true);
            }}
            onDragLeave={(e)=>{
                setFileEnter(false);
            }}
            onDragEnd={(e) => {
                e.preventDefault();
                setFileEnter(false);
            }}
            onDrop={(e)=>{
                e.preventDefault();
                setFileEnter(false);
                if(e.dataTransfer.items) {
                    [...e.dataTransfer.items].forEach((item, i) =>{
                       if(item.kind === "file"){
                           const file: File | null = item.getAsFile();
                           if(file){
                               setFile(file);
                               uploadFile(file);
                           }
                       }
                    });
                }
            }}>
            <form className="min-h-full flex">
                <Image
                    src={dropIcon}
                    alt="Drop your file here."
                    width={200}
                    height={200}
                    className="opacity-40 m-auto invert"
                    />
                <input type="file" className="hidden"/>
                <button type={"submit"} className="hidden">Upload</button>
            </form>
        </div>
    );
}

function uploadFile(file: File){
    console.log("Sending file");
    const formData = new FormData();
    formData.set("file", file);
    fetch(`http://localhost:8080/puff/api/`, {
        method: "POST",
        body: formData
    }).then(response=>{
        console.log(JSON.stringify(response));
    });
}