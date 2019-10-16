// 历史记录
export const state = () => ({
    // 采用接口返回的数据结构 历史记录是多项数组 是一个数组
    history: [],
}) 

export const mutations = {
    // 保存用户信息到state
    setHistory(state, data){
        //把得到数据在数组前面添加
        state.history.unshift(data);
        if(state.history.length>5){
            state.history.splice(3)
        }
    },
};