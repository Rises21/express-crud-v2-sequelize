
const Product = require('./model');
const path = require('path');
const fs = require('fs');

const internalServerError = {
        status: 500,
        success: false,
        message: "internal server error!",
        dataLaptop: null,
        error: "Internal Server Error",
    }

const index = async (req, res) => {
   try {
     const { user_id, name, price, stock, status } = req.body;
     const image = req.file;

    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);     
    }

    const laptop = await Product.create({ user_id, name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}` });
    return res.status(201).json({
        status: 201,
        success: true,
        message: "Laptop baru sudah ditambahkan",
        dataLaptop: { laptop },
        error: null,
    });
   } catch (error) {
    console.error(error);
    return res.status(500).json(internalServerError);
   }
};

const display = async (req, res) => {
   try {
    const laptops = await Product.findAll();
    return res.status(201).json({
        status: 201,
        success: true,
        message: "List product terdaftar berhasil di akses",
        dataLaptop: { laptops },
        error: null,
    });
   } catch (error) {
    console.error(error);
    return res.status(500).json(internalServerError);
   }
};

const findID = async (req, res) => {
   try {
    const { id } = req.params;
    const laptop = await Product.findOne({
        where: { id },
    });

        if (!laptop) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Laptop tidak ditemukan",
                dataLaptop: null,
                error: "LAPTOP TIDAK DITEMUKAN",
            });
        }

    return res.status(200).json({
        status: 200,
        success: true,
        message: `Berhasil menampilkan product dengan ID ${id}.`,
        dataLaptop: { laptop },
        error: null,
    });
   } catch (error) {
    console.error(error);
    return res.status(500).json(internalServerError);
   }
};


const updateProduct = async (req, res) => {
   try {
    const { id } = req.params;
    const laptop = await Product.update({
        where: { id },
    });

        if (!laptop[0]) {
            return res.status(200).json({
                status: 200,
                success: false,
                message: "Gagal memperbaharui data Laptop",
                dataLaptop: null,
                error: "LAPTOP GAGAL DIPERBAHARUI",
            });
        }

    return res.status(200).json({
        status: 200,
        success: true,
        message: `Berhasil memperbaharui Laptop dengan ID ${id}.`,
        dataLaptop: { laptop },
        error: null,
    });
   } catch (error) {
    console.error(error);
    return res.status(500).json(internalServerError);
   }
};

const deleteProduct = async (req, res) => {
   try {
    const { id } = req.params;
    let laptop;
    let laptopDeleted = [];
        const laptopDelete = await Product.findOne({
        where: { id },
    });
    laptopDeleted.push(laptopDelete);

    setTimeout(async ({ id } = req.params) => {
            laptop = await Product.destroy({
            where: { id },
        });

                if (!laptop) {
                return res.status(200).json({
                    status: 200,
                    success: false,
                    message: "Gagal menghapus data Laptop",
                    dataLaptop: null,
                    error: "GAGAL MENGHAPUS DATA LAPTOP",
                });
            }

        return res.status(200).json({
            status: 200,
            success: true,
            message: `Berhasil menghapus data Laptop dengan ID ${id}.`,
            dataLaptop: laptopDeleted,
            error: null,
        });

    }, 1000);



   } catch (error) {
    console.error(error);
    return res.status(500).json(internalServerError);
   }
};

module.exports = { index, display, findID, updateProduct, deleteProduct };