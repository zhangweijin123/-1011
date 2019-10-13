// 用户管理
export const state = () => ({
    // 采用接口返回的数据结构
    userInfo: {},
}) 

export const mutations = {
    // 保存用户信息到state
    setUserInfo(state, data){
        state.userInfo = data;
    },
};

export const actions = {};