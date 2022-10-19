// Starting here backend 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const _ = require("lodash");

app.use(express.static('visible'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
let blogTitles = [];
let blogBodies = [];

app.get('/', (req, res) => {

    res.render('index');
})

app.get("/blogs", (req, res) => {

    res.render("blog", { blogTitle: blogTitles, blogBody: blogBodies });
})

app.get("/publish", (req, res) => {
    res.render("publish");
})
app.post("/publish", (req, res) => {
    let title = req.body.blogTitle;
    let body = req.body.blogBody;
    blogTitles.push(title);
    blogBodies.push(body);
    res.redirect("/blogs");

})

app.get("/blogs/:name", (req, res) => {
    let param = req.params.name;
    let requiredParam = _.lowerCase(param);
    let storedTitles = _.lowerCase(blogTitles);
    //    Comparing both values
    if (requiredParam == storedTitles) {
        let equal = {};
        for (i = 0; i < blogTitles.length; i++) {
            let titleLoop = _.lowerCase(blogTitles[i]);
            let bodyLoop = blogBodies[i];
            //  storing their values in object
            equal = {
                title: titleLoop,
                body: bodyLoop
            };
            if (titleLoop == requiredParam) { break; }
        }
        // sending response to the user .
        res.render("detail", { blogTitle: equal.title, blogBody: equal.body });

        // just checking if it worked.
        console.log("loading");

    }

});





app.listen(3000, () => {
    console.log('listening on 3000.')
});




























//!!!!!!!!!!!!!!!!!Code for Light Mode !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// function lightMode() {
//     // Main page code dark and light

//     $('#black').toggleClass('black');
//     $('#black').toggleClass('.light');

//     //maps page dark light mode
//     $('#black1').toggleClass('.black');
//     $('#black1').toggleClass('light');

//     $('#icon').toggleClass('iconlight');
//     $('#icon1').toggleClass('iconlight');
//     $('#icon2').toggleClass('iconlight');
// }

// Code for light mode ends ^ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


