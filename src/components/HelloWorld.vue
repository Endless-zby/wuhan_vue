<template>
    <main id="home" class="view">
        <div class="md-example-child md-example-child-swiper md-example-child-swiper-2">
            <md-swiper
                    @before-change="beforeChange"
                    @after-change="afterChange"
                    :autoplay="3000"
                    transition="fade"
                    ref="swiper">
                <md-swiper-item :key="$index" v-for="(item, $index) in simple">
                    <a href="javascript:void(0)"
                       class="banner-item"
                       :style="{'background': `${item.color}`}">{{item.text}}</a>
                </md-swiper-item>
            </md-swiper>
        </div>
        <div class="heading">
            <h1><span>症状</span></h1>
            <p>· 新型冠状病毒感染所致肺炎</p>
            <p>· 起初发热、乏力、干咳，逐渐出现呼吸困难等</p>
            <p>· 具备人传人的能力，正确佩戴口罩加强防护</p>
            <p>· 多数预后良好，少数病情危重，甚至死亡</p>
        </div>
        <md-button @click="sumNum">点此查询您近期有无接触</md-button>
        <div class="md-example-child md-example-child-amount md-example-child md-example-child-tag md-example-child-tag-2">
            <md-amount class="sure"
                       :value="sure"
                       :duration=2000
                       :precision=0
                       :transition=true
            ></md-amount>
            <tag size="large"
                 shape="square"
                 font-color="firebrick"
                 type="ghost"
            >确诊</tag>
        </div>
        <div class="md-example-child md-example-child-amount md-example-child md-example-child-tag md-example-child-tag-2">

            <md-amount class="cure"
                       :value="cure"
                       :duration=2000
                       :precision=0
                       :transition=true
            ></md-amount>
            <tag size="large"
                 shape="square"
                 font-color="darkcyan"
                 type="ghost"
            >治愈</tag>
        </div>
        <div class="md-example-child md-example-child-amount md-example-child md-example-child-tag md-example-child-tag-2">
            <md-amount class="die"
                       :value="die"
                       :duration=2000
                       :precision=0
                       :transition=true
            ></md-amount>
            <tag size="large"
                 shape="square"
                 font-color="black"
                 type="ghost"
            >死亡</tag>
        </div>

        <md-button @click="sumNum">点击刷新</md-button>
        <div class="md-example-child md-example-chart-child">
            <md-chart
                    :size="['7rem', '4rem']"
                    :max="60"
                    :min="0"
                    :step="10"
                    :lines="9"
                    :format="format"
                    :labels="['20200201', '20200202', '20200203', '20200204', '20200205', '20200206', '20200207']"
                    :datasets="[
        {
          color: '#5e64ff',
          width: 1,
          values: [10000, 12546, 16548, 18254, 20154, 22484, 25548, 29451, 32541, 35654, 39555, 40254, 42215]
        },
        {
          width: 1,
          values: [12545, 12354, 16353, 19354, 25478, 28452, 30484, 33785, 36755, 38547, 40547, 41025, 65421]
        }
      ]"
            />
        </div>

        <div class="md-example-child md-example-child-picker md-example-child-picker-2">
            <md-field>

                <md-field-item
                        title="省市区/县"
                        arrow="arrow-right"
                        :addon="pickerValue1"
                        @click="isPickerShow1 = true">
                </md-field-item>
            </md-field>
            <md-picker
                    ref="picker1"
                    v-model="isPickerShow1"
                    :data="pickerData1"
                    :cols="3"
                    is-cascade
                    large-radius
                    title="选择省市区/县"
                    @confirm="onPickerConfirm(1)"
            ></md-picker>
        </div>


    </main>
</template>

