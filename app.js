var alphabet = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", ".", "!", "?", ",", "'", ":", ";", " "]
var key = []
var input
var cypherext = []
var translation = []

//creates a placeholder key for testing, NOT SECURE!
var placeholderkey = []
for(i = 0; i < 100; i++){
    var x = Math.ceil(Math.random() * alphabet.length);
    placeholderkey.push(x)
}
document.getElementById("key").value = (placeholderkey)

//this is creates the int to select which mouse location will be selected
var topCount = Math.floor(Math.random() * (25 - 1)) + 1;
function newTopCount(){
    topCount = Math.floor(Math.random() * (25 - 1)) + 1;
}

function makenums(input){
    for(i = 0; i < input.length; i++){
        for(j = 0; j < alphabet.length; j++){
            if (input[i] == alphabet[j]){
                input[i] = j
                break
            }
        }
    }
}

function grab(select){
    key = document.getElementById("key").value
    key = key.split(',')
    input = document.getElementById("input").value
    if (select == 1){
        input = Array.from(input)
    }
    else{
        input = input.split(',')
    }
    
}

document.getElementById("encrypt").addEventListener('click', function()
{
    var select = 1
    grab(select)
    makenums(input)

    for(i = 0; i < input.length; i++){
        cypherext[i] = +input[i] + +key[i]
        if (cypherext[i] > alphabet.length){
            cypherext[i] -= alphabet.length
        }
    }
    document.getElementById("output").innerHTML = (cypherext)
})

document.getElementById("translate").addEventListener('click', function()
{
    var select = 0
    grab(select)

    for(i = 0; i < input.length; i++){
        translation[i] = +input[i] - +key[i]
        if (translation[i] < 0){
            translation[i] += alphabet.length
        }
    }

    for(i = 0; i < translation.length; i++){
        translation[i] = alphabet[translation[i]]
    }

    document.getElementById("output").innerHTML = (translation)
})

document.body.onkeyup = function(e){
    if(e.keyCode == 192){
        var count = 0
        var keySize = 0
        alert("begin key gen")
        key = []
        window.addEventListener('mousemove', function(e){
            count ++
            if (count == topCount && keySize <= 100){
                
                num1 = e.screenX
                sNum1 = num1.toString()
                num2 = e.screenY
                sNum2 = num2.toString()
                
                if (sNum1.length < sNum2.length){
                    timer = sNum1.length
                }
                else{
                    timer = sNum2.length
                }
                
                for (i = 0; i < timer; i++){
                    key.push("" + sNum1[i] + sNum2[i])
                    keySize++
                }
                console.log(key)

                count = 0
                newTopCount()
            }
            else if (keySize > 100){
                document.getElementById("key").value = (key)
            }
        });
    }
}