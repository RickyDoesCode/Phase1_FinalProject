const express = require('express')
const app = express()
const homeRouter = require('./routers/homeRouter')
const userRouter = require('./routers/userRouter')
const storyRouter = require('./routers/storyRouter')
const postRouter = require('./routers/postRouter')
const PORT = 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.use('/', homeRouter)
app.use('/user', userRouter)
app.use('/story', storyRouter)
app.use('/post', postRouter)

app.listen(PORT, () => console.log(`listening on port ${PORT}`))