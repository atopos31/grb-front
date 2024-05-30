import BMF from "browser-md5-file"; //这个使用npm

export const fileToMD5 = (file: File) => {
    return new Promise((resolve, reject) => {
        const bmf = new BMF();
        bmf.md5(
            file,
            (err: any, md5: any) => {
                if (err) {
                    reject(err);
                }
                resolve(md5);
            },
        )
    });
};
