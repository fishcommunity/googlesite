const urlParams = new URLSearchParams(window.location.search);

function getCookie(cname) {

    return urlParams.get(cname);
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function formatNumber(value) {
    if (value >= 1011000000000000000)
        return ((value / 1000000000000000000).toFixed(2) + 'QQ').replace(".00", "")
    if (value >= 1000000000000000000)
        return ((value / 1000000000000000000).toFixed(0) + 'QQ').replace(".00", "")
    if (value >= 1011000000000000)
        return ((value / 1000000000000000).toFixed(2) + 'Q').replace(".00", "")
    if (value >= 1000000000000000)
        return ((value / 1000000000000000).toFixed(0) + 'Q').replace(".00", "")
    if (value >= 1011000000000)
        return ((value / 1000000000000).toFixed(2) + 'T').replace(".00", "")
    if (value >= 1000000000000)
        return ((value / 1000000000000).toFixed(0) + 'T').replace(".00", "")
    if (value >= 1011000000)
        return ((value / 1000000000).toFixed(2) + 'B').replace(".00", "")
    if (value >= 1000000000)
        return ((value / 1000000000).toFixed(0) + 'B').replace(".00", "")
    if (value >= 1011000)
        return ((value / 1000000).toFixed(2) + 'M').replace(".00", "")
    if (value >= 1000000)
        return ((value / 1000000).toFixed(0) + 'M').replace(".00", "")
    if (value >= 1011)
        return ((value / 1000).toFixed(2) + 'K').replace(".00", "")
    if (value >= 1000)
        return ((value / 1000).toFixed(0) + 'K').replace(".00", "")
    return value
}

function formatedNumberToNumber(value) {
    if (value.toUpperCase().endsWith("DD"))
        return Number(value.slice(0, -1)) * 1000000000000000000000000000000000000000
    if (value.toUpperCase().endsWith("UD"))
        return Number(value.slice(0, -1)) * 1000000000000000000000000000000000000
    if (value.toUpperCase().endsWith("D") && (!value.toUpperCase().endsWith("UD") && !value.toUpperCase().endsWith("DD")))
        return Number(value.slice(0, -1)) * 1000000000000000000000000000000000
    if (value.toUpperCase().endsWith("N"))
        return Number(value.slice(0, -1)) * 1000000000000000000000000000000
    if (value.toUpperCase().endsWith("O"))
        return Number(value.slice(0, -1)) * 1000000000000000000000000000
    if (value.toUpperCase().endsWith("SS"))
        return Number(value.slice(0, -2)) * 1000000000000000000000000
    if (value.toUpperCase().endsWith("S") && !value.toUpperCase().endsWith("SS"))
        return Number(value.slice(0, -1)) * 1000000000000000000000
    if (value.toUpperCase().endsWith("QQ"))
        return Number(value.slice(0, -2)) * 1000000000000000000
    if (value.toUpperCase().endsWith("Q") && !value.toUpperCase().endsWith("QQ"))
        return Number(value.slice(0, -1)) * 1000000000000000
    if (value.toUpperCase().endsWith("T"))
        return Number(value.slice(0, -1)) * 1000000000000
    if (value.toUpperCase().endsWith("B"))
        return Number(value.slice(0, -1)) * 1000000000
    if (value.toUpperCase().endsWith("M"))
        return Number(value.slice(0, -1)) * 1000000
    if (value.toUpperCase().endsWith("K"))
        return Number(value.slice(0, -1)) * 1000
    return Number(value)
}

function openShop() {
    document.getElementById("shop").style.display = "initial";
}

function closeShop() {
    document.getElementById("shop").style.display = "none";
}


document.getElementById("betamount").oninput = function() {
    this.value = this.value.replace(/[^0-9.kKmMbBtTqQsSnOoNdDuU]/g, '').replace(/(\..*)\./g, '$1');
    
    if (isNaN(this.value.charAt(this.value.length-2)) && this.value.charAt(this.value.length-2) != '.' && this.value.charAt(this.value.length-2).toLowerCase() != 'q' && this.value.charAt(this.value.length-2).toLowerCase() != 's') this.value = this.value.substr(0, this.value.length - 1)
    else if ((this.value.charAt(this.value.length-3).toLowerCase() == 'q' && !isNaN(this.value.charAt(this.value.length-4))) || (this.value.charAt(this.value.length-1).toLowerCase() != 'q' && this.value.charAt(this.value.length-2).toLowerCase() == 'q')) this.value = this.value.substr(0, this.value.length - 1)
    else if ((this.value.charAt(this.value.length-3).toLowerCase() == 's' && !isNaN(this.value.charAt(this.value.length-4))) || (this.value.charAt(this.value.length-1).toLowerCase() != 's' && this.value.charAt(this.value.length-2).toLowerCase() == 's')) this.value = this.value.substr(0, this.value.length - 1)
    else if ((this.value.charAt(this.value.length-3).toLowerCase() == 'd' && !isNaN(this.value.charAt(this.value.length-4))) || (this.value.charAt(this.value.length-1).toLowerCase() != 'd' && this.value.charAt(this.value.length-2).toLowerCase() == 'd')) this.value = this.value.substr(0, this.value.length - 1)

    this.value = this.value.replace("u", "ud")
    this.value = this.value.replace("U", "UD")
    
    if (isNaN(this.value.charAt(this.value.length-1)) && this.value.charAt(this.value.length-2) == '.') this.value = this.value.substr(0, this.value.length - 1)
    if (isNaN(this.value.charAt(this.value.length-1)) && this.value.length == 1) this.value = ""
}

var channel = "public"

function sendMessage() {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "message": document.getElementById("messageinput").value,
        "channel": channel
    };
    fetch('https://traoxfish.eu-4.evennode.com/sendchatmessage', {
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
        if (json.status == "success") {
            document.getElementById("sendmessagestatus").innerHTML = "<br>"
            document.getElementById("messageinput").value = ""
            delay(200).then(() => {
                document.getElementById("chat").scrollTo(0, document.getElementById("chat").scrollHeight)
            })
        } else {
            document.getElementById("sendmessagestatus").innerText = "Unable to send message. " + json.error
            delay(2000).then(() => {
                document.getElementById("sendmessagestatus").innerHTML = "<br>"
            })
        }
    });
}

