class Database {
    private readonly rootUrl: string;

    constructor(rootUrl: string) {
        this.rootUrl = rootUrl;
    }

    async uploadFile(file: File): Promise<number | null> {
        console.log("Sending file");
        const formData = new FormData();
        formData.set("file", file);

        const response = await fetch(this.rootUrl, {
            method: "POST",
            body: formData
        });

        if(response.ok){
            const apiUrl = response.headers.get("Location");
            const newIdStr = apiUrl?.split("/").pop();
            if(!newIdStr)
                return null;

            return parseInt(newIdStr);
        }
        return null;
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

export default new Database(`http://192.168.0.104:8080/puff/api/`);