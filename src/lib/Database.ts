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
}

export default new Database(`http://localhost:8080/puff/api/`);