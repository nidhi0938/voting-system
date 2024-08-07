
//Express Code and neccessary depencies and Libraries
const express=require('express');
const app=express();
const port =3005;
const path = require('path');

//Use body parser middle
const bodyParser = require('body-parser');

//Routes
const userRoute=require('./routes/userRoute')
const adminRoute=require('./routes/adminRoute')
const usersRoute=require('./routes/usersRoute')
const electionRoute=require('./routes/electionRoute')
const partyRoute=require('./routes/partyRoute')
const candidateRoute=require('./routes/candidateRoute')
const castVoteRoute=require('./routes/castVoteRoute')
const logRoute=require('./routes/logRoute')
const userDetails=require('./routes/userDetailsRoute')
const electionCandidateRoute=require('./routes/electionCandidateRoute')

//Authentication and set static directory path
const authorization = require('./utils/authorizationMiddleware');
const cookieParser = require("cookie-parser");

//DB Connection
require('./utils/db')
app.use(express.static(path.join(__dirname, 'static')));
app.use(cookieParser());
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); // For parsing form data

//Use Route
app.use('/users',userRoute);
app.use('/admin',authorization.restrictToLoggedinUserOnly,authorization.requireRoles(['Admin']),adminRoute);
app.use('/election',authorization.restrictToLoggedinUserOnly,authorization.requireRoles(['Admin']),electionRoute);
app.use('/party',authorization.restrictToLoggedinUserOnly,authorization.requireRoles(['Admin']), partyRoute);
app.use('/candidate',authorization.restrictToLoggedinUserOnly,authorization.requireRoles(['Admin']), candidateRoute);
app.use('/userDetails',authorization.restrictToLoggedinUserOnly,authorization.requireRoles(['Admin','User']), userDetails);
app.use('/electionCandidate',authorization.restrictToLoggedinUserOnly,authorization.requireRoles(['Admin']), electionCandidateRoute);
app.use('/user',authorization.restrictToLoggedinUserOnly,authorization.requireRoles(['User']),usersRoute);
app.use('/castVote',authorization.restrictToLoggedinUserOnly,authorization.requireRoles(['User']),castVoteRoute);
app.use('/log',logRoute);


//Main Landing Page
app.get('/', (req, res) => {
  res.render('landingNavbar', { page: 'login', navbarButtonText: 'Sign In' });

});

//Sign Up Page
app.get('/SignUp', (req, res) => {
  res.render('landingNavbar', { page: 'signup', navbarButtonText: 'Sign In' });
});

app.use((req, res) => {
  res.render('userDashboard')
})

//Listening the app
app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
});