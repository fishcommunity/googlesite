function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function sendFish() {
    var fish = document.getElementById("sendfishamount").value;
    var reciever = document.getElementById("sendfishto").value;
    var password = document.getElementById("sendfishpassword").value;

    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "amount": fish,
        "reciever": reciever,
        "password": password
    };

    var validInfo = false;

    if (fish != undefined && reciever != undefined && fish > 0) {
        validInfo = true;
    } else {
        document.getElementById("sentstatus").textContent = "Couldn't send fish!";
        document.getElementById("sentstatus").style.color = "#ea7b7b";
        delay(2000).then(() => {
            document.getElementById("sentstatus").innerHTML = "<br>";
        });
    }

    if (validInfo) {
        fetch('https://traoxfish.us-3.evennode.com/sendfish', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => {
            return response.json();
        }).then(json => {
            if (json.status == "success") {
                document.getElementById("sentstatus").textContent = "Fish successfully sent!";
                document.getElementById("sentstatus").style.color = "#84ea84";
                document.getElementById("sendfishamount").value = "";
                document.getElementById("sendfishto").value = "";
                document.getElementById("sendfishpassword").value = "";
                delay(2000).then(() => {
                    document.getElementById("sentstatus").innerHTML = "<br>";
                });
            } else {
                document.getElementById("sentstatus").textContent = json.error;
                document.getElementById("sentstatus").style.color = "#ea7b7b";
                delay(2000).then(() => {
                    document.getElementById("sentstatus").innerHTML = "<br>";
                })
            }
            getFish()
        });
    }

}

function formatNumber(value) {
    if (value >= 1010000000000000000)
        return (value / 1000000000000000).toFixed(2) + 'QQ'
    if (value >= 1000000000000000000)
        return (value / 1000000000000000).toFixed(0) + 'QQ'
    if (value >= 1010000000000000)
        return (value / 1000000000000).toFixed(2) + 'Q'
    if (value >= 1000000000000000)
        return (value / 1000000000000).toFixed(0) + 'Q'
    if (value >= 1010000000000)
        return (value / 1000000000).toFixed(2) + 'T'
    if (value >= 1000000000000)
        return (value / 1000000000).toFixed(0) + 'T'
    if (value >= 1010000000)
        return (value / 1000000).toFixed(2) + 'B'
    if (value >= 1000000000)
        return (value / 1000000).toFixed(0) + 'B'
    if (value >= 1010000)
        return (value / 1000000).toFixed(2) + 'M'
    if (value >= 1000000)
        return (value / 1000000).toFixed(0) + 'M'
    if (value >= 1010)
        return (value / 1000).toFixed(2) + 'K'
    if (value >= 1000)
        return (value / 1000).toFixed(0) + 'K'
    return value
}


document.getElementById('rarefishinfo').addEventListener('click',function (event){
    event.stopPropagation();
 });

function openShop() {
    document.getElementById("shop").style.display = "initial";
}

function closeShop() {
    document.getElementById("shop").style.display = "none";
}

document.getElementById("sendfishamount").oninput = function() {
    this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
}

document.getElementById("betamount").oninput = function() {
    this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
}

function buyItem(type) {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "purchaseType": type
    };
    fetch('https://traoxfish.us-3.evennode.com/makepurchase', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.newCost != undefined) {
            document.getElementById(type.toLowerCase()  + "cost").textContent = formatNumber(json.newCost) + " fish"
            getFish();
        }
    });
}

function sendMessage() {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "message": document.getElementById("messageinput").value
    };
    fetch('https://traoxfish.us-3.evennode.com/sendchatmessage', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {
        getMessages()
        document.getElementById("messageinput").value = ""
        delay(200).then(() => {
            document.getElementById("chat").scrollTo(0, document.getElementById("chat").scrollHeight)
        })
    });
}

function getMessages(first) {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
    };
    fetch('https://traoxfish.us-3.evennode.com/getchat', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.status == "success") {
            var chat = "";
            for (var message in json.messages.reverse()) {
                chat += json.messages[message] + "<br>"
            }
            document.getElementById("chat").innerHTML = chat
        }
        var scrollAmount = document.getElementById("chat").scrollTop / (document.getElementById("chat").scrollHeight - document.getElementById("chat").clientHeight)
        if (scrollAmount > 0.91) {
            document.getElementById("chat").scrollTo(0, document.getElementById("chat").scrollHeight)
        }
        if (first) {
            delay(100).then(() => { document.getElementById("chat").scrollTo(0, document.getElementById("chat").scrollHeight) } ) 
        }
    });
}

