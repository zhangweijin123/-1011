<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <!-- setDataList用于修改过后的数组列表 是子组件通过事件传给父组件 -->
                <!-- data是不会被数据修改的列表 -->
                <FlightsFilters :data="cacheFlightsData" @setDataList="setDataList"/>
                
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
                    v-if="flightsData.flights.length"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageIndex"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="flightsData.total">    
                </el-pagination>

                <!-- loading等于false表示加载完毕之后才显示 -->
                <div v-if="flightsData.flights.length === 0 && !loading" style="padding: 50px; text-align:center">
                    该航班暂无数据
                </div>
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
import FlightsFilters from "@/components/air/flightsFilters.vue"

export default {
    data(){
        return {
            flightsData:{
                flights:[],
                info:{},
                options:{}
            },  //航班总数据里面包括flights,info,options,total
            //多缓存一份数据  只修改一次
            cacheFlightsData:{
                flights:[],
                info:{},
                options:{}
            },
           
            //当前页数
            pageIndex:1,
            //当前的条数
            pageSize:5,

            //判断是否正在加载
            loading:false
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
        FlightsItem,
        FlightsFilters
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

            //缓存一份新的数据 这个列表不会被修改
            //而flightsData会被修改
            this.cacheFlightsData = {...res.data};
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