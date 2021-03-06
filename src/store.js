import Vue from 'vue'
import Vuex from 'vuex'
import mensajes from '@/mensajes'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    messages: [],
    messagesQty: 0,
    TxHash: ''
  },
  actions: {
    async LOAD_MESSAGES ({commit}) {
      let messagesQty = await mensajes.methods.contadorMensajes().call()
      let messages = []
      for (let i = 0; i < messagesQty; i++) {
        messages.push(await mensajes.methods.mensajes(i).call())
      }
      commit('SET_MESSAGE', {messages: messages, messagesQty: messagesQty})
    },
    async WRITE_MESSAGE ({commit}, payload) {
      /* console.log(payload) */
      await mensajes.methods.escribirMensaje(payload.message).send({
        from: payload.sender
      }, function (err, transactionHash) {
        if (!err) {
          /* console.log(transactionHash) */
          commit('SET_TXHASH', {TxHash: transactionHash})
        }
      }).then(async () => {
        let messagesQty = await mensajes.methods.contadorMensajes().call()
        let messages = []
        for (let i = 0; i < messagesQty; i++) {
          messages.push(await mensajes.methods.mensajes(i).call())
        }
        commit('SET_MESSAGE', {messages: messages, messagesQty: messagesQty})
      }).catch((error) => {
        throw error
        /* console.log(error) */
      })
    }
  },
  mutations: {
    async SET_MESSAGE (state, {messages, messagesQty, TxHash}) {
      state.messages = messages
      state.messagesQty = messagesQty
    },
    SET_TXHASH (state, {TxHash}) {
      state.TxHash = TxHash
    }
  },
  getters: {
    getMessages (state) {
      return state.messages.reverse()
    },
    getMessagesQty (state) {
      return state.messagesQty
    },
    getTxHash (state) {
      return state.TxHash
    }
  }
})

export default store
