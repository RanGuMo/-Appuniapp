<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang='scss'>
	/*每个页面公共css */
  @import url('colorui/icon.css');
  @import url('colorui/main.css');
  @import url('colorui/animation.css');
  @import './tuniao-ui/index.scss';
  @import './tuniao-ui/iconfont.css';
  @import url('./static/font/iconfont.css');
  
</style>
