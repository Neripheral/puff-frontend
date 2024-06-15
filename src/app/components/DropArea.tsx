import Image from 'next/image';
import dropIcon from '/public/drop-icon.png'

export default function DropArea(){
    return (
        <div className="transition border-4 border-gray-400/40 border-dashed bg-black/30 hover:bg-black/20 hover:scale-110 aspect-square m-5 p-5 rounded-3xl">
            <form className="min-h-full flex">
                <Image
                    src={dropIcon}
                    alt="Drop your file here."
                    width={200}
                    height={200}
                    className="opacity-40 m-auto"
                    />
                <input type="file" className="hidden"/>
                <button type={"submit"} className="hidden">Upload</button>
            </form>
        </div>
    );
}