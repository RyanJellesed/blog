var express    = require('express'); // makes sure the express library can be used in our code otherwise our code will not know what express is
var app        = express();
var bodyParser = require('body-parser'); // body parser is a package and the 'require' says to pull in body-parser into express

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/blogPosts');

var blogPostRouter = require ('./routes/blogPosts');

var BlogPost       = require('./models/blogPosts');

app.use(bodyParser.urlencoded({ extended: true}));  // app.use is the important part.  It mounts middleware. You need the rest, 'Harold says he doesn't even really understand it'
app.use(bodyParser.json());




app.use(express.static('public')); //  configures to use all the files in the public folder as static files

app.set('view engine', 'ejs');

var port = process.env.PORT || 8080; // this sets the port we are going to use 


// app.get connects to our router to our app
// it looks in our index which is represented by our /
// the / is not needed but is a best practice to point at our root directory
// the function parametes are a Request, Response pair
//  
app.get('/', function(req, res) {
	res.render('index', {title: 'This is my blog.'})
	// if our index gets a request
	// we will render a response of 'This is my bears app.'
});


app.get('/blog', function(req, res) {
	BlogPost.find(function(err, blogPosts) {
		if(err) {
			console.log(err);
		} else {
			res.render('blog', { blogPosts: blogPosts })
		}
	})
});
	
app.get('/blogPosts', function(req, res) {
	BlogPost.find(function(err, blogPosts) {
		if(err) {
			console.log(err);
		} else {
			res.render('blogPosts', { blogPosts: blogPosts })
		}
	})
});


app.get('/about', function(req, res) {
	var data = {};
	data.title = 'About Page';
	data.name = 'Ryan';
	data.time = new Date();

	res.render('about', data);
});

app.get('/contact', function (req, res) {
	res.render('contact');
})

app.get('/blog', function (req, res) {
	res.render('blogPosts');
})

app.get('/comment', function (req, res) {
	res.render('comment');
})



app.use('/api', blogPostRouter);  // app.get needs this app.use in order to be used as middleware 

// we debug server js in our terminal
// if this works we will see the string in our terminal
app.listen(port, function() {
	// this prints in our terminal
	// this was the specific terminal we did our nodemon server.js 
	console.log('Magic happens on port ' + port)
});


