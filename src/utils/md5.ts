import BMF from "browser-md5-file"; //这个使用npm

export const getMd5 = (rawFile: File) => {
    return new Promise((resolve, reject) => {
        const bmf = new BMF();
        bmf.md5(
            rawFile,
            (err: any, md5: any) => {
                if (err) {
                    reject(err);
                }
                resolve(md5);
            },
        )
    });
};
