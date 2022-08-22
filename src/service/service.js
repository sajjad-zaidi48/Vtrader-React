import Vue from 'vue'

const url = (parseInt(process.env.VUE_APP_IS_SSL_ENABLE) == 1 ? process.env.VUE_APP_OMS_API_BASE_URL_WEBSOCKET_HTTPS : process.env.VUE_APP_OMS_API_BASE_URL_WEBSOCKET_HTTP) + '/transactionalws?access_token='
let socket

if (localStorage.oms_access_token) {
    socket = new WebSocket(url + localStorage.getItem('oms_access_token'))
}

const emitter = new Vue({
    methods: {

        connect() {
            if (localStorage.oms_access_token) {
                console.log('connected socket', socket.readyState)

                if (socket.readyState === 3 && localStorage.getItem('oms_access_token')) {
                    socket = new WebSocket(url + localStorage.getItem('oms_access_token'))
                    emitter.connect()
                }
                
                socket.onopen = function() {
                    console.log('Connected')
                }

                socket.onmessage = function(msg) {
                    const data = JSON.parse(msg.data)
                    console.log(data)
                    if (data.method === 'Orders') {
                        emitter.$emit('ordersSubscribeEvent', data)
                    } else if (data.method === 'OpenOrders') {
                        emitter.$emit('opendOrdersSubscribeEvent', data)
                    } else if (data.method === 'Executions') {
                        // console.log("exe",data);
                        emitter.$emit('executionsSubscribeEvent', data)
                    } else if (data.method === 'Positions') {
                        // console.log(data);
                        emitter.$emit('positionsSubscribeEvent', data)
                    } else if (data.method === 'Locates') {
                        emitter.$emit('locatesSubscribeEvent', data)
                    } else if (data.method === 'LocateSummary') {
                        emitter.$emit('summaryLocatesSubscribeEvent', data)
                    } else if (data.method === 'NetLimitSummary') {
                        console.log('buying power', data)
                        emitter.$emit('buyingPowerSubscribeEvent', data)
                    }
                }
                socket.onclose = function(e) {
                    console.log('Socket is closed. Reconnect will be attempted in 5 second.', e.reason)
                    if (localStorage.oms_access_token) {
                        setTimeout(function() {
                            emitter.connect()
                        }, 5000)
                    }
                }
                socket.onerror = function(err) {
                    console.log('Scket', err)
                    emitter.$emit('error', err)
                }
            }
        }
    },
    data() {
        return {}
    }
})
setTimeout(function() {
    emitter.connect()
}, 3000)
export default emitter