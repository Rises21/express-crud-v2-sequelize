// const express = require('express');
// const ejsLayout = require('express-ejs-layouts');
// const app = express();
// const port = process.env.PORT || 3000;


// app.set('view engine','ejs');//use ejs

// app.use(ejsLayout);//use express-ejs-layouts


// app.get('/', (req, res) => {
// 	//res.sendFile('./html/index.html', { root: __dirname });
// 	res.render('home', {
// 		layout: './layout/layout',
// 		pageTitle: 'Homepage'
// 	})
// });

// app.get('/about', (req, res) => {
// 	//res.sendFile('./html/about.html', { root: __dirname });
// 	res.render('about', {
// 		layout: './layout/layout',
// 		pageTitle: 'About Page'
// 	})
// });

// app.get('/contact', (req, res) => {
// 	//res.sendFile('./html/contact.html', { root: __dirname }); //root saat ini adalah folder expressjs
// 	res.render('contact', {
// 		layout: './layout/layout',
// 		pageTitle: 'Contact Page'
// 	})
// });



// app.use('/', (req, res) => {
// 	res.status(404);
// 	res.send('Error 404 !');
// })

// app.listen(port, () => {
// 	console.log(`Server Express Running at PORT : ${port}`);
// });

//------------------------------------------------------------------------------------------------
//learn using pure node js
//module system 
// const {hello, world} = require('./module');
// const http = require('http');

// const server = http.createServer((req, res) => {

// 	switch (req.url) { //make simple routing without express
// 		case '/':
// 			home(res);
// 			break;
// 		case '/welcome':
// 			welcome(res);
// 			break;
	
// 		default:
// 			page404(res); 
// 			break;
// 	}
// });
	
// 	const home = res => {
// 		res.end('<h1>HOME</h1>');
// 	};

// 	const welcome = res => {
// 		res.statusCode = 200;
// 		res.setHeader('Content-Type', 'application/json')
// 		res.write(JSON.stringify({
// 			status: 'successfully',
// 			message: 'Welcome to MERN class'
// 	}));
// 		res.end();
// 	};

// 	const page404 = res => {
// 		res.statusCode = 404;
// 		res.setHeader('Content-Type', 'text/json')
// 		res.write(JSON.stringify({
// 			status: 'Failed',
// 			message: 'Resource Not Found!'
// 	}));
// 		res.end();
// 	};


// server.listen(3000, () => console.log('Server running at http:127.0.0.1:3000'));
//----------------------------------------------------------------------------------------------------


const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const logger = require('morgan');
const cors = require('cors');
const productRouter = require('./app/product/routes');
const database = require('./config/sequelize');
const productRouterV2 = require('./app/product_v2/routes');


app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
database
	.sync({alter: true}) //lakukan sinkronisasi tabel yang ada dalam db agar sesuai dengan skema model yang akan di buat
	.then(() => {
		console.info('Database Synced');
	})
	.catch((err) => {
		console.error(`Failed to Sync Database: ${err.message}`);
	});

app.get('/', (req, res) => {
	res.json({
		message: "Please change the route path to https://express-crud-v2-sequelize.onrender.com/api/v2/product"
	});
})
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api/v1', productRouter);
app.use('/api/v2', productRouterV2);


app.use((req, res) => {
	res.send({
		status: 'failed',
		message: 'resource ' + req.originalUrl + ' not found'
	});
});

app.listen(port, () => console.log(`Server running at PORT : ${port}`));