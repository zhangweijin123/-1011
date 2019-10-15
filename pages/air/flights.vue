<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <div>
                    
                </div>
                
                <!-- 航班头部布局 -->
                <FlightsListHead/>
                
                
                <!-- 航班信息 -->
                    <!-- fligthsData.flights是航班的列表 -->
                    <FlightsItem 
                    v-for="(item,index) in fligthsData.flights"
                    :key="index"
                    :item="item"
                    />
                
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
            </div>
        </el-row>
    </section>
</template>

<script>

import moment from "moment";
import FlightsListHead from "@/components/air/flightsListHead.vue"
import FlightsItem from "@/components/air/flightsItem.vue"

export default {
    data(){
        return {
            fligthsData:{},  //航班总数据里面包括flights,info,options,total
        }
    },
    components:{
        FlightsListHead,
        FlightsItem
    },
    mounted(){
        //请求机票列表的数据
        this.$axios({
            url:"/airs",
            // params是axios的 get的参数
            params:this.$route.query
        }).then(res=>{
            this.fligthsData = res.data;
            console.log(this.fligthsData)
        })
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>