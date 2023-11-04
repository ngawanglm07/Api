import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const Api_url = 'https://api.punkapi.com/v2';
const port = 3000;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())


// checking how many data is there ( pov this is not official and is just to check the page)
app.get('/data', async (req,res)=>{
    try{
      const response = await axios.get(`${Api_url}/beers/`);
      res.json(response.data)
    } catch(err){
 console.log(err)
    }
});



// getting all the data and displaying it in the /posts route buy  using the home page AKA home.ejs
app.get('/', async (req,res)=>{
    try{
      const response = await axios.get(`${Api_url}/beers/`);
      res.render('home.ejs',{posts:response.data});
    } catch(err){
 console.log(err)
    }
})

// finding the post using a input where we give name as findData and action to /name route using the get method then
// we using req.query.findData to pull what is given on the input after that we add it into find variable and the using axios.get
// to find the post once we find the post we will render it 

app.get('/name' , async (req,res)=>{
   console.log(req.query.findData)
try{
    const find = req.query.findData;
    const foundPost = await axios.get(`${Api_url}/beers/?beer_name=${find}`)
    if(foundPost){
        res.render('searchedPost.ejs' , {posts: foundPost.data})
    } else {
        res.redirect('/')
    }
} catch(err){
  console.log(err)
}
})

app.listen(port , ()=>{
    console.log(`server is running at port ${port}`)
})