<script>
    import {Button, Toast} from 'mand-mobile'
    import {Chart} from 'mand-mobile'
    import {Swiper, SwiperItem} from 'mand-mobile'
    import simple from 'mand-mobile/components/swiper/demo/data/simple'
    import {Amount} from 'mand-mobile'
    import {Tag} from 'mand-mobile'
    import {Field, FieldItem, TabPicker} from 'mand-mobile'
    import {Picker} from 'mand-mobile'
    import district from 'mand-mobile/components/picker/demo/data/district'


    export default {
        name: 'App',
        components: {
            [Button.name]: Button,
            [Chart.name]: Chart,
            [Swiper.name]: Swiper,
            [SwiperItem.name]: SwiperItem,
            [Amount.name]: Amount,
            Tag,
            [Field.name]: Field,
            [FieldItem.name]: FieldItem,
            [TabPicker.name]: TabPicker,
            [Picker.name]: Picker,
            [Field.name]: Field,


        },
        data() {
            return {
                cityEpidemic: {},
                simple,
                sure: 1000,
                cure: 1000,
                die: 1000,
                show: false,
                address: [],
                isPickerShow0: false,
                isPickerShow1: false,
                pickerData0: simple,
                pickerData1: district,
                pickerValue0: '',
                pickerValue1: '',
            }

        },
        computed: {
            addressStr() {
                return this.address.map(item => item.label).join(' ')
            },
        },
        mounted() {
            Toast.loading("数据更新中。。。");
            this.sumNum();
            window.triggerSwiper3 = () => {
                this.goto()
            }
        },
        methods: {
            onPickerConfirm(index) {
                const values = this.$refs[`picker${index}`].getColumnValues()

                let res = ''
                values.forEach(value => {
                    value && (res += `${value.text || value.label} `)
                })
                this[`pickerValue${index}`] = res
            },
            handleChange({options}) {
                this.address = options
            },
            format(val) {
                return val
            },
            handleClick() {
                this.API_cityEpidemic().then(Result => {
                    console.log(Result.data)
                    this.cityEpidemic = Result.data
                    Toast.info('不错哟~')

                })
            },
            handleClick2() {
                let data = {cityCode: "3934"}
                this.API_cityEpidemicByCityCode(data).then(Result => {
                    console.log(Result.data)
                    this.cityEpidemic = Result.data
                    Toast.info('不错哟~')

                })
            },
            sumNum() {
                this.API_sumNumber().then(Result => {
                    console.log(Result.data)
                    Toast.hide()
                    if (Result.flag) {
                        this.sure = Result.data.sure
                        this.cure = Result.data.cure
                        this.die = Result.data.die
                        Toast.info('疫情信息刷新成功~')
                    } else {
                        Toast.info('请稍后再试~')
                    }
                }).catch(err => {
                    Toast.info("服务器连接出错。。。")
                })
            },
            setValue(id, value) {
                document.querySelector(id) && (document.querySelector(id).innerHTML = value)
            },
            beforeChange(from, to) {
                this.setValue('#valueSwiper10', from)
                this.setValue('#valueSwiper11', to)
            },
            afterChange(from, to) {
                this.setValue('#valueSwiper12', from)
                this.setValue('#valueSwiper13', to)
            },
            goto() {
                this.$refs.swiper.goto(2)
            },

        }
    }
</script>

<style lang="stylus" scoped>

    .sure
        color firebrick

    .cure
        color darkcyan

    .die
        color black

    svg
        display block
        margin 0 auto
        width 7rem
        height 4rem

    .view
        padding 0 20px

        .heading
            text-align center
            margin-bottom 48px

            .md-icon
                width 100px
                height 80px

            h1
                color #333
                line-height 1.15
                font-size 64px
                margin-bottom 32px

                span
                    position relative

                    &::after
                        content ""
                        position absolute
                        z-index -1
                        left 0
                        bottom 8px
                        width 100%
                        height 20px
                        background #ecf6ff

            p
                font-size 32px
                color #666
                line-height 56px
</style>
<style lang="stylus">
    .md-example-child-swiper-2
        height 250px

        .banner-item
            float left
            width 100%
            height 100%
            line-height 250px
            text-align center
            font-size 28px
            color #FFF
            box-align center
            align-items center
            box-pack center
            justify-content center
            text-decoration-line none
</style>
<style lang="stylus" scoped>
    .md-example-child-amount
        text-align center
        color #666
</style>