function getItemCosts(type) {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
    };
    fetch('https://traoxfish.us-3.evennode.com/getcosts', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.status == "success") {
            document.getElementById("rarefishcost").textContent = formatNumber(json.rareFishCost) + " fish"
            document.getElementById("veryrarefishcost").textContent = formatNumber(json.veryRareFishCost) + " fish"
            document.getElementById("sharkcost").textContent = formatNumber(json.sharkCost) + " fish"
            document.getElementById("raresharkcost").textContent = formatNumber(json.rareSharkCost) + " fish"
        }
    });
}

function getLeaderboardType() {
    return document.getElementById("leaderboardtype").value;
}

function updateLeaderboards() {

    var type = getLeaderboardType()
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "leaderboardType": type
    };
    fetch("https://traoxfish.us-3.evennode.com/getleaderboards", {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {

        if (json.status != "success" || json.leaderboards == undefined) return

        var i = 0;
        var leaderboard = document.getElementById("leaderboard");
        for (var fisher in json.leaderboards) {
            try {
                leaderboard.children.item(i).textContent = json.leaderboards[fisher].split(": ")[0] + ": " + formatNumber(Number(json.leaderboards[fisher].split(": ")[1]));
                if (json.onlineStatus[fisher]) {
                    leaderboard.children.item(i).style.color = "#84ea84";
                } else {
                    leaderboard.children.item(i).style.color = "#eeeeee";
                }
            } catch (e) {}
            i++
        }
        if (json.leaderboards.length > leaderboard.children.length) {
            for (var i = leaderboard.children.length; i < json.leaderboards.length; i++) {
                var item = document.createElement("li");
                try {
                    item.textContent = json.leaderboards[i].split(": ")[0] + ": " + formatNumber(Number(json.leaderboards[i].split(": ")[1]));
                    if (json.onlineStatus[i]) {
                        item.style.color = "#84ea84";
                    } else {
                        item.style.color = "#eeeeee";
                    }
                } catch (e) { console.log(e)}
                leaderboard.appendChild(item);
            }
        }
    });
}

var spinning = false
function spin() {

    if (spinning) return

    const data1 = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "bet": document.getElementById("betamount").value,
        "check": true
    };
    fetch("https://traoxfish.us-3.evennode.com/gamble", {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data1),
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.canAfford != true || json.status != "success") {
            document.getElementById("spininfo").innerText = "Cannot afford to bet!"
            document.getElementById("spininfo").style.color = "#ea7b7b";
            delay(2000).then(() => {
                document.getElementById("spininfo").innerHTML = "<br>"
            })
        } else {

            spinning = true

            var i = 0
            var i2 = 0
            var i3 = 0
        
            var int1
            var int2
            var int3
        
            int1 = setInterval(function(){
                i += 8
                document.getElementById("slot1").style.top = -((i % 226) + 54) + "px"
            }, 10)
            delay(200).then(() => {
                int2 = setInterval(function(){
                    i2 += 8
                    document.getElementById("slot2").style.top = -((i2 % 226) + 54) + "px"
                }, 10)
            })
            delay(400).then(() => {
                int3 = setInterval(function(){
                    i3 += 8
                    document.getElementById("slot3").style.top = -((i3 % 226) + 54) + "px"
                }, 10)
            })
        
            delay(2005).then(() => {
        
                const data = {
                    "username": getCookie("username"),
                    "loginKey": getCookie("loginKey"),
                    "bet": document.getElementById("betamount").value
                };
                fetch("https://traoxfish.us-3.evennode.com/gamble", {
                    method: 'POST',
                    credentials: "same-origin",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }).then(response => {
                    return response.json();
                }).then(json => {
            
                    if (json.status != "success") return
        
                    var slot1value = json.slot1
                    var slot2value = json.slot2
                    var slot3value = json.slot3
        
                    var valueToPx = {
                        2: "-54px",
                        5: "-96px",
                        25: "-224px",
                        100: "-139px",
                        1000: "-182px"
                    }
        
                    clearInterval(int1)
                    clearInterval(int2)
                    clearInterval(int3)
                    document.getElementById("slot1").style.top = valueToPx[slot1value];
                    document.getElementById("slot2").style.top = valueToPx[slot2value];
                    document.getElementById("slot3").style.top = valueToPx[slot3value];
                    spinning = false
        
                    if (Number(json.winnings) > 0 ) {
                        document.getElementById("spininfo").innerText = "You won " + formatNumber(Number(json.winnings)) + " fish!"
                        document.getElementById("spininfo").style.color = "#84ea84";
                    } else {
                        document.getElementById("spininfo").innerText = "You lost!"
                        document.getElementById("spininfo").style.color = "#ea7b7b";
                    }
                    delay(2000).then(() => {
                        document.getElementById("spininfo").innerHTML = "<br>"
                    })
        
                });
            })

        }
    });
}

