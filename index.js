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
.post('/todo/update/:id', urlencodedParser, (req, res) => {
  if (req.body.updatedItem.trim() && req.params.id != null && req.session.todolist[req.params.id]) {
    req.session.todolist[req.params.id] = req.body.updatedItem;
  }
  res.redirect('/todo');
})
.post('/todo/add/', urlencodedParser, (req, res) => {
	if (req.body.newItem.trim()) {
		req.session.todolist.push(req.body.newItem);
	}
	res.redirect('/todo');
})
.post('/todo/delete/:id', (req, res) => {
	if (req.params.id) {
		req.session.todolist.splice(req.params.id, 1);
	}
	res.redirect('/todo');
})
.use((req, res, next) => {
	res.redirect('/todo');
})
.listen(8080);