export default {
    data() {
        return {

        }
    },
    methods: {

        API_cityEpidemic() {
            return this.$get({
                url:"http://127.0.0.1:10000/wuhan/cityEpidemic",
                data: {}
            });
        },
        API_cityEpidemicByCityCode(data) {
            return this.$get({
                url:"http://127.0.0.1:10000/wuhan/cityEpidemicByCityCode",
                data: data
            });
        },
    }
}
