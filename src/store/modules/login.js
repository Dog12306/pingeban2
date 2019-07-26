const state = {
  codeTime: 60
}

const mutations = {
  CODE_TIME(state) {
    state.codeTime --
  },
}

const actions = {
  // 发送短信验证码倒计时
  codeTime({ // 验证码倒计时
    commit
  }) {
    setTimeout(() => {
        if (state.codeTime <= 0) {
            state.codeTime = 60
            return
        } else {
            this.dispatch('login/codeTime')
        }
        commit('CODE_TIME')
    }, 1000)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}