function getLeaderboards() {
    
    var type = getLeaderboardType()
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "leaderboardType": type
    };
    fetch("https://traoxfish.us-3.evennode.com/getleaderboards", {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {
        for (var fisher in json.leaderboards) {
            var leaderboard = document.getElementById("leaderboard");
            var item = document.createElement("li");
            try {
                item.textContent = json.leaderboards[fisher].split(": ")[0] + ": " + formatNumber(Number(json.leaderboards[fisher].split(": ")[1]));
                if (json.onlineStatus[fisher]) {
                    item.style.color = "#84ea84";
                } else {
                    item.style.color = "#eeeeee";
                }
            } catch (e) { console.log(e)}
            leaderboard.appendChild(item);
        }
    });
}

function logout() {
    document.cookie = "loginKey=";
    document.cookie = "username=";
}

function checkIfLoggedIn() {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey")
    };
    fetch('https://traoxfish.us-3.evennode.com/checkkey', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.validKey == false) {
            window.location.replace("https://www.traox.dev/fish");
        }
    });

}

function keepOnline() {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey")
    };
    fetch('https://traoxfish.us-3.evennode.com/online', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {

    });
}

delay(5).then(() => {
    checkIfLoggedIn();
    getFish();
    getItemCosts();
    getMessages(true)
    delay(66).then(() => {
        updateLeaderboards();
    })

    setInterval(function(){ 
        keepOnline();
        updateLeaderboards();
    }, 500);

    setInterval(function(){ 
        checkIfLoggedIn();
        getFish();
        getItemCosts();
    }, 2000);

    setInterval(function(){ 
        checkIfCaptchaed();
        getMessages(false);
    }, 1000);
});

setInterval(function(){ 
    if (document.getElementById("autofish").checked) {
        goFishing(true)
        document.getElementById("fishbutton").className = "innactivebutton"
    } else {document.getElementById("fishbutton").className = "fishbutton"}

}, 400);

function getFish() {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey")
    };
    fetch('https://traoxfish.us-3.evennode.com/getdata', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.status == "success") {
            document.getElementById("fishcount").textContent = formatNumber(json.fish)
            document.getElementById("rarefishcount").textContent = formatNumber(json.rareFish)
            document.getElementById("veryrarefishcount").textContent = formatNumber(json.veryRareFish)
            document.getElementById("sharkcount").textContent = formatNumber(json.sharks)
            document.getElementById("raresharkcount").textContent = formatNumber(json.rareSharks)
        }
    });
}

const form  = document.getElementById('g-captcha');



form.addEventListener('submit', (event) => {
    const formData = new FormData(document.querySelector('form'))
    var cap = "";
    for (var pair of formData.entries()) {
        cap = (pair[1])
    }
    const data = {
        "g-recaptcha-response": cap
    };
    event.preventDefault();
    fetch('https://traoxfish.us-3.evennode.com/submitcaptcha', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.status == "success") {
            document.getElementById('captcha').style.display = "none";
            grecaptcha.reset()
            delete formData.entries()[0][1];
        }
    });
});

document.getElementById("messageinput").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage()
    }
})


function checkIfCaptchaed() {
    fetch('https://traoxfish.us-3.evennode.com/checkcaptchaed', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.status == "success") {
            if (json.captchaed) {
                document.getElementById('captcha').style.display = "initial";
            }
        }
    });
}

function instantTooltips(textFrom, delta) {

    delta = parseFloat(delta) ? parseFloat(delta) : 5;

    function reposition(e) {

      var tooltip = this.nextSibling;

      tooltip.style.top = (e.pageY + delta - 30) + 'px';
      tooltip.style.left = (e.pageX + delta) + 'px';
    }

    var toTitle = document.querySelectorAll('[' + textFrom + ']'),

      span = document.createElement('span'),

      textProp = 'textContent' in document ? 'textContent' : 'innerText',

      parent, spanClone;

    span.classList.add('createdTooltip');

    [].forEach.call(toTitle, function(elem) {

      parent = elem.parentNode;

      spanClone = span.cloneNode();

      spanClone[textProp] = elem.getAttribute(textFrom);

      parent.insertBefore(spanClone, elem.nextSibling);

      elem.addEventListener('mousemove', reposition);

      elem.setAttribute(textFrom, '');
    });
  }



instantTooltips('title', 15);



function goFishing(force) {
    if (!force && document.getElementById("autofish").checked) return;

    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey")
    };
    fetch('https://traoxfish.us-3.evennode.com/fish', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.status == "success") {
            document.getElementById("fishcount").textContent = formatNumber(json.fish)
        }
    });
}
