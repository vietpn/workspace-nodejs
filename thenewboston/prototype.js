/**
 * Created by Vietpn on 9/17/2015.
 */
function User(){
    this.name = ""
    this.life = 100
    this.giveLife = function giveLife(targetPlayer){
        targetPlayer.life += 1
        console.log(this.name + " gave 1 life to " + targetPlayer.name)
    }
}

var Bucky = new User()
var Wendy = new User()

Bucky.name = "Bucky"
Wendy.name = "Wendy"

Bucky.giveLife(Wendy)
console.log("Bucky: " + Bucky.life)
console.log("Wendy: " + Wendy.life)

// add function in object
User.prototype.upperCut = function upperCut(targetPlayer){
    targetPlayer.life -= 3
    console.log(this.name + " uppercutted " + targetPlayer.name)
}

Wendy.upperCut(Bucky)
console.log("Bucky: " + Bucky.life)
console.log("Wendy: " + Wendy.life)

// add property in object
User.prototype.magic = 60
console.log(Bucky.magic)
console.log(Wendy.magic)