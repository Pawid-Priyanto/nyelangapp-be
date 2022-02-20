const express = require('express');
const app = express();
const PORT = 7000;
const dbConnection = require('./db')
app.use(express.json())


app.use('/api/products/' , require('./routes/productRoute'))
app.use('/api/users/' , require('./routes/userRoute'))
app.use('/api/bookings/' , require('./routes/bookingRoute'))

const path = require('path')

if(process.env.NODE_ENV==='production')
{

    app.use('/' , express.static('frontend/build'))

    app.get('*' , (req , res)=>{

          res.sendFile(path.resolve(__dirname, 'frontend/build/index.html'));

    })

}

app.get('/', (req, res) => res.send('welcome to api'));
app.listen(process.env.PORT || 5000, () => console.log(`node js running on PORT ${PORT}`));

