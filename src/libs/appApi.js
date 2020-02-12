export default {
    data() {
        return {
            path:"http://127.0.0.1:10000/"
        }
    },
    methods: {

        API_cityEpidemic() {
            return this.$get({
                url: this.path + "wuhan/cityEpidemic",
                data: {}
            });
        },
        API_cityEpidemicByCityCode(data) {
            return this.$get({
                url: this.path + "wuhan/cityEpidemicByCityCode",
                data: data
            });
        },
        API_sumNumber() {
            return this.$get({
                url: this.path + "wuhan/sumNumber",
                data: {}
            });
        },
    }
}
