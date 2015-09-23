/**
 * Created by Mr.vietpn on 9/16/2015.
 */

var Bucky = {
    printFirstName: function(){
        console.log("My name is Bucky")
        console.log(this === Bucky)
    }
}

Bucky.printFirstName()

// the default calling context is global
function doSomethingWorthless(){
    console.log("\nI am worthless")
    console.log(this === global)
}

doSomethingWorthless()
