const express = require('express');
const app = express();

const records = require('./records');

app.use(express.json())

//GET /getusers
app.get('/data', async (req,res) => {
    const data = await records.getQuotes();
    res.json(data)
})

//GET /getuser/id
app.get('/data/:id', async (req,res) => {
    try{
        const data = await records.getQuote(req.params.id)
        if(data) {
          res.json(data)
        } else {
          res.status(404).json({message: "No such user"})
        }
      } catch(err){
        res.status(500).json({message: err.message})
      }
})

//GET /getrandomuser

app.get('/getrandomuser', async (req, res) =>{
    const data = await records.getRandomQuote();
    res.json(data)
})

//POST /newuser

app.post('/data', async (req, res) => {
    try {
        const quote = await records.createQuote(
        {
          id: Math.floor(Math.random() * 10000),
          email: req.body.email,
          username: req.body.username
        }
      )
      res.json(quote)
      } catch (err) {
        res.json({message: err.message})
      }
})

//PUT /user/:id

app.put('/data/:id', async (req, res) => {
    try{
      const data = await records.getQuote(req.params.id)
      if(data) {
        data.email = req.body.email
        data.username = req.body.username
  
        await records.updateQuote(data)
        res.json({message: "Changed"})
        res.status(204).end()
  
      } else {
        {res.status(404).json({message: "User not found."})}
      }
    }
    catch(err){
      res.status(500).json({message: err.message})
    }
  })

//DELETE /user/:id
app.delete('/data/:id', async (req,res) =>{
    try{
      const quote = await records.getQuote(req.params.id)
      await records.deleteQuote(quote)
      res.json({message:"Data deleted"})
      res.status(204).end()
    } catch(err){
      next(err)
    }
  })
  
app.use((req,res,next) => {
    const err = new Error("Not found")
    err.status = 404;
    next(err)
  })
  
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
      error: {
        message: err.message
      }
    })
  }) 

app.listen(3000, () => console.log('Port 3000 is started!'));