var chat = { "public": [], "staff": [] }
var changedChannel = false

function getMessages(first) {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "channel": channel
    };
    fetch('https://traoxfish.eu-4.evennode.com/getchat', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {
        var same = true
        if (json.status == "success") {
            if (chat[channel][chat[channel].length-1] != json.messages[0]) same = false
            chat[channel] = json.messages
            if (first || document.getElementById("chat").children.length < 1 || changedChannel || document.getElementById("chat").children.length != chat[channel].length) {
                document.getElementById("chat").innerHTML = ""
                changedChannel = false
                for (var message in chat[channel].reverse()) {
                    var messageElement = document.createElement("p")
                    messageElement.style.marginBottom = "0px"
                    messageElement.style.marginTop = "0px"
                    messageElement.style.maxWidth = "99%"
                    messageElement.style.fontSize = "calc(0.66vw + 5px)"
                    var color = "#ffffff"
                    if (gcTheme) color = "#212121"
                    messageElement.style.color = color
                    messageElement.textContent = chat[channel][message]

                    if (chat[channel][message].startsWith("%IMG% ")) {
                            messageElement.innerHTML = messageElement.innerHTML.replace("%IMG% ", "")
                            messageElement.innerHTML = messageElement.innerHTML.split(": ")[0] + ": " + "<img src=\"" + chat[channel][message].split(": ")[1] + "\" style=\"max-width: 256px; max-height: 256px\">"
                    }
                    var username = chat[channel][message].split("M ", 2)[1].split(": ", 2)[0].replaceAll(" ", "")
                    
                    messageElement.innerHTML = messageElement.innerHTML.replace(username.replaceAll("&", "&amp;"), "<p onclick=\"viewProfile(\'" + username + "\')\" style=\"cursor: pointer; display: inline-block; margin-bottom: 0px; margin-top: 0px; max-width: 99%; font-size: calc(6px + 0.66vw); color: " + color + "\">" + username + "</p>")
                    messageElement.innerHTML = messageElement.innerHTML.replace("@" + (getCookie("username").replaceAll("&", "&amp;")), "<p style=\"color: #ea7b7b; display: inline-block; margin-bottom: 0px; margin-top: 0px; max-width: 99%; font-size: calc(6px + 0.66vw);\" >" + "@" + getCookie("username") + "</p>")
                    document.getElementById("chat").appendChild(messageElement)
                    
                }
            } else {
                for (var message in chat[channel].reverse()) {
                    var messageElement = document.getElementById("chat").children[message]
                    if (messageElement.textContent != chat[channel][message]) {
                        messageElement.textContent = chat[channel][message]
                        if (chat[channel][message].startsWith("%IMG% ")) {
                            messageElement.innerHTML = messageElement.innerHTML.replace("%IMG% ", "")
                            messageElement.innerHTML = messageElement.innerHTML.split(": ")[0] + ": " + "<img src=\"" + chat[channel][message].split(": ")[1] + "\" style=\"max-width: 256px; max-height: 256px\">"
                        }
                        var username = chat[channel][message].split("M ", 2)[1].split(": ", 2)[0].replaceAll(" ", "")
                        var color1 = "#ffffff"
                        var color2 = "#ea7b7b"
                        if (gcTheme) {
                            color1 = "#212121"
                            color2 = "#588dfd"
                        }
                        messageElement.innerHTML = messageElement.innerHTML.replace(username.replaceAll("&", "&amp;"), "<p onclick=\"viewProfile(\'" + username + "\')\" style=\"color: " + color1 + "; cursor: pointer; display: inline-block; margin-bottom: 0px; margin-top: 0px; max-width: 99%; font-size: calc(6px + 0.66vw);\">" + username + "</p>")
                        messageElement.innerHTML = messageElement.innerHTML.replace("@" + (getCookie("username").replaceAll("&", "&amp;")), "<p style=\"color: " + color2 + "; display: inline-block; margin-bottom: 0px; margin-top: 0px; max-width: 99%; font-size: calc(6px + 0.66vw);\" >" + "@" + getCookie("username") + "</p>")
                    }
                }
            }
        }
        if (!same && (document.getElementById("chat").scrollTop / (document.getElementById("chat").scrollHeight - 256) > 0.994) || ((document.getElementById("chat").scrollTop / (document.getElementById("chat").scrollHeight - 256) == 0))) {
            document.getElementById("chat").scrollTo(0, document.getElementById("chat").scrollHeight)
        }
        if (first) {
            delay(250).then(() => { document.getElementById("chat").scrollTo(0, document.getElementById("chat").scrollHeight) } ) 
            delay(500).then(() => { document.getElementById("chat").scrollTo(0, document.getElementById("chat").scrollHeight) } ) 
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
    fetch("https://traoxfish.eu-4.evennode.com/getleaderboards", {
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

        document.getElementById("playercount").innerText = json.playerCount

        var i = 0;
        var leaderboard = document.getElementById("leaderboard");
        for (var fisher in json.leaderboards) {
            try {
                leaderboard.children.item(i).textContent = json.leaderboards[fisher].split(": ")[0] + ": " + formatNumber(Number(json.leaderboards[fisher].split(": ")[1]));
                var name = json.leaderboards[fisher].split(": ")[0]
                leaderboard.children.item(i).id = name
                if (json.onlineStatus[fisher]) {
                    leaderboard.children.item(i).style.color = "#84ea84";
                } else {
                    if (!gcTheme) leaderboard.children.item(i).style.color = "#eeeeee";
                    else leaderboard.children.item(i).style.color = "#616161";
                }
            } catch (e) {}
            i++
        }
        if (json.leaderboards.length > leaderboard.children.length) {
            for (var i = leaderboard.children.length; i < json.leaderboards.length; i++) {



                var item = document.createElement("li");
                var name = json.leaderboards[i].split(": ")[0]
                item.id = name
                item.addEventListener('click', function() { viewProfile(this.id) })
                item.style.cursor = "pointer"
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

var slotI = 0
var greenWin = false
setInterval(function() {
    var color = "white"
    if (gcTheme) color = "gray"
    if (greenWin) {
        slotI += 2
        if (slotI % 10 <= 5) color = "%2384EA84FF"
    }
    slotI += 1
    document.getElementById("slotmachine").style.backgroundImage = "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='" + color + "' stroke-width='5' stroke-dasharray='6%2c 14' stroke-dashoffset='" + slotI % 20 + "' stroke-linecap='round'/%3e%3c/svg%3e\")"
}, 66)

var spinning = false
function spin() {

    if (spinning) return
    spinning = true

    const data1 = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "bet": formatedNumberToNumber(document.getElementById("betamount").value),
        "check": true
    };
    fetch("https://traoxfish.eu-4.evennode.com/gamble", {
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
            spinning = false
            document.getElementById("spininfo").innerText = "Cannot afford to bet!"
            document.getElementById("spininfo").style.color = "#ea7b7b";
            delay(2000).then(() => {
                document.getElementById("spininfo").innerHTML = "<br>"
            })
        } else {

            document.getElementById("betamount").disabled = true

            var i = 0
            var i2 = 0
            var i3 = 0
        
            var int1
            var int2
            var int3
        
            int1 = setInterval(function(){
                i += 0.5
                document.getElementById("slot1").style.top = "calc(" + -(i % 13.5) + "vw - 8px)"
            }, 10)
            delay(200).then(() => {
                int2 = setInterval(function(){
                    i2 += 0.5
                    document.getElementById("slot2").style.top = "calc(" + -(i2 % 13.5) + "vw - 8px)"
                }, 10)
            })
            delay(400).then(() => {
                int3 = setInterval(function(){
                    i3 += 0.5
                    document.getElementById("slot3").style.top = "calc(" + -(i3 % 13.5) + "vw - 8px)"
                }, 10)
            })
        
            delay(1005).then(() => {
        
                const data = {
                    "username": getCookie("username"),
                    "loginKey": getCookie("loginKey"),
                    "bet": formatedNumberToNumber(document.getElementById("betamount").value)
                };
                fetch("https://traoxfish.eu-4.evennode.com/gamble", {
                    method: 'POST',
                    credentials: "same-origin",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }).then(response => {
                    return response.json();
                }).then(json => {
                    document.getElementById("betamount").disabled = false
                    if (json.status != "success") {
                        clearInterval(int1)
                        clearInterval(int2)
                        clearInterval(int3)

                        delay(25).then(() => {
                            document.getElementById("slot1").style.top = "calc(-2.25vw - 8px)";
                            document.getElementById("slot2").style.top = "calc(-2.25vw - 8px)";
                            document.getElementById("slot3").style.top = "calc(-2.25vw - 8px)";
                            spinning = false

                            document.getElementById("spininfo").innerText = "Gamble failed!"
                            document.getElementById("spininfo").style.color = "#ea7b7b";

                            delay(2000).then(() => {
                                document.getElementById("spininfo").innerHTML = "<br>"
                            })
                        })
                        return
                    }
        
                    var slot1value = json.slot1
                    var slot2value = json.slot2
                    var slot3value = json.slot3

                    if (slot1value == slot3value && slot1value != slot2value) {
                        var temp = slot2value
                        slot2value = slot3value
                        slot3value = temp
                    }

                    if (slot2value == slot3value && slot2value != slot1value) {
                        var temp = slot1value
                        slot1value = slot3value
                        slot3value = temp
                    }

                    var valueToPx = {
                        2: "calc(-2.25vw - 8px)",
                        5: "calc(-4.5vw - 8px)",
                        25: "calc(-13.4vw - 8px)",
                        100: "calc(-6.7vw - 8px)",
                        1000: "calc(-8.9vw - 8px)",
                        "jackpot": "calc(-11.35vw - 8px)",
                    }

                    delay(25).then(() => {
                        var extraWait = 0
                        if (slot1value == "jackpot") extraWait = 500
                        delay(250 + extraWait).then(() => {
                            clearInterval(int1)
                            document.getElementById("slot1").style.top = valueToPx[slot1value];
                            var extraWait1 = 0
                            if (slot1value == slot2value) extraWait1 += 250
                            if (slot1value == slot2value && slot2value >= 25) extraWait1 += 250
                            if (slot1value == slot2value && slot2value >= 100) extraWait1 += 500
                            if (slot1value == slot2value && slot2value == 1000) extraWait1 += 500
                            if (slot1value == slot2value && slot2value == "jackpot") extraWait1 += 2500
                            delay(250 + extraWait1).then(() => {
                                clearInterval(int2)
                                document.getElementById("slot2").style.top = valueToPx[slot2value];
                                var extraWait2 = 0
                                if (Number(json.winnings) > 0) extraWait2 += 750
                                if (slot1value == 25 && Number(json.winnings) > 0) extraWait2 += 250
                                if (slot1value == 100 && Number(json.winnings) > 0) extraWait2 += 750
                                if (slot1value == 1000 && Number(json.winnings) > 0) extraWait2 += 1000
                                if (slot1value == slot2value && slot2value != slot3value && slot1value >= 25) extraWait2 += 250
                                if (slot1value == slot2value && slot1value == slot3value && slot1value == "jackpot") extraWait2 += 2500
                                delay(250 + extraWait2 + extraWait1).then(() => {
                                    clearInterval(int3)
                                    document.getElementById("slot3").style.top = valueToPx[slot3value];
    
                                    spinning = false
                
                                    if (Number(json.winnings) > 0 ) {
                                        greenWin = true
                                        document.getElementById("spininfo").innerText = "You won " + formatNumber(Number(json.winnings)) + " fish!"
                                        document.getElementById("spininfo").style.color = "#84ea84";
                                    } else {
                                        document.getElementById("spininfo").innerText = "You lost!"
                                        document.getElementById("spininfo").style.color = "#ea7b7b";
                                        greenWin = false
                                    }
                                    var extraDelay = 0
                                    if (slot1value == slot2value && slot1value == slot3value && slot1value == "jackpot") extraDelay = 8000
                                    delay(2000 + extraDelay).then(() => {
                                        document.getElementById("spininfo").innerHTML = "<br>"
                                        greenWin = false
                                    })
                                })
                            })
                        })
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
    fetch("https://traoxfish.eu-4.evennode.com/getleaderboards", {
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
    delay(5).then(() => {
        window.location.replace("https://www.traox.dev/fish");
    })
}

var firstMsg = false
function checkIfLoggedIn() {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey")
    };
    fetch('https://traoxfish.eu-4.evennode.com/checkkey', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {
        if (getCookie("loginKey") == "") {
            document.cookie = "loginKey=guest";
            document.cookie = "username=guest";
            delay(1000).then(() => {
                if (!firstMsg) alert("You are currently using a guest account, your data will not be permanently saved.")
                firstMsg = true
                return  
            })
        } else if (json.validKey == false) {
            window.location.replace("/fish");
        }
    });

}

function keepOnline() {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey")
    };
    fetch('https://traoxfish.eu-4.evennode.com/online', {
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
    delay(66).then(() => {
        updateLeaderboards();
        getMessages(true)
    })

    setInterval(function(){ 
        keepOnline();
        updateLeaderboards();
        getFish();
    }, 333);

    setInterval(function(){ 
        getMessages(false);
    }, 1000);

    setInterval(function(){ 
        checkIfCaptchaed()
        checkIfLoggedIn()
    }, 2500);
});

function getFish() {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey")
    };
    fetch('https://traoxfish.eu-4.evennode.com/getdata', {
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

            //fish
            document.getElementById("fishcount").textContent = formatNumber(json.fish)

            //level
            level = json.level
            document.getElementById("level").innerText = "Level: " + json.level
            document.getElementById("xpcolor").style.width = (json.currentLevelXp / (json.xpRequired + json.currentLevelXp)) * 100 + "%"
            document.getElementById("xpcount").innerText = "XP: " + json.currentLevelXp + " / " + (json.xpRequired + json.currentLevelXp)
            
            //noticiactions
            document.getElementById("friendrequestnotificationcount").innerText = "" + (Number(json.notifications.friendRequests))
            if (Number(json.notifications.friendRequests) > 0) document.getElementById("friendrequestnotifications").style.display = "initial"
            else document.getElementById("friendrequestnotifications").style.display = "none"

            if (json.isMod == true) {
                document.getElementById("staffchatbutton").style.display = "inline-block"
            }

            document.getElementById("jackpotamount").innerText = "Jackpot: " + formatNumber(json.currentJackpot)
            document.getElementById("minjackpotbid").innerText = "Min bid for Jackpot: " + formatNumber(json.minimumBidForJackpot)

            document.getElementById("fishingrodstats").innerHTML = "<br>"

            for (var i = 0; i < json.fishingRodStats.length; i++) {
                document.getElementById("fishingrodstats").innerHTML += json.fishingRodStats[i] + "<br>"
            }

            for (var i = 0; i < json.upgradeSlots; i++) {
                if (json.upgrades[i] != undefined) {
                    document.getElementById("fishingrodupgradeslot" + (i + 1) + "level").innerText = json.upgrades[i].name + " (Lvl " + json.upgrades[i].level + ")"
                    document.getElementById("fishingrodupgradeslot" + (i + 1) + "button").innerText = "Upgrade: " + formatNumber(json.fishingRodUpgradeCosts[i]) + " Fish"
                }
            }

            for (var i = 0; i < 5; i++) {
                if (i > json.upgradeSlots - 1) {
                    document.getElementById("fishingrodupgradeslot" + (i + 1)).style.display = "none"
                    if (i + 2 <= 5) document.getElementById("fishingrodupgradeslot" + (i + 2) + "label").style.display = "none"
                    document.getElementById("fishingrodupgradeslot" + (i + 1) + "block").style.display = "none"
                } else {
                    if (json.upgrades[i] == undefined) {
                        document.getElementById("fishingrodupgradeslot" + (i + 1)).style.display = "inline"
                        document.getElementById("fishingrodupgradeslot" + (i + 1) + "label").style.display = "inline"
                        document.getElementById("fishingrodupgradeslot" + (i + 1)).value = ""
                        document.getElementById("fishingrodupgradeslot" + (i + 1) + "block").style.display = "none"
                    } else if (json.upgrades[i].id == "") {
                        document.getElementById("fishingrodupgradeslot" + (i + 1)).style.display = "inline"
                        document.getElementById("fishingrodupgradeslot" + (i + 1) + "label").style.display = "inline"
                        document.getElementById("fishingrodupgradeslot" + (i + 1)).value = ""
                        document.getElementById("fishingrodupgradeslot" + (i + 1) + "block").style.display = "none"
                    } else {
                        document.getElementById("fishingrodupgradeslot" + (i + 1) + "label").style.display = "inline"
                        document.getElementById("fishingrodupgradeslot" + (i + 1) + "block").style.display = "inline"
                        document.getElementById("fishingrodupgradeslot" + (i + 1)).style.display = "none"
                    }
                }
            }

            if (json.upgradeSlots == 5) document.getElementById("fishingrodupgradeslotunlock").style.display = "none"
            else document.getElementById("fishingrodupgradeslotunlock").style.display = "initial"

            document.getElementById("fishingrodupgradeslotunlock").style.marginTop = (((json.upgradeSlots + 0) * 30) + 10) + "px"
            document.getElementById("fishingrodupgradeslotunlock").innerText = "Unlock Cost: " + formatNumber(json.nextRodSlotCost) + " Fish"

            if (json.lastAutoFish != undefined) {
                fishGainedEffect(json.lastAutoFish)
            }

        }
    });
}

function closeFishingRodMenu() {
    document.getElementById("fishingrodmenu").style.display = "none"
}

function openFishingRodMenu() {
    document.getElementById("fishingrodmenu").style.display = "block"
}

function changeFishingRodUpgrade(value, slot) {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "slot": slot,
        "upgradeId": value
    };
    fetch('https://traoxfish.eu-4.evennode.com/changeupgrade', {
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

        }
    });
}

function closeFishingRodResetConfirm() {
    document.getElementById("fishingrodresetconfirm").style.display = "none"
}

var resetConfirmSlot = -1
function openFishingRodResetConfirm(slot) {
    resetConfirmSlot = slot
    document.getElementById("fishingrodresetconfirm").style.display = "block"
}

function confirmResetSlot() {
    changeFishingRodUpgrade('', resetConfirmSlot)
    document.getElementById("fishingrodresetconfirm").style.display = "none"
}

function purchaseFishingRodUpgrade(slot) {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "slot": slot
    };
    fetch('https://traoxfish.eu-4.evennode.com/purchaseupgrade', {
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

        }
    });
}

function purchaseUpgradeSlot() {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey")
    };
    fetch('https://traoxfish.eu-4.evennode.com/purchaseupgradeslot', {
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
    fetch('https://traoxfish.eu-4.evennode.com/submitcaptcha', {
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
    fetch('https://traoxfish.eu-4.evennode.com/checkcaptchaed', {
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
                var offsetx = (Math.round((Math.random() * 150) - 75))
                var offsety = -Math.round(Math.random() * 50)
                if (document.getElementById('captcha').style.display == "none") {
                    document.getElementById('captchabox').style.marginLeft = offsetx.toString() + "px"
                    document.getElementById('captchasubmit').style.marginLeft = (offsetx + 2).toString() + "px"
                    document.getElementById('captchabox').style.marginTop = offsety.toString() + "px"
                    document.getElementById('captchasubmit').style.marginTop = ((offsety / 3) + 50).toString() + "px"
                }
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
    span.style.zIndex = 999;

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

    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey")
    };
    fetch('https://traoxfish.eu-4.evennode.com/fish', {
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
            fishGainedEffect(json.fishGained)
        }
    });
}

function fishGainedEffect(amount) {
    
    var element = document.createElement("p")
    element.innerText = "+ " + formatNumber(amount) + " Fish"
    element.style.fontSize = "12px"
    element.style.maxWidth = "100%"
    element.style.textAlign = "center"
    element.style.position = "absolute"
    element.style.minWidth = "100%"

    var xVelocity = (Math.random() * 5) - 2.5
    var yVelocity = 2
    var xPos = 0
    var yPos = 0
    var opacity = 1

    document.getElementById("fishGainedAnchor").appendChild(element)

    var interval = setInterval(() => {
        element.style.transform = "translate(" + xPos + "px, " + (-yPos) + "px)"
        xPos += xVelocity
        yPos += yVelocity

        element.style.color = "rgba(255, 255, 255, " + opacity + ")"

        opacity -= 0.02
        yVelocity -= 0.2
        if (opacity <= 0 || yPos < -300) {
            clearInterval(interval)
            element.remove()
        }

    }, 10)

    delay(1000).then(() => {
        clearInterval(interval)
        element.remove()
    })
}

function closeProfile() {
    document.getElementById("viewprofile").style.display = "none";
    closeFriends()
    closeSettings()
    document.getElementById("openfriends").style.display = "none"
    document.getElementById("addfriend").style.display = "none"

    document.getElementById("profile-username").innerText = "Loading..."
    document.getElementById("profile-rank").innerText = ""
    document.getElementById("profile-fish").innerText = "Fish: Loading..."
    document.getElementById("profile-fishingrodstats").innerText = "Fishing Rod Stats: Loading..."
    document.getElementById("profile-alltimefish").innerText = "All Time Fish: Loading..."
    document.getElementById("profile-fishgambled").innerText = "Fish Gambled: Loading..."
    document.getElementById("profile-joindate").innerText = "Join Date: Loading..."
    document.getElementById("profile-lastonline").innerText = "Last Online: Loading..."
    document.getElementById("profile-playtime").innerText = "Playtime: Loading..."
    document.getElementById("profile-friends").innerText = "Friends: Loading..."
    if (!gcTheme) document.getElementById("profile-picture").src = "../images/profiles/default.png"
    else document.getElementById("profile-picture").src = "../images/gcprofile.png"

    document.getElementById("selectpfpbackground").style.display = "none"
    document.getElementById("profile-picture").onclick = function () { }

}

function viewProfile(profile, self) {
    if ((profile == undefined || profile.toLowerCase() == getCookie("username").toLowerCase()) && !self) {
        viewProfile(getCookie("username"), true)
        return
    }

    document.getElementById("viewprofile").style.display = "initial";

    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "profile": profile
    };
    fetch('https://traoxfish.eu-4.evennode.com/getprofile', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json()
    }).then(json => {
        if (json.status == "success") {
            
            var displayName = json.displayName
            var level = json.level
            var fish = json.fish
            var allTimeFish = json.allTimeFish
            var fishGambled = json.fishGambled
            var joinDate = json.joinDate
            var lastOnlineDate = json.lastOnlineDate
            var picture = json.profilePicture
            var friendStatus = json.friendStatus
            var rank = json.rank
            var playtime = json.playtime
            var friends = json.friends

            var fishingRodStats = json.fishingRodStats

            if (playtime == "") playtime = "None"

            if (rank == "none") rank = ""

            if (self == true) {
                document.getElementById("profile-picture").onclick = function () { openSetPFP() }
                document.getElementById("profile-picture").style.cursor = "pointer"
                document.getElementById("openfriends").style.display = "block"
                document.getElementById("addfriend").style.display = "none"
                document.getElementById("profile-settings").style.display = "inline-block"
            } else {
                document.getElementById("profile-picture").onclick = ""
                document.getElementById("profile-picture").style.cursor = "default"
                document.getElementById("openfriends").style.display = "none"
                document.getElementById("addfriend").style.display = "block"
                document.getElementById("profile-settings").style.display = "none"
                document.getElementById("addfriend").parentNode.replaceChild(document.getElementById("addfriend").cloneNode(true), document.getElementById("addfriend"))
                if (friendStatus == "not friends") {
                    document.getElementById("addfriend").innerText = "Send Friend Request"
                    document.getElementById("addfriend").addEventListener('click', function() { sendFriendRequest(profile); delay(250).then(() => viewProfile(profile)) }, { once: true })
                } else if (friendStatus == "friends") {
                    document.getElementById("addfriend").innerText = "Remove Friend"
                    document.getElementById("addfriend").addEventListener('click', function() { cancelFriend(profile); delay(250).then(() => viewProfile(profile)) }, { once: true })
                } else if (friendStatus == "incoming") {
                    document.getElementById("addfriend").innerText = "Accept Friend Request"
                    document.getElementById("addfriend").addEventListener('click', function() { sendFriendRequest(profile); delay(250).then(() => viewProfile(profile)) }, { once: true })
                } else if (friendStatus == "outgoing") {
                    document.getElementById("addfriend").innerText = "Cancel Friend Request"
                    document.getElementById("addfriend").addEventListener('click', function() { cancelFriend(profile); delay(250).then(() => viewProfile(profile))  }, { once: true })
                }
                
                
            }

            document.getElementById("selectpfpbackground").style.display = "none"

            document.getElementById("profile-username").innerText = displayName + " (Lvl. " + level + ")"
            document.getElementById("profile-rank").innerText = rank
            document.getElementById("profile-fish").innerText = "Fish: " + formatNumber(fish)
            document.getElementById("profile-alltimefish").innerText = "All Time Fish: " + formatNumber(allTimeFish)
            document.getElementById("profile-fishgambled").innerText = "Fish Gambled: " + formatNumber(fishGambled)
            document.getElementById("profile-fishingrodstats").innerHTML = "Fishing Rod Stats:<br>"
            for (var i = 0; i < json.fishingRodStats.length; i++) {
                document.getElementById("profile-fishingrodstats").innerHTML += json.fishingRodStats[i] + "<br>"
            }
            document.getElementById("profile-joindate").innerText = "Join Date: " + joinDate
            document.getElementById("profile-lastonline").innerText = "Last Online: " + lastOnlineDate
            document.getElementById("profile-playtime").innerText = "Playtime: " + playtime
            document.getElementById("profile-friends").innerText = "Friends: " + friends
            if (!gcTheme || picture != "default") document.getElementById("profile-picture").src = "../images/profiles/" + picture + ".png"
            else document.getElementById("profile-picture").src = "../images/gcprofile.png"

        }
    });
}

function openSetPFP() {
    document.getElementById("selectpfpbackground").style.display = "block"
}

function closeSetPFP() {
    document.getElementById("selectpfpbackground").style.display = "none"
}

function setProfilePicture(id) {
    document.getElementById("selectpfpbackground").style.display = "none"
    delay(200).then(() => viewProfile(getCookie("username"), true))
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "profilePicture": id
    };
    fetch('https://traoxfish.eu-4.evennode.com/setprofilepicture', {
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

function openFriends() {
    document.getElementById("friendsbackground").style.display = "block"
    getFriends()
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "notificationType": "friendRequests"
    };
    fetch('https://traoxfish.eu-4.evennode.com/viewnotification', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {

    })
}

function closeFriends() {
    document.getElementById("friendsbackground").style.display = "none"
}

function openSettings() {
    document.getElementById("profilesettingsbackground").style.display = "block"
}

function closeSettings() {
    document.getElementById("profilesettingsbackground").style.display = "none"
}

function cancelFriend(friend) {

    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "cancel": true,
        "profile": friend
    };
    fetch('https://traoxfish.eu-4.evennode.com/sendfriendrequest', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {
        getFriends()
    })
}

function sendFriendRequest(friend) {

    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "cancel": false,
        "profile": friend
    };
    fetch('https://traoxfish.eu-4.evennode.com/sendfriendrequest', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {
        getFriends()
    })
}

function getFriends() {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey")
    };
    fetch('https://traoxfish.eu-4.evennode.com/getfriends', {
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

            document.getElementById("friends-friends").innerHTML = ""
            document.getElementById("friends-incoming").innerHTML = ""
            document.getElementById("friends-outgoing").innerHTML = ""

            for (var i = 0; i < json.friends.length; i++) {
                var friend = json.friends[i]

                var item = document.createElement("p");
                item.id = "friend-" + friend
                item.className = "frienditem"
                item.addEventListener('click', function() { viewProfile(this.id.split("friend-")[1]); closeFriends(); })
                item.style.cursor = "pointer"
                item.textContent = friend

                if (json.online[friend] == true) item.style.color = "#84ea84"
                else if (!gcTheme) item.style.color = "#ffffff"
                else item.style.color = "#212121"

                var button = document.createElement("button");
                button.innerText = "x"
                button.className = "friendcancelbutton nicebutton"
                button.addEventListener('click', function() { event.stopPropagation(); cancelFriend(this.parentElement.id.split("friend-")[1]); })

                if (gcTheme) {
                    button.style.backgroundColor = "#ffffff"
                    button.style.outlineColor = "#dadce0"
                    button.style.color = "#212121"
                }

                document.getElementById("friends-friends").appendChild(item);

                document.getElementById("friend-" + friend).appendChild(button);

            }

            for (var i = 0; i < json.incomingRequests.length; i++) {
                var friend = json.incomingRequests[i]

                var item = document.createElement("p");
                item.id = "friend-incoming-" + friend
                item.className = "frienditem"
                item.addEventListener('click', function() { viewProfile(this.id.split("friend-incoming-")[1]); closeFriends(); })
                item.style.cursor = "pointer"
                item.textContent = friend

                if (json.online[friend] == true) item.style.color = "#84ea84"
                else if (!gcTheme) item.style.color = "#ffffff"
                else item.style.color = "#212121"

                var button = document.createElement("button");
                button.innerText = "x"
                button.className = "friendcancelbutton nicebutton"
                button.addEventListener('click', function() { event.stopPropagation(); cancelFriend(this.parentElement.id.split("friend-incoming-")[1]); })

                

                var button2 = document.createElement("button");
                button2.innerText = "✓"
                button2.className = "friendcancelbutton nicebutton"
                button2.addEventListener('click', function() { event.stopPropagation(); sendFriendRequest(this.parentElement.id.split("friend-incoming-")[1]); })
                button2.style.marginRight = "4px"

                if (gcTheme) {
                    button.style.backgroundColor = "#ffffff"
                    button.style.outlineColor = "#dadce0"
                    button.style.color = "#212121"

                    button2.style.backgroundColor = "#ffffff"
                    button2.style.outlineColor = "#dadce0"
                    button2.style.color = "#212121"
                }

                document.getElementById("friends-incoming").appendChild(item);

                document.getElementById("friend-incoming-" + friend).appendChild(button);
                document.getElementById("friend-incoming-" + friend).appendChild(button2);

            }

            for (var i = 0; i < json.outgoingRequests.length; i++) {
                var friend = json.outgoingRequests[i]

                var item = document.createElement("p");
                item.id = "friend-outgoing-" + friend
                item.className = "frienditem"
                item.addEventListener('click', function() { viewProfile(this.id.split("friend-outgoing-")[1]); closeFriends(); })
                item.style.cursor = "pointer"
                item.textContent = friend

                if (json.online[friend] == true) item.style.color = "#84ea84"
                else if (!gcTheme) item.style.color = "#ffffff"
                else item.style.color = "#212121"

                var button = document.createElement("button");
                button.innerText = "x"
                button.className = "friendcancelbutton nicebutton"
                button.addEventListener('click', function() { event.stopPropagation(); cancelFriend(this.parentElement.id.split("friend-outgoing-")[1]); })

                if (gcTheme) {
                    button.style.backgroundColor = "#ffffff"
                    button.style.outlineColor = "#dadce0"
                    button.style.color = "#212121"
                }

                document.getElementById("friends-outgoing").appendChild(item);

                document.getElementById("friend-outgoing-" + friend).appendChild(button);

            }

        }
    });
}

function changePassword() {
    var oldPassword = document.getElementById("changepasswordold").value
    var newPassword = document.getElementById("changepasswordnew").value
    var newPasswordConfirm = document.getElementById("changepasswordnewconfirm").value

    if (newPassword != newPasswordConfirm) {
        document.getElementById("changepasswordstatus").innerText = "New passwords do not match."
        document.getElementById("changepasswordstatus").style.color = "#ea7b7b";
        delay(2000).then(() => {
            document.getElementById("changepasswordstatus").innerHTML = ""
        })
    }

    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "oldPassword": oldPassword,
        "newPassword": newPassword,
    };
    fetch('https://traoxfish.eu-4.evennode.com/changepassword', {
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
            document.getElementById("changepasswordstatus").innerText = "Successfully changed password."
            document.getElementById("changepasswordstatus").style.color = "#84ea84";
            delay(2000).then(() => {
                document.getElementById("changepasswordstatus").innerHTML = ""
            })
        } else {
            document.getElementById("changepasswordstatus").innerText = json.error
            document.getElementById("changepasswordstatus").style.color = "#ea7b7b";
            delay(2000).then(() => {
                document.getElementById("changepasswordstatus").innerHTML = ""
            })
        }
    })
}
function standardize_color(str){
    var ctx = document.createElement('canvas').getContext('2d');
    ctx.fillStyle = str;
    return ctx.fillStyle;
}

var gcTheme = false

function changeFavicon(src) {
    var link = document.createElement('link'),
        oldLink = document.getElementById('dynamic-favicon');
    link.id = 'dynamic-favicon';
    link.rel = 'shortcut icon';
    link.href = src;
    if (oldLink) {
     document.head.removeChild(oldLink);
    }
    document.head.appendChild(link);
   }

function googleClassroomTheme() {
    gcTheme = true
    for (var i in document.body.getElementsByTagName("*")) {
        var element = document.body.getElementsByTagName("*")[i]
        document.body.style.backgroundColor = "#ffffff"
        document.getElementById("gamblefade").style.display = "none"
        document.getElementById("footerimg").style.display = "none"
        document.getElementById("gcbutton").style.display = "none"
        document.getElementById("topbar").style.display = "none"
        document.getElementById("banner").src = "../images/gcbanner.png"
        document.getElementById("settingsimg").src = "../images/gcsettings.png"
        document.getElementById("shopimg").src = "../images/gcshop.png"
        document.getElementById("fishing_boatimg").src = "../images/gcfishing_boat.png"
        document.getElementById("profileimg").src = "../images/gcprofile.png"
        document.getElementById("profile-picture").src = "../images/gcprofile.png"
        changeFavicon("../images/gcfav.png")
        document.title = "Google Classroom"
        if (standardize_color(element.style.backgroundColor) == "#ffffff" || standardize_color(getComputedStyle(element, ":before").backgroundColor) == "#ffffff") {
            element.style.backgroundColor = "#616161"
        }

        
        if (element.style == undefined) element.style = ""
        if (standardize_color(element.style.backgroundColor) == "#1d1a2c" || standardize_color(getComputedStyle(element).backgroundColor) == "#1d1a2c") {
            element.style.backgroundColor = "#ffffff"
        }

        if (standardize_color(element.style.backgroundColor) == "#1b1927" || standardize_color(getComputedStyle(element).backgroundColor) == "#1b1927") {
            element.style.backgroundColor = "#ffffff"
        }
        if (standardize_color(element.style.backgroundColor) == "#29273e" || standardize_color(getComputedStyle(element).backgroundColor) == "#29273e") {
            element.style.backgroundColor = "#ffffff"
        }

        
        if (standardize_color(element.style.backgroundColor) == "#d35040" || standardize_color(getComputedStyle(element).backgroundColor) == "#d35040") {
            element.style.backgroundColor = "#588dfd"
        }
        if (standardize_color(element.style.color) == "#d35040" || standardize_color(getComputedStyle(element).color) == "#d35040") {
            element.style.color = "588dfd"
        }
        if (standardize_color(element.style.outlineColor) == "#ffffff" || standardize_color(getComputedStyle(element).outlineColor) == "#ffffff") {
            element.style.outlineColor = "#dadce0"
        }

        if (standardize_color(element.style.color) == "#ffffff" || standardize_color(getComputedStyle(element).color) == "#ffffff") {
            element.style.color = "#212121"
        }

        if (standardize_color(element.color) == "#eeeeee") {
            element.color = "#313131"
        }
    }
}

function setChannel(channel1) {
    if (channel1 == channel) return
    if (channel1 == "public") {
        channel = "public"



        if (!gcTheme) document.getElementById("publicchattext").style.color = "#ffffff"
        else document.getElementById("publicchattext").style.color = "#212121"
        document.getElementById("publicchatbar").style.display = "block"

        document.getElementById("staffchattext").style.color = "#cccccc"
        document.getElementById("staffchatbar").style.display = "none"
    } else if (channel1 == "staff") {
        channel = "staff"

        if (!gcTheme) document.getElementById("staffchattext").style.color = "#ffffff"
        else document.getElementById("staffchattext").style.color = "#212121"
        document.getElementById("staffchatbar").style.display = "block"

        document.getElementById("publicchattext").style.color = "#cccccc"
        document.getElementById("publicchatbar").style.display = "none"
    }
    document.getElementById("chat").innerHTML = ""
    changedChannel = true
    getMessages(true)
}
