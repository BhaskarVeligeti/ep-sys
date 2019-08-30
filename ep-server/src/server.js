const express = require('express');
const graphqlHTTP = require('express-graphql') // compatability layer between express and GraphQL
const schema = require('./graphql/schema')
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false) // warning hide
const bodyParser = require('body-parser');
const requireAuth = require('./middlewares/requireAuth')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const authRoutes = require('./routes/authRoutes')

/*
it is Express API
*/
// step 1:Creates an Express application.
const app = express();


// step 2: teach to express about json body
app.use(bodyParser.json())

// step 3: authRoutes HTTP requets hand over to express only ( not GraphQL) :signin,signup
app.use(authRoutes);


/* step 4: Make sure that a user  have a valid token.
 */


app.get('/',
  requireAuth,
  (req, res) => {
    res.send(`Your username :${req.user.username}`)
  }
  )


/*
step 5: if any request comes into our express looking for the route /graphql 
then we want the graphql library to handle it.
*/
app.use('/graphql',
// requireAuth,
  graphqlHTTP({
    schema,
    graphiql:true
  }),
  (req, res) => {
    res.send(`Your username :${req.user.username}`)
  },

)




const MONGO_URI = 'mongodb://localhost:27017/EPdb'
if (!MONGO_URI) {
  throw new Error('You must provide a EPdb URI')
}

// Mongoose's built in promise library is deprecated, replace it with ES2015 Promise
mongoose.Promise = global.Promise

const options = {
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// Or using promises
mongoose.connect(MONGO_URI, options).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    console.log('Connected to MongoDB EPdb Instance...')
  },
  error => {
    console.log('Error connecting to MongoDB:', error)
  }
)

// Configures express to use sessions.  This places an encrypted identifier
// on the users cookie.  When a user makes a request, this middleware examines
// the cookie and modifies the request object to indicate which user made the request
// The cookie itself only contains the id of a session; more data about the session
// is stored inside of MongoDB.
app.use(session({
  secret: 'abc',
  cookie: { maxAge: 60000 },
  resave: true,
  saveUninitialized: true,
  // store: new MongoStore({
  //   url: MONGO_URI,
  //   autoReconnect: true,
  // })    // TODO:  fix this later
}))


module.exports = app

