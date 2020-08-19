const router = require('koa-router')()
const sceneryController = require('../../controllers/scenery')
const passport = require("../../middlewares/passport")
const upload = require("../../middlewares/multer")


router.prefix('/api')

router.all('/*',
    passport.authenticate('jwt', { session: false })
    , async (ctx, next) => {
    console.log(ctx.request)
    await next()
})

router.get('/getsceneryinfo', sceneryController.getsceneryinfo)//获取景点信息

router.delete('/deletescenery/:id', sceneryController.deletescenery)//删除景点信息

router.post('/postscenery', upload.single('s_image'), sceneryController.postscenery)//添加景点信息

router.get('/getonesceneryinfo/:id', sceneryController.getonesceneryinfo)//获取需要编辑的景点的信息

router.put('/putonesceneryinfo/:id', sceneryController.putonesceneryinfo)//编辑景点信息

module.exports = router