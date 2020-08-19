import api from '../index'
import urls from './urls'

export default {
    
    allorderinfo(){
        // return出去了一个promise
        return api.get(urls.allorderinfo)
    },

    deleteorder(params){
        // return出去了一个promise
        params={
            o_id: params
        }
        return api.delete(urls.deleteorder+'/'+params.o_id)
   },
   
    postorderinfo(params){
        // return出去了一个promise
        params={
            o_id: params
        }
        return api.post(urls.postorderinfo +'/'+params.o_id)
    },

    putorderinfo(params){
        // return出去了一个promise
        params={
            o_id: params
        }
        return api.put(urls.postorderinfo +'/'+params.o_id)
    },

    postorder(params) {
        // return出去了一个promise
        params = {
            o_name: params.o_name,
            o_phone: params.o_phone,
            s_name: params.s_name,
            u_userId: params.u_userId
        }
        return api.post(urls.postorder, params)
    },

    showorderinfo(){
        // return出去了一个promise
        return api.get(urls.showorderinfo)
    },

    putorder(){
        // return出去了一个promise
        return api.put(urls.putorder)
    },

    putbuttonorder(){
        // return出去了一个promise
        return api.put(urls.putbuttonorder)
    },


}

