class Database {
    private rootUrl: string;

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
            method: "HEAD",
            cache: "force-cache"
        });

        const filename = this.getFilenameFromHeader(res.headers.get("Content-Disposition"));
        if(!filename) {
            return null;
        }
        return filename;
    }

    private getFilenameFromHeader(header: string|null){
        if(!header)
            return null;

        const regex = new RegExp(`^attachment; filename="([^"]*)"$`);
        const match = header.match(regex);

        if(match && match[1])
            return match[1];
        return null;
    }
}

export default new Database(`http://localhost:8080/puff/api/`);