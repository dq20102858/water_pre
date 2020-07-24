import store from '@/store'
const {
    body
} = document
const WIDTH = 1024
const RATIO = 3

export default {
  created() {
		this.msg = localStorage.getItem('msg')
	},
    beforeMount() {
        window.addEventListener('resize', this.resizeHandler)
    },


}
