
const router = require('express').Router();
const multer = require('multer');
//const path = require('path');
const upload = multer({dest: 'uploads'});
//const fs = require('fs');
const productController = require('./controller');


router.get('/product', productController.index);

router.get('/product/:id', productController.viewProduct);

router.post('/store', upload.single('image'), productController.store);

router.put('/product/:id', upload.single('image'), productController.update);
router.delete('/product/:id', productController.destroy);

// router.post('/profile', upload.single('image'), (req, res) => {
//     const { name, price, stock, status } = req.body;
//     const image = req.file;
//     // const target = image ? path.join(__dirname, 'uploads', image.originalname):null;
//     //     fs.renameSync(image.path, target);
//     if (image) {
//         const target = path.join(__dirname, 'uploads', image.originalname);
//         fs.renameSync(image.path, target);
//     // res.json({
//     //     name,
//     //     price,
//     //     stock,
//     //     status,
//     //     image
//     // });  
//     res.sendFile(target);      
//     }

// });


module.exports = router;