<template>
    <div class="flight-item">
        <div @click="isShow=!isShow">
            <!-- 显示的机票信息 -->
            <el-row type="flex" align="middle" class="flight-info" >
                <el-col :span="6">
                    <span>{{item.airline_name}} </span> 
                    {{item.flight_no}}
                </el-col>
                <el-col :span="12">
                    <el-row type="flex" justify="space-between" class="flight-info-center">
                        <el-col :span="8" class="flight-airport">
                            <strong>{{item.dep_time}}</strong>
                            <span>{{item.org_airport_name}}</span>
                        </el-col>
                        <el-col :span="8" class="flight-time">
                            <span>{{rankTime}}</span>
                        </el-col>
                        <el-col :span="8" class="flight-airport">
                            <strong>{{item.arr_time}}</strong>
                            <span>{{item.dst_airport_name}}</span>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6" class="flight-info-right">
                    ￥<span class="sell-price">{{item.base_price/2}}</span>起
                </el-col>
            </el-row>
        </div>
        <div class="flight-recommend"  v-if="isShow">
            <!-- 隐藏的座位信息列表 -->
            <el-row type="flex"  justify="space-between" align="middle">
                <el-col :span="4">低价推荐</el-col>
                <el-col :span="20">
                    <el-row type="flex" justify="space-between" align="middle" class="flight-sell" v-for="(seat,index) in item.seat_infos" :key="index">
                        <el-col :span="16" class="flight-sell-left">
                            <span>{{seat.name}}</span> | {{seat.supplierName}}
                        </el-col>
                        <el-col :span="5" class="price">
                            ￥{{seat.org_settle_price}}
                        </el-col>
                        <el-col :span="3" class="choose-button">
                            <el-button 
                            type="warning" 
                            size="mini">
                            选定
                            </el-button>
                            <p>剩余：{{seat.discount}}</p>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            isShow:false,    
        }
        
    },
    props: {
        // 数据
         // item是声明组件可以接受item属性
            item:{
                //声明item类型
                type: Object,
                // 默认是空数组
                default: {}
            }
        
    },
    computed:{
        //计算属性 监听组件内容引用的实例的属性的变化
        rankTime(){
            //首先分割数组 取出3两个数值
            const depTime = this.item.dep_time.split(":") //22,30
            const arrTime = this.item.arr_time.split(":") //20:00
            // 第二天 如果出发事件大于到达时间 自动加上24小时处理
            if(arrTime[0] < depTime[0]){
                arrTime[0] += 24;
            }
            //然后用第一个数值乘以60分钟再加上第二个数值获取总分钟数
            const start = depTime[0] * 60 + (+depTime[1])
            const end = arrTime[0] * 60 + (+arrTime[1])
            //然后再用两个总分钟数相减算出相隔的分钟数
            const dis = end - start
            //再用得到的相隔分钟数除以60 在向下取整得出整数的小时数
            const hours = Math.floor(dis / 60);
            //在用取余的方法算出剩下的分钟数
            const min = dis % 60;
            //最后return出最终相隔的时间结果
            return `${hours}小时${min}分钟`;
        }
    },
    mounted(){
        
    }
}
</script>

<style scoped lang="less">
    .flight-item{
        border:1px #ddd solid;
        margin-bottom: 10px;

        .flight-info{
            padding:15px;
            cursor: pointer;

            > div{
                &:first-child, &:last-child{
                    text-align: center;
                }
            }
        }

        .flight-info-center{
            padding:0 30px;
            text-align: center;

            .flight-airport{
                strong{
                    display: block;
                    font-size:24px;
                    font-weight: normal;
                }
                span{
                    font-size: 12px;
                    color:#999;
                }
            }

            .flight-time{
                span{
                    display: inline-block;
                    padding:10px 0;
                    border-bottom: 1px #eee solid;
                    color:#999;
                }
            }
        }

        .flight-info-right{
            
            .sell-price{
                font-size: 24px;
                color:orange;
                margin:0 2px;
            }
        }
    }

    .flight-recommend{
        background: #f6f6f6;
        border-top:1px #eee solid;
        padding:0 20px;

        .flight-sell{
            border-bottom:1px #eee solid;
            padding:10px 0;

            &:last-child{
                border-bottom: none;
            }

            .flight-sell-left{
                font-size: 12px;
                span{
                    color:green;
                }
            } 

            .price{
                font-size: 20px;
                color:orange;
            }

            .choose-button{
                text-align: center;
                color:#666;
                button{
                    display: block;
                    width:100%;
                    margin-bottom:5px;
                }
            }
        }
    }
</style>