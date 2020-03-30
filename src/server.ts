import app from './app'
import { createConnection } from 'typeorm'
import 'pg'

createConnection()

app.listen(process.env.PORT, () => {
    console.log('Server is running to port', process.env.PORT)
});