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

//存放的是异步存储state的方法
export const actions = {
        //封装登录的方法
        //store是必要固有的参数 执行当前的store == 组件内的 this.$store
        async login(store,data){
            var res = await this.$axios({
                url:"/accounts/login",
                method:"POST",
                data
            })

            if(res.status===200){
                store.commit("setUserInfo",res.data)
            }

            return res;
        }
};