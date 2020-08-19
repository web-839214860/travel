import api from '../index'
import urls from './urls'

export default {
    
    getsceneryinfo() {
        // return出去了一个promise
        return api.get(urls.getsceneryinfo)
    },
    deletescenery(params) {
        // return出去了一个promise
        params = {
            s_name: params
        }
        return api.delete(urls.deletescenery + '/' + params.s_name)
    },
    postscenery(params){
        // return出去了一个promise
        return api.post(urls.postscenery,params)
    },
    getonesceneryinfo(params){
        // return出去了一个promise
        params={
            s_name: params
        }
        return api.get(urls.getonesceneryinfo + '/' + params.s_name)
    },
    putonesceneryinfo(params,id){
        // return出去了一个promise
        return api.put(urls.putonesceneryinfo + '/' + id,params)
    },
    
}

