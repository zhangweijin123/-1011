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
                    <!-- flightsData.flights是航班的列表 -->
                    <FlightsItem 
                    v-for="(item,index) in dataList"
                    :key="index"
                    :item="item"
                    />
                
                <!-- 分页部分 -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageIndex"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="flightsData.total">    
                </el-pagination>
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
            flightsData:{
                flights:[],
            },  //航班总数据里面包括flights,info,options,total


           
            //当前页数
            pageIndex:1,
            //当前的条数
            pageSize:5
        }
    },

    computed:{
        dataList(){
        //从flights中切割出新的数组
        const arr = this.flightsData.flights.slice(
                (this.pageIndex - 1) * this.pageSize,
                this.pageIndex * this.pageSize
            )
            return  arr
        }
    },
    components:{
        FlightsListHead,
        FlightsItem
    },
    methods: {
        // 分页条数切换时候触发, val是当前的条数
        handleSizeChange(val){
             // 切换条数
            this.pageSize = val;
            
        },
        // 页数切换时候触发, val是当前的页数
        handleCurrentChange(val){
            //修改当前的页数
            this.pageIndex = val;
        }
    },
    mounted(){
        //请求机票列表的数据
        this.$axios({
            url:"/airs",
            // params是axios的 get的参数
            params:this.$route.query
        }).then(res=>{
            this.flightsData = res.data;
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