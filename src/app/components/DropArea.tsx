'use client'

import Image from 'next/image';
import dropIcon from '/public/drop-icon.png'
import {useState} from "react";
import Database from "@/lib/Database";
import {redirect, useRouter} from "next/navigation";

export default function DropArea(){
    const [file, setFile] = useState<File>();
    const [fileEnter, setFileEnter] = useState(false);
    const router = useRouter();

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
                               Database.uploadFile(file).then(id=>{
                                   if(id) {
                                       const url = `/${id}`;
                                       router.push(url);
                                   }
                               });
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