/**
 * Externals modules
 */
const express = require('express')
const exphbs = require('express-handlebars')

/**
 * Database connection
 */
const conn = require('./db/conn')

/**
 * Require Modules
 */
const Task = require('./models/Task')

/**
 * Require Routes
 */
const tasksRoutes = require('./routes/tasksRoutes')

/**
 * Express constant
 */
const app = express()

/**
 * Ready data of body of views
 */
app.use(
    express.urlencoded({
        extended: true,
    })
)

/**
 * Get data to Json
 */
app.use(express.json())

/**
 * Partials path
 */
const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

/**
 * Setup do handlebars e view engine
 */
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

/**
 * Setup da pasta estática public, para armazenar CSS, JS e imagens
 */

app.use(express.static('public'))

/**
 * Import routes
 */
app.use('/tasks', tasksRoutes)

app.use('/', (req, res) => {
    res.redirect('tasks')
})

/**
 * Conditioning database persistence with connection port
 */
conn
    .sync()
    //.sync({ force: true })
    .then(() => {
        app.listen(3000)
    })
    .catch((err) => console.log(err))