const router = require('express').Router();
const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
const upload = multer({dest: 'uploads'});
const productControllerV2 = require('../product_v2/controllerV2');

router.get('/', (req, res) => {
    res.json({
        message: "Node.js REST API Server",
    })
});
router.post('/product', upload.single('image'), productControllerV2.index);
router.get('/product', productControllerV2.display);
router.get('/product/:id', productControllerV2.findID);
router.put('/product/:id', upload.single('image'),productControllerV2.updateProduct);
router.delete('/product/:id', productControllerV2.deleteProduct);
// router.post('/product', upload.single('image'), async (req, res) => {
//     const { users_id, name, price, stock, status } = req.body;
//      const image = req.file;

//     if (image) {
//         const target = path.join(__dirname, '../../uploads', image.originalname);
//         fs.renameSync(image.path, target);     
//     }

//    try {
//     await Product.sync();
//     const result = Product.create({ users_id, name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}` });   
//     res.send(result);
//    } catch (error) {
//     res.send(error);
//    }

// });

module.exports = router;