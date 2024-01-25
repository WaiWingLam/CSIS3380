const express = require(`express`);
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    bmi = "BMI not yet calculated"
    res.render('bmi', {result: bmi})
})

app.post('/', (req,res) => {
    if(Number.parseFloat(req.body.height) && Number.parseFloat(req.body.weight)) {
        height = Number(req.body.height)
        weight = Number(req.body.weight)
    
        console.log(req.body)

        bmitest = Math.floor((weight/(height*height))*10000)

        if(5 < bmitest && bmitest < 70){
        bmi = "Your BMI is " + Math.floor((weight/(height*height))*10000)
        } else {
            bmi = "There may be something wrong, please check again."
        }
        res.render('bmi', {result: bmi})
    } else {
        console.log(req.body)

        bmi = "There may be something wrong, please check again."
        res.render('bmi', {result: bmi})
    }
})

app.get('*', (req, res, next) => {
    res.status(200).send('Sorry, requested page not found.');
    next();
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});