import { customRequestArgs } from "@douyinfe/semi-ui/lib/es/upload";
import { GetOssConfig, OssConfig } from "./oss";
import * as qiniu from "qiniu-js";
import { region } from "qiniu-js";
import SparkMD5 from 'spark-md5';
import { UploadImgCallBack } from "md-editor-rt";
import { Toast } from "@douyinfe/semi-ui";

const markdownUpImg = async (files: Array<File>, callBack: UploadImgCallBack) => {
    let urls: Array<{
        url: string;
        alt: string;
        title: string;
    }> = []
    const OssConfig = await GetOssConfig()
    
    files.map(async (file) => {
        Toast.info({ content: "${file.name}上传中", duration: 0 ,id: file.name})
        ossUpLoad(OssConfig,
            file,
            (next: any) => {
                // 上传进度展示
                // onProgress({ total: 100, loaded: next.total.percent });
                const loded = Math.floor(next.total.percent)
                Toast.info({ content: file.name+"上传中"+loded+"%", duration: 0 ,id: file.name})
            },
            (error: any) => {
                console.log(error)
            },
            (complete: any) => {
                urls.push({ url: OssConfig.domain + "/" + complete.key + OssConfig.imgprocess, alt: "", title: "" })
                // 全部上传完毕 反馈到markdown上
                if (urls.length === files.length) {
                    Toast.close(file.name)
                    callBack(urls)
                }
            }

        )
    })
}

const mockRequest = async (pops: customRequestArgs) => {
    const { fileInstance, onSuccess, onProgress, onError } = pops;
    // 获取oss配置
    const OssConfig = await GetOssConfig()
    ossUpLoad(
        OssConfig,
        fileInstance,
        (next: any) => {
            // 上传进度展示
            onProgress({ total: 100, loaded: next.total.percent });
        },
        (error: any) => {
            onError(error);
        },
        (complete: any) => {
            // 返回封面地址 such as domain = "https://cdn.example.com" complete.key = "example/example.png"
            onSuccess(OssConfig.domain + "/" + complete.key);
        }
    );
};

const ossUpLoad = async (ossConfig: OssConfig, file: File, next: any, error: any, complete: any) => {
    // 使用文件名生成MD5
    const fileMD5 = await SparkMD5.hashBinary(file.name)
    // 获取文件扩展名
    const extension = file.name.split('.').pop();
    // 设置文件上传名
    const upname = ossConfig.keyprefix + fileMD5 + '.' + extension

    const upconfig = {
        region: ossConfig.region as typeof region[keyof typeof region],
    }

    const observable = qiniu.upload(file, upname, ossConfig.upToken, undefined, upconfig)
    const subscription = observable.subscribe(next, error, complete);
    return subscription
}

export { markdownUpImg, mockRequest }
