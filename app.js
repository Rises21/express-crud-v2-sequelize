const express = require('express');
const ejs = require('ejs');
const ejsLayout = require('express-ejs-layouts');
const app = express();
const port = process.env.PORT || 3000;


app.set('view engine', 'ejs');//use ejs
app.use(ejsLayout);//use express-ejs-layouts


app.get('/', (req, res) => {
	//res.sendFile('./html/index.html', { root: __dirname });
	res.render('index', {
		layout: './layout/layout',
		pageTitle: 'Homepage'
	})
});

app.get('/about', (req, res) => {
	//res.sendFile('./html/about.html', { root: __dirname });
	res.render('about', {
		layout: './layout/layout',
		pageTitle: 'About Page'
	})
});

app.get('/contact', (req, res) => {
	//res.sendFile('./html/contact.html', { root: __dirname }); //root saat ini adalah folder expressjs
	res.render('contact', {
		layout: './layout/layout',
		pageTitle: 'Contact Page'
	})
});



app.use('/', (req, res) => {
	res.status(404);
	res.send('Error 404 !');
})

app.listen(port, () => {
	console.log(`Server Express Running at PORT : ${port}`);
});