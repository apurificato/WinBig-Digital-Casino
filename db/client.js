require('dotenv').config()
const { Sequelize } = require('sequelize')
const is_prod = process.env.NODE_ENV

const client = is_prod ? new Sequelize(process.env.DATABASE_URL,
    {
        ssl: {rejectUnauthourized: false}
    }) :
    new Sequelize(
        'win_big_db',
        'postgres',
        'pass',
        {
            host: 'localhost',
            dialect: 'postgres',
            logging: false
        }
    )

module.exports = client