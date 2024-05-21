import { GetOssConfig } from "./oss"
import * as qiniu from "qiniu-js";
import { region } from "qiniu-js";
import SparkMD5 from 'spark-md5';


const ossUpLoad = async (file: File, next: any, error: any, complete: any) => {
    // 获取oss配置
    const OssConfig = await GetOssConfig()
    // 获取文件md5
    const fileMD5 = await SparkMD5.hashBinary(file.name)
    console.log(fileMD5)
    // 获取文件扩展名
    const extension = file.name.split('.').pop();
    // 获取文件上传名
    const upname = OssConfig.keyprefix + fileMD5 + '.' + extension


    const upconfig = {
        region: OssConfig.region as typeof region[keyof typeof region],
    }

    const observable = qiniu.upload(file, upname, OssConfig.upToken, undefined, upconfig)
    const subscription = observable.subscribe(next, error, complete);
    return subscription
}

export default ossUpLoad
