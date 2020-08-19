import Storage from 'web-storage-cache'

const localStorage = new Storage()

export function setLocalStorage(key,value){  //设置一个本地缓存（健，值） 后台传前
    return localStorage.set(key,value)
}

export function getLocalStorage(key){ //前台用  获取token
    return localStorage.get(key)
}

export function removeLocalStorage(key){
    return localStorage.delete(key)
}