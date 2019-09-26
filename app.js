const express = require('express')
const app = express()
const session = require('express-session')
const homeRouter = require('./routers/homeRouter')
const userRouter = require('./routers/userRouter')
const storyRouter = require('./routers/storyRouter')
const postRouter = require('./routers/postRouter')
const PORT = 3000
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.use('/', homeRouter)
app.use('/user', userRouter)
app.use('/story', storyRouter)
app.use('/story/posts', postRouter)

app.listen(PORT, () => console.log(`listening on port ${PORT}`))