<template>
    <div class="filters">
        <el-row type="flex" class="filters-top" justify="space-between" align="middle">
            <el-col :span="8">
                单程： 
                {{data.info.departCity}} - {{data.info.destCity}}
                / 
                {{data.info.departDate}}
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="filters.airport" placeholder="起飞机场">
                    <el-option
                    v-for="(item,index) in data.options.airport"
                    :key="index"
                    :label="item"
                    :value="item"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="filters.flightTimes"  placeholder="起飞时间">
                    <el-option
                    v-for="(item,index) in data.options.flightTimes"
                    :key="index"
                    :label="`${item.from}:00 - ${item.to}:00`"
                    :value="`${item.from},${item.to}`"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="filters.company"  placeholder="航空公司">
                    <el-option
                    v-for="(item, index) in data.options.company"
                    :key="index"
                    :label="item"
                    :value="item"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="filters.airSize" placeholder="机型">
                    <el-option
                     v-for="(item, index) in sizeOptions"
                    :key="index"
                    :label="item.name"
                    :value="item.size"
                    >
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：
            <el-button 
                       type="primary" 
                       round 
                       plain 
                       size="mini" 
                       @click="handleFiltersCancel">
                撤销
    		</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            filters:{
                airport: "",        // 机场
                flightTimes: "",    // 出发时间
                company: "",        // 航空公司
                airSize: "",        // 机型大小
            },
            sizeOptions:[
                {name: "大", size: "L"},
                {name: "中", size: "M"},
                {name: "小", size: "S"},
            ]
        }
    },
    props:{
        data:{
            type: Object,
            //默认是空数组
            default: {}
        }
    },
    watch:{
        filters:{
            deep:true,
            handler(){
                //统一实现四个条件的过滤
                //(重点:先假设全部航班都是符合条件的，从中选出不符合条件的设置valid为false)
                var arr = this.data.flights.filter(v=>{
                    
                    let valid = true;

                    //航空公司有选中值的时候判断
                    if(this.filters.company && this.filters.company !== v.airline_name){
                        valid = false
                    }

                    //起飞机场有选中值的时候判断
                    if(this.filters.airport && this.filters.airport !== v.org_airport_name){
                        valid = false
                    }

                    //时间
                    if(this.filters.flightTimes){
                        //出发时间的小时
                        const start = +v.dep_time.split(":")[0];
                        const arr = this.filters.flightTimes.split(",");

                        //不在选中时间段内
                        if(start < +arr[0] || start >= arr[1]){
                            valid = false
                        }
                    }

                    //大小
                    if(this.filters.airSize && this.filters.airSize !== v.plane_size){
                        valid = false
                    }

                    return valid
                })

                this.$emit("setDataList",arr)
            }
        }
    },
    methods: {
        // // 选择机场时候触发
        // handleAirport(value){
        //     //根据value过滤列表 只保留符合条件的机票列表
        //     const arr = this.data.flights.filter(v=>{
        //         return v.org_airport_name === value
        //     })

        //     //修改列表数据
        //     this.$emit("setDataList",arr)
        // },

        // // 选择出发时间时候触发
        // handleFlightTimes(value){
        //     //数组中第一项是开始时间 第二项是终止时间
        //     const arr1 = value.split(",")

        //     const arr2 = this.data.flights.filter(v=>{
        //         //获取出发时间的小时数值
        //         const start = +v.dep_time.split(":")[0]

        //         //比较航班的时间是否在时间段内
        //         return start>=+arr1[0] && start<+arr1[1]
        //     })

        //     //修改数据列表的数据
        //     this.$emit("setDataList",arr2)
        // },

        //  // 选择航空公司时候触发
        // handleCompany(value){
        //      // 根据value过滤列表，只保留当前符合条件的机票列表
        //     const arr = this.data.flights.filter(v => {
        //         return v.airline_name === value;
        //     })
        //     // 修改列表数据的
        //     this.$emit("setDataList", arr);
        // },

        //  // 选择机型时候触发
        // handleAirSize(value){
        //     // 根据value过滤列表，只保留当前符合条件的机票列表
        //     const arr = this.data.flights.filter(v => {
        //         return v.plane_size === value;
        //     })
        //     // 修改列表数据的
        //     this.$emit("setDataList", arr);
        // },
        
        // 撤销条件时候触发
        handleFiltersCancel(){
            this.airport= ""        // 机场
            this.flightTimes= ""    // 出发时间
            this.company= ""        // 航空公司
            this.airSize= ""      // 机型大小
            
        //修改列表数据
        this.$emit("setDataList",this.data.flights)
        },

        
    }
}
</script>

<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>