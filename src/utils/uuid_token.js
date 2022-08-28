// 引入uuid
import { v4 as uuidv4 } from 'uuid';
export const getUUID = function () {
    // 第一步，先检查本地存储中是否有该id
    let uuid_token = localStorage.getItem('uuid_token');
    // 如果没有则创建
    if (!uuid_token) {
        localStorage.setItem('uuid_token', uuidv4());
    }
    // 返回值
    return uuid_token;
}