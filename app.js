const express = require('express')
const app = express()
const homeRouter = require('./routers/homeRouter')
const userRouter = require('./routers/userRouter')
const storyRouter = require('./routers/storyRouter')
const PORT = 3000
app.set('view engine', 'ejs')

app.use('/', homeRouter)
app.use('/user', userRouter)
app.use('/story', storyRouter)

app.listen(PORT, () => console.log(`listening on port ${PORT}`))