const connection = require('../../config/mysql');

const path = require('path');
const fs = require('fs');

    let sql = '';
    let values = [];

const index = (req, res) => {
    const {search} = req.query; // query sring route
    console.log(search,'<<<<<');
    if (search) {
        execute = {
         sql : 'SELECT * FROM products WHERE name LIKE ?',
        values : [`%${search}%`]
        }
    } else {
         execute = {sql : 'SELECT * FROM products'}
    }
    connection.query({ //koneksi bisa dibuat secara implisit menggunakan connection.query
        ...execute
    }, _response(res));
};


const viewProduct = (req, res) => {
    connection.query({ //koneksi bisa dibuat secara implisit menggunakan connection.query
        sql: 'SELECT * FROM products WHERE id = ?',
        values: [req.params.id]
     }, _response(res));
};

const destroy = (req, res) => {
    connection.query({ //koneksi bisa dibuat secara implisit menggunakan connection.query
        sql: 'DELETE FROM products WHERE id = ?',
        values: [req.params.id]
     }, _response(res));
};

const store = (req, res) => {
    const { users_id, name, price, stock, status} = req.body; //destructuring coulmn from tables on db

    const image = req.file;
    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);     
    }

    connection.query({ //koneksi bisa dibuat secara implisit menggunakan connection.query
        sql: `INSERT INTO products (users_id, name, price, stock, status, image_url) VALUES (?, ?, ?, ?, ?, ?)`,
        values: [ parseInt(users_id), name, price, stock, status, `http://localhost:3000/public/${image.originalname}`]
     }, _response(res));
};



const update = (req, res) => {
    const { users_id, name, price, stock, status} = req.body; //destructuring coulmn from tables on db

    const image = req.file;


    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target); 
        sql =  `UPDATE products SET users_id = ?, name = ?, price = ?, stock = ?, status = ?, image_url = ? WHERE id = ?`;
        values = [ parseInt(users_id), name, price, stock, status, `http://localhost:3000/public/${image.originalname}`, req.params.id];
    } else {
        sql = `UPDATE products SET users_id = ?, name = ?, price = ?, stock = ?, status = ?, WHERE id = ?`;
        values = [ parseInt(users_id), name, price, stock, status,req.params.id ];
    }

    connection.query({ //koneksi bisa dibuat secara implisit menggunakan connection.query
     sql, values   
     }, _response(res));
};




const _response = (res) => {
    return(error, result) => {
        //console.log(result[0],"<<<<");
        if (error) {
            res.send({
                status: 'failed',
                response: error
            });
        }
        res.send({
                //status: result[0] ? 'success' : 'Data not found' ,
                status: 'success',
                response: result
            })
    }
    //connection.end(); Menutup koneksi dilakukan dengan menggunakan end() yang memastikan semua kueri yang tersisa dijalankan sebelum mengirim paket keluar ke server mysql.

}

module.exports = { index, viewProduct, store, update, destroy };