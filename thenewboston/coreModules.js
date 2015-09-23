/**
 * Created by Vietpn on 9/17/2015.
 */
//var fs = require("fs")
//
//fs.writeFileSync("corn.txt", "Corn is good, corn is life")
//console.log(fs.readFileSync("corn.txt").toString())

var path = require('path')

var websiteHome = "Desktop/Bucky/index.html"
var websiteAbout = "Desktop/Bucky/about.html"

console.log(path.normalize(websiteHome))
console.log(path.dirname(websiteHome))
console.log(path.basename(websiteHome))
console.log(path.extname(websiteHome))

setInterval(function(){
    console.log("beef")
}, 2000)

console.log(__dirname)
console.log(__filename)