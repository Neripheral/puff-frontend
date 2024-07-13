class Database {
    private readonly rootUrl: string;

    constructor(rootUrl: string) {
        this.rootUrl = rootUrl;
    }

    public uploadFile(file: File) {
        console.log("Sending file");
        const formData = new FormData();
        formData.set("file", file);
        fetch(this.rootUrl, {
            method: "POST",
            body: formData
        }).then(response => {
            console.log(JSON.stringify(response));
        });
    }

    async getFileData(id: number){
        const res = await fetch(this.rootUrl + id, {
            method: "HEAD"
        });

        const filename = this.getFilenameFromHeader(res.headers.get("Content-Disposition"));
        if(!filename) {
            return null;
        }
        return filename;
    }

    getFilenameFromHeader(header: string|null){
        console.log(header);
        if(!header)
            return null;

        const regex = new RegExp(`^attachment; filename="([^"]*)"$`);
        const match = header.match(regex);

        if(match && match[1])
            return match[1];
        return null;
    }

    async getFile(id: number): Promise<[Blob, string] | null> {
        const res = await fetch(this.rootUrl + id);

        if(res.status != 200)
            return null;

        res.headers.forEach(console.log);
        const filename = this.getFilenameFromHeader(res.headers.get("Content-Disposition")) || '';
        console.log("Filename: " + filename);
        const fileBlob = await res.blob();
        return [fileBlob, filename];
    }
}

export default new Database(`http://localhost:8080/puff/api/`);