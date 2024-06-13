export default function DragNDrop(){
    return (
        <div className="bg-gradient-to-r from-white/20 via-gray-700/20 to-white/20 m-5 p-5 rounded-lg">
            <form>
                <p>Select File:</p>
                <input type="file" className="hidden"/>
                <button type={"submit"} className="hidden">Upload</button>
            </form>
        </div>
    );
}