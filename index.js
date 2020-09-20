const express = require('express');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

app.use(session({secret: 'nodeJsTodoList'}))
.use((req, res, next) => {
	if (typeof(req.session.todolist) == 'undefined') {
		req.session.todolist = [];
	}
	next();
})
.get('/todo', (req, res) => {
	res.render('todoList.ejs', {todolist: req.session.todolist});
})
.post('/todo/add/', urlencodedParser, (req, res) => {
	if (req.body.newItem != '') {
		req.session.todolist.push(req.body.newItem);
	}
	res.redirect('/todo');
})
.get('/todo/delete/:id', (req, res) => {
	if (req.params.id != '') {
		req.session.todolist.splice(req.params.id, 1);
	}
	res.redirect('/todo');
})
.use((req, res, next) => {
	res.redirect('/todo');
})
.listen(8080);