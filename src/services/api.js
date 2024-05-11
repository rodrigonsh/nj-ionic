import axios from 'axios'
import store from './store'
import qrCode from 'qrcode';

import { addListeners, registerNotifications, getDeliveredNotifications } from '@/services/notifications';

const api = 
{    
    versao: 1,
    token: null,
    userToken: null,

    getPath(doko)
    {
        let path = []
        path.push(store.state.apiURL)
        path.push('api')
        path.push('v'+api.versao)
        path.push(doko)
        return path.join('/')
    },

    setUserToken( x )
    {
        //console.log('setting user token', x);
        api.userToken = x 
    },

    setBearer( x )
    {
        console.log('setting bearer', x)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + x

        addListeners();
        registerNotifications();
        getDeliveredNotifications();

    },

    checkIn(obj)
    {
        obj['_userToken'] = this.userToken
        let path = api.getPath('checkIn')
        return axios.post( path , obj)
    },

    updateProfile(obj)
    {
        let path = api.getPath('updateProfile')
        obj['_token'] = this.token
        obj['_userToken'] = this.userToken

        return axios.post( path , obj, {
            withCredentials: true
        })
    },

    updatePhoto(image)
    {
        let path = api.getPath('updatePhoto')
        let fd = new FormData();
        fd.append('_userToken', this.userToken)
        fd.append('image', image)

        return axios.post( path , fd, {
            withCredentials: true
        })
    },

    sendChat(msg)
    {
        let path = api.getPath('newMessage')
        msg['_userToken'] = this.userToken
        msg['_token'] = this.token

        msg.ts = new Date().valueOf()
        return axios.post( path , msg, {
            withCredentials: true
        })
    },

    

    async setEndereco(address)
    {
        address['_userToken'] = this.userToken
        address['_token'] = this.token
        
        let path = api.getPath('setEndereco')

        let res = await axios.post( path ,address, { withCredentials: true })

        console.log('setEndereco', res)
    },

    async requestHelp(need)
    {
        let state = store.state
        console.log('requestHelp', state.need, state.confession)
        let path = api.getPath('requestHelp')
        let obj = { need: state.need, confession: state.confession }
        let res = await axios.post( path , obj)
        console.log('requestHelp', res)
    },

    async sendFCMToken(token)
    {
        let path = api.getPath('sendFCMToken')
        let obj = { token: token }
        let res = await axios.post( path , obj)
        console.log('sendFCMToken', res)
    }

}



export default api
