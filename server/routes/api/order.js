const router = require('koa-router')()
const orderController = require('../../controllers/order')
const passport = require("../../middlewares/passport")


router.prefix('/api')

router.all('/*',
    passport.authenticate('jwt', { session: false })
    , async (ctx, next) => {
    console.log(ctx.request)
    await next()
})

router.get('/allorderinfo', orderController.allorderinfo) //管理员获取所有预约单

router.delete('/deleteorder/:id', orderController.deleteorder) //管理员删除预约单

router.post('/postorderinfo/:id', orderController.postorderinfo) //管理员分配预约单

router.put('/postorderinfo/:id', orderController.putorderinfo) //管理员取消分配预约单

router.post('/postorder', orderController.postorder) //填写预约单

router.get('/showorderinfo', orderController.showorderinfo) //获取用户预约单

router.put('/putorder', orderController.putorder) //系统自身修改预约单结果

router.put('/putbuttonorder', orderController.putbuttonorder) //点击到达按钮后修改预约单结果

module.exports = router