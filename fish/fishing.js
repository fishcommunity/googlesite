const urlParams = new URLSearchParams(window.location.search);

function getCookie(cname) {

    return urlParams.get(cname);
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}



function sendFish() {
    var reciever = document.getElementById("sendfishto").value;
    var password = document.getElementById("sendfishpassword").value;

    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "amount": formatedNumberToNumber(document.getElementById("sendfishamount").value),
        "reciever": reciever,
        "password": password
    };

    var validInfo = false;

    if (formatedNumberToNumber(document.getElementById("sendfishamount").value) != undefined && reciever != undefined && formatedNumberToNumber(document.getElementById("sendfishamount").value) > 0) {
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

document.getElementById("challengebet").oninput = function() {
    this.value = this.value.replace(/[^0-9.kKmMbBtTqQsSnOoNdD]/g, '').replace(/(\..*)\./g, '$1');
    if (isNaN(this.value.charAt(this.value.length-2)) && this.value.charAt(this.value.length-2) != '.' && this.value.charAt(this.value.length-2).toLowerCase() != 'q' && this.value.charAt(this.value.length-2).toLowerCase() != 's') this.value = this.value.substr(0, this.value.length - 1)
    else if ((this.value.charAt(this.value.length-3).toLowerCase() == 'q' && !isNaN(this.value.charAt(this.value.length-4))) || (this.value.charAt(this.value.length-1).toLowerCase() != 'q' && this.value.charAt(this.value.length-2).toLowerCase() == 'q')) this.value = this.value.substr(0, this.value.length - 1)
    else if ((this.value.charAt(this.value.length-3).toLowerCase() == 's' && !isNaN(this.value.charAt(this.value.length-4))) || (this.value.charAt(this.value.length-1).toLowerCase() != 's' && this.value.charAt(this.value.length-2).toLowerCase() == 's')) this.value = this.value.substr(0, this.value.length - 1)

    if (isNaN(this.value.charAt(this.value.length-1)) && this.value.charAt(this.value.length-2) == '.') this.value = this.value.substr(0, this.value.length - 1)
    if (isNaN(this.value.charAt(this.value.length-1)) && this.value.length == 1) this.value = ""
}

quantityInputs = [ "rarefishbuyquantity", "veryrarefishbuyquantity", "sharkbuyquantity", "raresharkbuyquantity", "fishermanbuyquantity", "chumbuyquantity", "fishbucketbuyquantity"]

for (var i = 0; i < quantityInputs.length; i++) {
    document.getElementById(quantityInputs[i]).oninput = function() {
        this.value = this.value.replace(/[^0-9.kKmMbBtTqQsSnOoNdDuU]/g, '').replace(/(\..*)\./g, '$1');

        if (isNaN(this.value.charAt(this.value.length-2)) && this.value.charAt(this.value.length-2) != '.' && this.value.charAt(this.value.length-2).toLowerCase() != 'q' && this.value.charAt(this.value.length-2).toLowerCase() != 's') this.value = this.value.substr(0, this.value.length - 1)
        else if ((this.value.charAt(this.value.length-3).toLowerCase() == 'q' && !isNaN(this.value.charAt(this.value.length-4))) || (this.value.charAt(this.value.length-1).toLowerCase() != 'q' && this.value.charAt(this.value.length-2).toLowerCase() == 'q')) this.value = this.value.substr(0, this.value.length - 1)
        else if ((this.value.charAt(this.value.length-3).toLowerCase() == 's' && !isNaN(this.value.charAt(this.value.length-4))) || (this.value.charAt(this.value.length-1).toLowerCase() != 's' && this.value.charAt(this.value.length-2).toLowerCase() == 's')) this.value = this.value.substr(0, this.value.length - 1)
        else if ((this.value.charAt(this.value.length-3).toLowerCase() == 'd' && !isNaN(this.value.charAt(this.value.length-4))) || (this.value.charAt(this.value.length-1).toLowerCase() != 'd' && this.value.charAt(this.value.length-2).toLowerCase() == 'd')) this.value = this.value.substr(0, this.value.length - 1)

        this.value = this.value.replace("u", "ud")
        this.value = this.value.replace("U", "UD")
        
        if (isNaN(this.value.charAt(this.value.length-1)) && this.value.charAt(this.value.length-2) == '.') this.value = this.value.substr(0, this.value.length - 1)
        if (isNaN(this.value.charAt(this.value.length-1)) && this.value.length == 1) this.value = ""
    
        if (formatedNumberToNumber(this.value) > 1000000000000) this.value = "1T"

        getItemCosts()
    
    }
}



function buyItem(type) {
    
    var quantity = 1
    try {
        if (document.getElementById(type.toLowerCase() + "buyquantity") != undefined) quantity = formatedNumberToNumber(document.getElementById(type.toLowerCase() + "buyquantity").value)
    } catch (error) { alert(error) }
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "purchaseType": type,
        "quantity": quantity
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
            if (type == "specialFish" || type == "sellSpecialFish") {
                document.getElementById("specialfishcost").textContent = "Buy Price: " + formatNumber(json.newCost) + " fish"
                document.getElementById("specialfishsellcost").textContent = "Sell Price: " + formatNumber(json.newSellCost) + " fish"
            }
            getFish();
        }
        if (json.success != "success" && type == "specialFish" && json.error != undefined) {
            document.getElementById("specialfishstatus").innerText = "Error: " + json.error;
            delay(2000).then(() => {
                document.getElementById("specialfishstatus").innerHTML = "<br>";
            })
        }
    });
}

var channel = "public"

function sendMessage() {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "message": document.getElementById("messageinput").value,
        "channel": channel
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

var chat = { "public": [], "guild": [], "staff": [] }
var changedChannel = false

function getMessages(first) {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "channel": channel
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

function getItemCosts(type) {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "rareFishAmount": formatedNumberToNumber(document.getElementById("rarefishbuyquantity").value),
        "veryRareFishAmount": formatedNumberToNumber(document.getElementById("veryrarefishbuyquantity").value),
        "sharkAmount": formatedNumberToNumber(document.getElementById("sharkbuyquantity").value),
        "rareSharkAmount": formatedNumberToNumber(document.getElementById("raresharkbuyquantity").value),
        "fishermanAmount": formatedNumberToNumber(document.getElementById("fishermanbuyquantity").value),
        "chumAmount": formatedNumberToNumber(document.getElementById("chumbuyquantity").value),
        "fishBucketAmount": formatedNumberToNumber(document.getElementById("fishbucketbuyquantity").value),
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
            document.getElementById("whalecost").textContent = formatNumber(json.whaleCost) + " fish"
            document.getElementById("specialfishcost").textContent = "Buy Price: " + formatNumber(json.specialFishCost) + " fish"
            document.getElementById("specialfishsellcost").textContent = "Sell Price: " + formatNumber(json.specialFishSellCost) + " fish"
            document.getElementById("fishermancost").textContent = formatNumber(json.fishermanCost) + " fish"
            document.getElementById("chumcost").textContent = formatNumber(json.chumCost) + " fish"
            document.getElementById("fishbucketcost").textContent = formatNumber(json.fishBucketCost) + " fish"
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

    window.close()

    if (spinning) return
    spinning = true

    const data1 = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "bet": formatedNumberToNumber(document.getElementById("betamount").value),
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
    getSendLogs()
    delay(66).then(() => {
        updateLeaderboards();
        getSpecialFishGraph()
        getMessages(true)
    })

    setInterval(function(){ 
        keepOnline();
        updateLeaderboards();
        getChallengeStatus()
        getChallengeRequest()
    }, 333);

    setInterval(function(){ 
        getFish();
        getMessages(false);
    }, 1000);

    setInterval(function(){ 
        getItemCosts()
        checkIfCaptchaed()
        getSendLogs()
        getFishPixels()
        checkIfLoggedIn()
        getSpecialFishGraph()
    }, 2500);
});

setInterval(function(){ 
    if (document.getElementById("autofish").checked) {
        goFishing(true)
        document.getElementById("fishbutton").className = "innactivebutton"
    } else {document.getElementById("fishbutton").className = "fishbutton"}

}, 500);

var level = 0
var isOwnerOfGuild = false
var userGuild = "none"

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

            isOwnerOfGuild = json.isOwnerOfGuild
            userGuild = json.guild

            //fish
            document.getElementById("fishcount").textContent = formatNumber(json.fish)
            document.getElementById("rarefishcount").textContent = formatNumber(json.rareFish)
            document.getElementById("veryrarefishcount").textContent = formatNumber(json.veryRareFish)
            document.getElementById("sharkcount").textContent = formatNumber(json.sharks)
            document.getElementById("raresharkcount").textContent = formatNumber(json.rareSharks)
            document.getElementById("specialfishcount").textContent = formatNumber(json.specialFish)
            document.getElementById("whalecount").textContent = formatNumber(json.whales)
            document.getElementById("fishermancount").textContent = formatNumber(json.fishermen)
            document.getElementById("chumcount").textContent = formatNumber(json.chum)
            document.getElementById("fishbucketcount").textContent = formatNumber(json.fishBuckets)

            if (json.fishingBoatFish < json.fishingBoatCapacity) {
                document.getElementById("fishingboatamount").textContent = formatNumber(json.fishingBoatFish) + " / " + formatNumber(json.fishingBoatCapacity) + " fish"
                document.getElementById("fishingboatnotification").style.display = "none"
            }
            else {
                document.getElementById("fishingboatamount").textContent = formatNumber(json.fishingBoatFish) + " / " + formatNumber(json.fishingBoatCapacity) + " fish (MAX)"
                document.getElementById("fishingboatnotification").style.display = "initial"
            }

            //level
            level = json.level
            document.getElementById("level").innerText = "Level: " + json.level
            document.getElementById("xpcolor").style.width = (json.currentLevelXp / (json.xpRequired + json.currentLevelXp)) * 100 + "%"
            document.getElementById("xpcount").innerText = "XP: " + json.currentLevelXp + " / " + (json.xpRequired + json.currentLevelXp)
            
            //noticiactions
            document.getElementById("sendfishnotificationcount").innerText = "" + json.notifications.sendLogs
            if (json.notifications.sendLogs > 0) document.getElementById("sendfishnotifications").style.display = "initial"
            else document.getElementById("sendfishnotifications").style.display = "none"

            document.getElementById("friendrequestnotificationcount").innerText = "" + (Number(json.notifications.friendRequests) + Number(json.notifications.guildInvites))
            if (Number(json.notifications.friendRequests) + Number(json.notifications.guildInvites) > 0) document.getElementById("friendrequestnotifications").style.display = "initial"
            else document.getElementById("friendrequestnotifications").style.display = "none"

            if (openedGuild == userGuild) {
                document.getElementById("guildrequestnotificationcount").innerText = "" + json.notifications.guildRequests
                if (json.notifications.guildRequests > 0) document.getElementById("guildrequestnotifications").style.display = "initial"
                else document.getElementById("guildrequestnotifications").style.display = "none"
            } else document.getElementById("guildrequestnotifications").style.display = "none"

            if (json.isMod == true) {
                document.getElementById("staffchatbutton").style.display = "inline-block"
            }

            if (json.guild != "" && json.guild != "none") {
                document.getElementById("guildchatbutton").style.display = "inline-block"
            }

            document.getElementById("guildinvites").innerHTML = ""

            for (var i = 0; i < json.guildInvites.length; i++) {
                var guild = json.guildInvites[i]

                var item = document.createElement("p");
                item.id = "guild-incoming-" + guild
                item.className = "frienditem"
                item.addEventListener('click', function() { openGuild(this.id.split("guild-incoming-")[1]); closeGuildInvites(); })
                item.style.cursor = "pointer"
                item.textContent = guild

                var button = document.createElement("button");
                button.innerText = "x"
                button.className = "friendcancelbutton nicebutton"
                button.addEventListener('click', function() { event.stopPropagation(); declineGuildInvite(this.parentElement.id.split("guild-incoming-")[1]) })

                var button2 = document.createElement("button");
                button2.innerText = "✓"
                button2.className = "friendcancelbutton nicebutton"
                button2.addEventListener('click', function() { event.stopPropagation(); joinGuild(this.parentElement.id.split("guild-incoming-")[1]); delay(400).then(() => { viewProfile(getCookie("username", true)); closeGuildInvites(); delay(100).then(() => openGuild(this.parentElement.id.split("guild-incoming-")[1])) }) })
                button2.style.marginRight = "4px"

                document.getElementById("guildinvites").appendChild(item);

                document.getElementById("guild-incoming-" + guild).appendChild(button);
                document.getElementById("guild-incoming-" + guild).appendChild(button2);

            }
            
            document.getElementById("jackpotamount").innerText = "Jackpot: " + formatNumber(json.currentJackpot)
            document.getElementById("minjackpotbid").innerText = "Min bid for Jackpot: " + formatNumber(json.minimumBidForJackpot)

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

var graphPoints
var hoverIndex = -1
function getSpecialFishGraph() {

    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey")
    };
    fetch('https://traoxfish.us-3.evennode.com/getspecialfishgraph', {
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
            graphPoints = json.graph
        }
    });
}

function drawGraph() {
    var canvas = document.getElementById("specialfishgraph").getContext("2d");

    if (graphPoints == undefined) return

    var width = document.getElementById("specialfishgraph").width
    var height = document.getElementById("specialfishgraph").height

    if (!gcTheme) canvas.fillStyle = "black";
    else canvas.fillStyle = "white";
    canvas.fillRect(0, 0, width, height);

    canvas.strokeStyle = 'white';
    canvas.lineWidth = 2;

    canvas.beginPath();
    canvas.moveTo(20, 20);
    canvas.lineTo(20, 20);
    canvas.stroke();

    canvas.beginPath();
    canvas.moveTo(20, 20);
    canvas.lineTo(20, (height - 20));
    canvas.stroke();

    canvas.beginPath();
    canvas.moveTo(20, (height - 20));
    canvas.lineTo((width - 20), (height - 20));
    canvas.stroke();

    var fishData = graphPoints

    canvas.strokeStyle = "#55ff55";
    canvas.lineWidth = 3;

    var highest = 0
    var lowest = 99999999999999

    for (var i in fishData) {
        if (fishData[i] > highest) highest = fishData[i]
        if (fishData[i] < lowest) lowest = fishData[i]
    }

    for (var i = 0; i < fishData.length; i++) {

        var point = ((fishData[i] - lowest) / (highest - lowest)) * 0.9

        canvas.beginPath();
        canvas.moveTo(((width - 40) * ((i) / fishData.length) + ((width - 40) / 2) / fishData.length) + 20, (height - 20) - (point * (height - 40)) - 2);
        canvas.lineTo(((width - 40) * ((i) / fishData.length) + ((width - 40) / fishData.length * 1.5)) + 20, (height - 20) - ((((fishData[i + 1] - lowest) / (highest - lowest)) * 0.9) * (height - 40)) - 2);
        canvas.stroke();

    }

    if (hoverIndex != -1) {

        if (gcTheme) canvas.strokeStyle = "black";
        else canvas.strokeStyle = "white";
        canvas.lineWidth = 1;

        canvas.beginPath();
        canvas.arc(((width - 40) * (hoverIndex / graphPoints.length)) + 20, (height - 20) - ((((graphPoints[hoverIndex] - lowest) / (highest - lowest)) * 0.9) * (height - 40)) - 2, 8, 0, 2 * Math.PI, false);
        canvas.stroke();

        canvas.beginPath();
        canvas.moveTo(((width - 40) * (hoverIndex / graphPoints.length)) + 20, (height - 20) - ((((graphPoints[hoverIndex] - lowest) / (highest - lowest)) * 0.9) * (height - 40)) - 2);
        canvas.lineTo(((width - 40) * (hoverIndex / graphPoints.length)) + 20, 40);
        canvas.stroke();

    }
}

setInterval(() => {
    drawGraph()
}, 40)
document.getElementById("specialfishhoverprice").style.display = "none"
function specialFishHover(event) {
    var rect = event.target.getBoundingClientRect();
    document.getElementById("specialfishhoverprice").style.display = "initial"
    var percent = Math.min(Math.max((event.clientX - rect.left) / document.getElementById("specialfishgraph").clientWidth * 96, 5.5), 91.5)
    document.getElementById("specialfishhoverprice").style.left = "calc(" + percent + "% - 16px)"
    hoverIndex = Math.floor((event.clientX - 10 - (rect.left)) / (document.getElementById("specialfishgraph").clientWidth - 20) * graphPoints.length)
    document.getElementById("specialfishhoverprice").innerHTML = formatNumber(graphPoints[hoverIndex] || "<br>")
    if (graphPoints[hoverIndex] == undefined) hoverIndex = -1
}

function stopSpecialFishHover() {
    hoverIndex = -1
    document.getElementById("specialfishhoverprice").style.display = "none"
}

function closeLogsBg() {
    document.getElementById("logsbg").style.display = "none";
}

function openSendLogs() {
    document.getElementById("logsbg").style.display = "initial";
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "notificationType": "sendLogs"
    };
    fetch('https://traoxfish.us-3.evennode.com/viewnotification', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.status == "success") document.getElementById("sendfishnotifications").style.display = "none"
    })
}

function getSendLogs() {

    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey")
    };
    fetch('https://traoxfish.us-3.evennode.com/getsendlogs', {
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
            var sendlogs = document.getElementById("sendlogs")
            for (var i = sendlogs.children.length; i < json.logs.length; i++) {
                var log = json.logs[i]
                var logDiv = document.createElement('div')
                var logMsg = document.createElement('p')
                logMsg.innerHTML = log.origin.charAt(0).toUpperCase() + log.origin.slice(1) + ": " + log.user + "<br>Amount: " + formatNumber(Number(log.amount)) + " fish<br>Date: " + log.timestamp
                logMsg.className = "sendlogtext"
                logDiv.appendChild(logMsg)
                logDiv.className = "sendlog"
                sendlogs.appendChild(logDiv)
            }
        }
    });

}

var cursorx = -1
var cursory = -1

var fishPixeldata = [] 

for (var i = 0; i < 256; i ++) { 
    for (var j = 0; j < 256; j++) { 
        fishPixeldata[i * 256 + j] = "#ffffff"
    }
}

async function drawPixelFish() {
    var canvas = document.getElementById("pixelfishcanvas").getContext("2d");
    var width = document.getElementById("pixelfishcanvas").width
    var height = document.getElementById("pixelfishcanvas").height

    canvas.strokeStyle = 'white';

    for (var i = 0; i < 256; i ++) { 
        if (Math.random() < 0.05) await delay(1).then(() => {})
        for (var j = 0; j < 256; j++) {

            canvas.fillStyle = fishPixeldata[i * 256 + j] || "#ffffff"
            canvas.fillRect(i * 10, j * 10, 10, 10);

            if (i * 256 + j == lastIndex) {
                var x = i + 1
                var y = j + 1
        
                if (fishPixeldata[i * 256 + j] == undefined) return
        
                var rgb = hexToRgb(fishPixeldata[i * 256 + j] || "#ffffff")
        
                var lum = getLuminance(HEXToVBColor(fishPixeldata[i * 256 + j] || "#ffffff"))
        
                canvas.lineWidth = 2;

                canvas.strokeStyle = lum < 20 ? 'white' : 'black';
        
                canvas.beginPath();
                canvas.moveTo((x * 10) - 1, (y * 10) - 1);
                canvas.lineTo(x * 10 - 1, (y - 1) * 10  + 1);
                canvas.stroke();
        
                canvas.beginPath();
                canvas.moveTo(x * 10 - 1, (y - 1) * 10 + 1);
                canvas.lineTo((x - 1) * 10 + 1, (y - 1) * 10 + 1);
                canvas.stroke();
        
                canvas.beginPath();
                canvas.moveTo((x - 1) * 10 + 1, (y - 1) * 10 + 1);
                canvas.lineTo((x - 1) * 10 + 1, y * 10 -1);
                canvas.stroke();
        
                canvas.beginPath();
                canvas.moveTo((x - 1) * 10 + 1, y * 10 - 1);
                canvas.lineTo(x * 10 - 1, y * 10 - 1);
                canvas.stroke();

            }
        }
    }
}



var color = "";
setInterval(function() {
    document.getElementById("colorselectorcolor").style.backgroundColor = document.getElementById("colorinput").value
    document.getElementById("fullscreencolorselectorcolor").style.backgroundColor = document.getElementById("colorinputfullscreen").value
    if (fullscreen) color = document.getElementById("colorinputfullscreen").value
    else color = document.getElementById("colorinput").value
}, 10)

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}  

function HEXToVBColor(rrggbb) {
    var bbggrr = rrggbb.substr(4, 2) + rrggbb.substr(2, 2) + rrggbb.substr(0, 2);
    return parseInt(bbggrr, 16);
}

function getLuminance(argb) {
    lum= (   77  * ((argb>>16)&255) 
               + 150 * ((argb>>8)&255) 
               + 29  * ((argb)&255))>>8;
    return lum;
}

var lastIndex = -1

function getPixelPlacePos(event) {
    var rect = event.target.getBoundingClientRect();


    
    var lastx = event.clientX
    var lasty = event.clientY

    var x = Math.round((event.clientX - 2 - (rect.left - 4)) / document.getElementById("pixelfishcanvas").clientWidth * 256)
    var y = Math.round((event.clientY - 2 - (rect.bottom - 4)) / document.getElementById("pixelfishcanvas").clientHeight * 256) + 256

    cursorx = x
    cursory = y

    var canvas = document.getElementById("pixelfishcanvas").getContext("2d");

    var index = ((cursorx - 1) * 256) + cursory - 1

    if (lastIndex != index || (cursorx == -1 || cursory == -1)) {
        canvas.fillStyle = fishPixeldata[lastIndex]
        var i1 = Math.floor(lastIndex / 256)
        var j1 = lastIndex % 256
        canvas.fillRect(i1 * 10, j1 * 10, 10, 10);
    }

    if (cursorx != -1 && cursory != -1) {

        var x = cursorx
        var y = cursory

        if (fishPixeldata[index] == undefined) return

        var rgb = hexToRgb(fishPixeldata[index])

        var lum = getLuminance(HEXToVBColor(fishPixeldata[index]))

        canvas.lineWidth = 2;

        canvas.strokeStyle = lum < 20 ? 'white' : 'black';

        canvas.beginPath();
        canvas.moveTo((x * 10) - 1, (y * 10) - 1);
        canvas.lineTo(x * 10 - 1, (y - 1) * 10  + 1);
        canvas.stroke();

        canvas.beginPath();
        canvas.moveTo(x * 10 - 1, (y - 1) * 10 + 1);
        canvas.lineTo((x - 1) * 10 + 1, (y - 1) * 10 + 1);
        canvas.stroke();

        canvas.beginPath();
        canvas.moveTo((x - 1) * 10 + 1, (y - 1) * 10 + 1);
        canvas.lineTo((x - 1) * 10 + 1, y * 10 -1);
        canvas.stroke();

        canvas.beginPath();
        canvas.moveTo((x - 1) * 10 + 1, y * 10 - 1);
        canvas.lineTo(x * 10 - 1, y * 10 - 1);
        canvas.stroke();

    }

    lastIndex = index
}

function exitPixelCanvas() {
    var canvas = document.getElementById("pixelfishcanvas").getContext("2d");
    canvas.fillStyle = fishPixeldata[lastIndex]
    canvas.fillRect((Math.floor(lastIndex / 256)) * 10, (lastIndex % 256) * 10, 10, 10);
    down = false
    cursorx = -1
    cursory = -1
    clearInterval(holdInterval)
}

function getFishPixels() {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey")
    };
    fetch('https://traoxfish.us-3.evennode.com/getpixelart', {
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
            fishPixeldata = json.art
            drawPixelFish()
        }
    });
}

var holdInterval
var down = false

function placePixel(event, down1) {

    down = down1

    

    if (down == false) {
        clearInterval(holdInterval)
        return
    } else {
        var index1 = lastIndex
        const data = {
            "username": getCookie("username"),
            "loginKey": getCookie("loginKey"),
            "index": index1,
            "color": color
        };
        fetch('https://traoxfish.us-3.evennode.com/placepixel', {
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
                var canvas = document.getElementById("pixelfishcanvas").getContext("2d");
                fishPixeldata[index1] = color
                canvas.fillStyle = color
                var i1 = Math.floor(index1 / 256)
                var j1 = index1 % 256
                canvas.fillRect(i1 * 10, j1 * 10, 10, 10);
            }
        });
    }

    var last2 = -1

    holdInterval = setInterval(function() {
        var index1 = lastIndex
        const data = {
            "username": getCookie("username"),
            "loginKey": getCookie("loginKey"),
            "index": index1,
            "color": color
        };
        fetch('https://traoxfish.us-3.evennode.com/placepixel', {
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
                var canvas = document.getElementById("pixelfishcanvas").getContext("2d");
                fishPixeldata[index1] = color
                canvas.fillStyle = color
                var i1 = Math.floor(index1 / 256)
                var j1 = index1 % 256
                canvas.fillRect(i1 * 10, j1 * 10, 10, 10);
            }
        });
    }, 5)
}

drawPixelFish()

var fullscreen = false
function fullscreenCanvas() {
    document.getElementById("colorinputfullscreen").value = document.getElementById("colorinput").value
    fullscreen = true
    document.getElementById("pixelfishcanvas").className = "pixelcanvasfullscreen"
    document.getElementById("pixelcanvasdiv").className = "pixelfishfullsecreen"
    document.getElementById("canvasfullscreenx").style.display = "inline-block"
    document.getElementById("colorinputfullscreen").style.display = "inline-block"
    document.getElementById("fullscreencolorselectorcolor").style.display = "inline-block"
}

function exitFullscreenCanvas() {
    document.getElementById("colorinput").value = document.getElementById("colorinputfullscreen").value
    fullscreen = false
    document.getElementById("pixelfishcanvas").className = "pixelfishcanvas"
    document.getElementById("pixelcanvasdiv").className = "pixelfish"
    document.getElementById("canvasfullscreenx").style.display = "none"
    document.getElementById("colorinputfullscreen").style.display = "none"
    document.getElementById("fullscreencolorselectorcolor").style.display = "none"
}

function closeProfile() {
    document.getElementById("viewprofile").style.display = "none";
    closeCreateGuild()
    closeFriends()
    closeGuild() 
    closeSettings()
    closeGuildInvites()
    document.getElementById("invitetoguildbutton").style.display = "none"
    document.getElementById("openguildinvitesbutton").style.display = "none"
    document.getElementById("openfriends").style.display = "none"
    document.getElementById("addfriend").style.display = "none"
    document.getElementById("sendchallengerequest").style.display = "none"
    document.getElementById("challengebet").style.display = "none"

    document.getElementById("profile-picture").style.pointer = "default"
    document.getElementById("profile-settings").style.display = "none"
    document.getElementById("createguildbutton").style.display = "none"
    document.getElementById("openguild").style.display = "none"
    document.getElementById("guildbackground").style.display = "none"


    document.getElementById("profile-username").innerText = "Loading..."
    document.getElementById("profile-rank").innerText = ""
    document.getElementById("profile-fish").innerText = "Fish: Loading..."
    document.getElementById("profile-rarefish").innerText = "Rare Fish: Loading..."
    document.getElementById("profile-veryrarefish").innerText = "Very Rare Fish: Loading..."
    document.getElementById("profile-sharks").innerText = "Sharks: Loading..."
    document.getElementById("profile-raresharks").innerText = "Rare Sharks: Loading..."
    document.getElementById("profile-whales").innerText = "Whales: Loading..."
    document.getElementById("profile-fishermen").innerText = "Fishermen: Loading..."
    document.getElementById("profile-chum").innerText = "Chum: Loading..."
    document.getElementById("profile-fishperclick").innerText = "Fish Per Click: Loading..."
    document.getElementById("profile-fishpersecond").innerText = "Fish Per Second: Loading..."
    document.getElementById("profile-fishbuckets").innerText = "Fish Buckets: Loading..."
    document.getElementById("profile-specialfish").innerText = "Special Fish: Loading..."
    document.getElementById("profile-alltimefish").innerText = "All Time Fish: Loading..."
    document.getElementById("profile-fishgambled").innerText = "Fish Gambled: Loading..."
    document.getElementById("profile-joindate").innerText = "Join Date: Loading..."
    document.getElementById("profile-lastonline").innerText = "Last Online: Loading..."
    document.getElementById("profile-playtime").innerText = "Playtime: Loading..."
    document.getElementById("profile-friends").innerText = "Friends: Loading..."
    document.getElementById("profile-guild").innerText = "Guild: Loading..."
    if (!gcTheme) document.getElementById("profile-picture").src = "../images/profiles/default.png"
    else document.getElementById("profile-picture").src = "../images/gcprofile.png"

    document.getElementById("selectpfpbackground").style.display = "none"
    document.getElementById("profile-picture").onclick = function () { }

}

var profileGuild = "none"

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
    fetch('https://traoxfish.us-3.evennode.com/getprofile', {
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
            var rareFish = json.rareFish
            var veryRareFish = json.veryRareFish
            var sharks = json.sharks
            var rareSharks = json.rareSharks
            var whales = json.whales
            var specialFish = json.specialFish
            var allTimeFish = json.allTimeFish
            var fishGambled = json.fishGambled
            var joinDate = json.joinDate
            var lastOnlineDate = json.lastOnlineDate
            var picture = json.profilePicture
            var friendStatus = json.friendStatus
            var rank = json.rank
            var fishermen = json.fishermen
            var chum = json.chum
            var fishBuckets = json.fishBuckets
            var playtime = json.playtime
            var friends = json.friends
            var challengeSetting = json.challengeSetting
            var guild = json.guild

            profileGuild = guild

            var fishPerSecond = json.fishPerSecond
            var fishPerClick = json.fishPerClick

            if (playtime == "") playtime = "None"

            if (rank == "none") rank = ""

            if (self == true) {
                document.getElementById("profile-picture").onclick = function () { openSetPFP() }
                document.getElementById("profile-picture").style.cursor = "pointer"
                document.getElementById("openfriends").style.display = "block"
                document.getElementById("addfriend").style.display = "none"
                document.getElementById("sendchallengerequest").style.display = "none"
                document.getElementById("challengebet").style.display = "none"
                document.getElementById("profile-settings").style.display = "inline-block"
                if (guild == "none") {
                    document.getElementById("createguildbutton").style.display = "block"
                    document.getElementById("openguild").style.display = "none"
                    document.getElementById("openguildinvitesbutton").style.display = "block"
                } else {
                    document.getElementById("createguildbutton").style.display = "none"
                    document.getElementById("openguild").style.display = "block"
                    document.getElementById("openguildinvitesbutton").style.display = "none"
                }
                document.getElementById("invitetoguildbutton").style.display = "none"
            } else {
                document.getElementById("createguildbutton").style.display = "none"
                document.getElementById("openguild").style.display = "none"
                document.getElementById("profile-picture").onclick = ""
                document.getElementById("profile-picture").style.cursor = "default"
                document.getElementById("openfriends").style.display = "none"
                document.getElementById("addfriend").style.display = "block"
                if (guild == "none" && isOwnerOfGuild) {
                    document.getElementById("invitetoguildbutton").style.display = "block"

                    document.getElementById("invitetoguildbutton").parentNode.replaceChild(document.getElementById("invitetoguildbutton").cloneNode(true), document.getElementById("invitetoguildbutton"))
                    document.getElementById("invitetoguildbutton").addEventListener('click', function() { inviteToGuild(profile, false) }, { once: false })
                } else {
                    document.getElementById("invitetoguildbutton").style.display = "none"
                }
                if (challengeSetting == "everyone" || (friendStatus == "friends" && challengeSetting == "friends")) document.getElementById("sendchallengerequest").style.display = "block"
                if (challengeSetting == "everyone" || (friendStatus == "friends" && challengeSetting == "friends")) document.getElementById("challengebet").style.display = "block"
                document.getElementById("profile-settings").style.display = "none"
                document.getElementById("addfriend").parentNode.replaceChild(document.getElementById("addfriend").cloneNode(true), document.getElementById("addfriend"))
                document.getElementById("sendchallengerequest").parentNode.replaceChild(document.getElementById("sendchallengerequest").cloneNode(true), document.getElementById("sendchallengerequest"))
                document.getElementById("sendchallengerequest").addEventListener('click', function() { sendChallengeRequest(profile, false) }, { once: false })
                if (friendStatus == "not friends") {
                    document.getElementById("addfriend").innerText = "Send Friend Request"
                    document.getElementById("addfriend").addEventListener('click', function() { sendFriendRequest(profile); delay(250).then(() => viewProfile(profile)) }, { once: true })
                    document.getElementById("sendchallengerequest").style.marginLeft = "360px"
                    document.getElementById("challengebet").style.marginLeft = "555px"
                    document.getElementById("challengeinfo").style.marginLeft = "360px"
                } else if (friendStatus == "friends") {
                    document.getElementById("addfriend").innerText = "Remove Friend"
                    document.getElementById("addfriend").addEventListener('click', function() { cancelFriend(profile); delay(250).then(() => viewProfile(profile)) }, { once: true })
                    document.getElementById("sendchallengerequest").style.marginLeft = "320px"
                    document.getElementById("challengebet").style.marginLeft = "515px"
                    document.getElementById("challengeinfo").style.marginLeft = "320px"
                } else if (friendStatus == "incoming") {
                    document.getElementById("addfriend").innerText = "Accept Friend Request"
                    document.getElementById("addfriend").addEventListener('click', function() { sendFriendRequest(profile); delay(250).then(() => viewProfile(profile)) }, { once: true })
                    document.getElementById("sendchallengerequest").style.marginLeft = "370px"
                    document.getElementById("challengebet").style.marginLeft = "565px"
                    document.getElementById("challengeinfo").style.marginLeft = "370px"
                } else if (friendStatus == "outgoing") {
                    document.getElementById("addfriend").innerText = "Cancel Friend Request"
                    document.getElementById("addfriend").addEventListener('click', function() { cancelFriend(profile); delay(250).then(() => viewProfile(profile))  }, { once: true })
                    document.getElementById("sendchallengerequest").style.marginLeft = "370px"
                    document.getElementById("challengebet").style.marginLeft = "565px"
                    document.getElementById("challengeinfo").style.marginLeft = "370px"
                }
                
                
            }

            document.getElementById("profile-guild").parentNode.replaceChild(document.getElementById("profile-guild").cloneNode(true), document.getElementById("profile-guild"))

            if (guild != "none") {
                document.getElementById("profile-guild").style.cursor = "pointer"
                document.getElementById("profile-guild").addEventListener('click', function() { openGuild()  }, { once: false })
            } else {
                document.getElementById("profile-guild").style.cursor = "auto"
            }

            document.getElementById("selectpfpbackground").style.display = "none"

            document.getElementById("profile-username").innerText = displayName + " (Lvl. " + level + ")"
            document.getElementById("profile-rank").innerText = rank
            document.getElementById("profile-fish").innerText = "Fish: " + formatNumber(fish)
            document.getElementById("profile-rarefish").innerText = "Rare Fish: " + formatNumber(rareFish)
            document.getElementById("profile-veryrarefish").innerText = "Very Rare Fish: " + formatNumber(veryRareFish)
            document.getElementById("profile-sharks").innerText = "Sharks: " + formatNumber(sharks)
            document.getElementById("profile-raresharks").innerText = "Rare Sharks: " + formatNumber(rareSharks)
            document.getElementById("profile-whales").innerText = "Whales: " + formatNumber(whales)
            document.getElementById("profile-specialfish").innerText = "Special Fish: " + formatNumber(specialFish)
            document.getElementById("profile-alltimefish").innerText = "All Time Fish: " + formatNumber(allTimeFish)
            document.getElementById("profile-fishgambled").innerText = "Fish Gambled: " + formatNumber(fishGambled)
            document.getElementById("profile-fishermen").innerText = "Fishermen: " + formatNumber(fishermen)
            document.getElementById("profile-chum").innerText = "Chum: " + formatNumber(chum)
            document.getElementById("profile-fishbuckets").innerText = "Fish Buckets: " + formatNumber(fishBuckets)
            document.getElementById("profile-fishperclick").innerText = "Fish Per Click: " + formatNumber(fishPerClick)
            document.getElementById("profile-fishpersecond").innerText = "Fish Per Second: " + formatNumber(fishPerSecond)
            document.getElementById("profile-joindate").innerText = "Join Date: " + joinDate
            document.getElementById("profile-lastonline").innerText = "Last Online: " + lastOnlineDate
            document.getElementById("profile-playtime").innerText = "Playtime: " + playtime
            document.getElementById("profile-friends").innerText = "Friends: " + friends
            document.getElementById("profile-guild").innerText = "Guild: " + guild
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
    fetch('https://traoxfish.us-3.evennode.com/setprofilepicture', {
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
    fetch('https://traoxfish.us-3.evennode.com/viewnotification', {
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
    fetch('https://traoxfish.us-3.evennode.com/sendfriendrequest', {
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
    fetch('https://traoxfish.us-3.evennode.com/sendfriendrequest', {
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
    fetch('https://traoxfish.us-3.evennode.com/getfriends', {
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
    fetch('https://traoxfish.us-3.evennode.com/changepassword', {
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

function closeFishingBoat() {
    document.getElementById("fishingboat").style.display = "none";
    closeFishingBoatShop()
}

function openFishingBoat() {
    if (level < 35) {
        document.getElementById("fishingboatstatus").style.display = "initial";
        delay(2000).then(() => {
            document.getElementById("fishingboatstatus").style.display = "none";
        }) 
        return
    }
    document.getElementById("fishingboat").style.display = "initial";
}

function collectFishingBoatFish() {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey")
    };
    fetch('https://traoxfish.us-3.evennode.com/collectfishingboat', {
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
            document.getElementById("fishingboatamount").innerText = "0 /" + document.getElementById("fishingboatamount").innerText.split("/")[1]
        }
    })
}

function openFishingBoatShop() {
    document.getElementById("fishingboatshop").style.display = "initial";
}

function closeFishingBoatShop() {
    document.getElementById("fishingboatshop").style.display = "none";
}

function sendChallengeRequest(user, cancel) {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "user": user,
        "bid": Math.max(formatedNumberToNumber(document.getElementById("challengebet").value), 1),
        "cancel": cancel
    };
    fetch('https://traoxfish.us-3.evennode.com/sendchallengerequest', {
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
            challenger = json.challenger
            document.getElementById("challengeinfo").innerText = "Sent challenge request!"
            document.getElementById("challengeinfo").style.color = "#84ea84";
            delay(2000).then(() => {
                document.getElementById("challengeinfo").innerHTML = ""
            })
        } else {
            document.getElementById("challengeinfo").innerText = json.error
            document.getElementById("challengeinfo").style.color = "#ea7b7b";
            delay(2000).then(() => {
                document.getElementById("challengeinfo").innerHTML = ""
            })
        }
    })
}

var challenger = undefined
var challengeTimestamp = 0
var challengeOptionChosen = false

function getChallengeRequest() {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey")
    };
    fetch('https://traoxfish.us-3.evennode.com/getchallegerequests', {
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
            if (json.challenger != undefined) {
                document.getElementById("challengenotification").style.display = "initial"
                document.getElementById("challengenotificationuser").innerText = json.challenger
                document.getElementById("challengenotificationbid").innerText = "Bet Amount: " + formatNumber(json.bid) + " Fish"
                challenger = json.challenger
            } else {
                document.getElementById("challengenotification").style.display = "none"
            }
        }
    })
}

function getChallengeStatus() {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey")
    };
    fetch('https://traoxfish.us-3.evennode.com/getchallegestatus', {
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
            if (json.gameStatus == "ongoing" || json.gameStatus == "won" || json.gameStatus == "lost" || json.gameStatus == "draw") {
                if (challengeTimestamp == 0) challengeTimestamp = Date.now()
                if (Date.now() - challengeTimestamp > 19500 && (30 - Math.ceil((Date.now() - challengeTimestamp) / 1000) >= 1)) document.getElementById("ongoinggamestatus").innerText = ((30 - Math.ceil((Date.now() - challengeTimestamp) / 1000)).toString() + " seconds left")
                else if (Date.now() - challengeTimestamp > 19500 && (30 - Math.ceil((Date.now() - challengeTimestamp) / 1000) < 1)) document.getElementById("ongoinggamestatus").innerText = "Ending game..."
                document.getElementById("challengegame").style.display = "initial"
                if (json.otherPlayersChoice == undefined) document.getElementById("challengegameoponentoption").innerText = "Waiting for " + json.challenger + " to choose their option..."
                else if (json.otherPlayersChoice == "unknown") document.getElementById("challengegameoponentoption").innerText = json.challenger + " has chosen their option..."
                else document.getElementById("challengegameoponentoption").innerText = json.challenger + " chose " + json.otherPlayersChoice
                document.getElementById("challengenotificationbid").innerText = "Bet Amount: " + json.bid + " Fish"
                if (json.gameStatus == "won") document.getElementById("ongoinggamestatus").innerText = "You Won " + formatNumber(json.bid) + " fish!"
                else if (json.gameStatus == "lost") document.getElementById("ongoinggamestatus").innerText = "You Lost " + formatNumber(json.bid) + " fish..."
                else if (json.gameStatus == "draw") document.getElementById("ongoinggamestatus").innerText = "Draw!"
            } else {
                document.getElementById("challengegame").style.display = "none"
                document.getElementById("ongoinggamestatus").innerText = "Choose an option"
                document.getElementById("baitchoice").disabled = false
                document.getElementById("baitchoice").className = "nicebutton"
                document.getElementById("fishchoice").disabled = false
                document.getElementById("fishchoice").className = "nicebutton"
                document.getElementById("hookchoice").disabled = false
                document.getElementById("hookchoice").className = "nicebutton"
                challengeTimestamp = 0
                challengeOptionChosen = false
            }
        } else {
            document.getElementById("challengegame").style.display = "none"
            document.getElementById("ongoinggamestatus").innerText = "Choose an option"
            document.getElementById("baitchoice").disabled = false
            document.getElementById("baitchoice").className = "nicebutton"
            document.getElementById("fishchoice").disabled = false
            document.getElementById("fishchoice").className = "nicebutton"
            document.getElementById("hookchoice").disabled = false
            document.getElementById("hookchoice").className = "nicebutton"
            challengeTimestamp = 0
            challengeOptionChosen = false
        }
    })
}

function chooseChallengeOption(choice) {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "choice": choice
    };
    fetch('https://traoxfish.us-3.evennode.com/sendchallengechoice', {
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
            challengeOptionChosen = true
            document.getElementById("ongoinggamestatus").innerText = "..."
            document.getElementById("baitchoice").disabled = false
            document.getElementById("baitchoice").className = "innactivebutton"
            
            document.getElementById("fishchoice").disabled = true
            document.getElementById("fishchoice").className = "innactivebutton"
            document.getElementById("hookchoice").disabled = true
            document.getElementById("hookchoice").className = "innactivebutton"
        }
    })
}

function setChallengeSetting() {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "setting": document.getElementById("challengesetting").value
    };
    fetch('https://traoxfish.us-3.evennode.com/setchallengesetting', {
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

function acceptChallenge() {
    sendChallengeRequest(challenger, false)
}

function declineChallenge() {
    sendChallengeRequest(challenger, true)
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

function openCreateGuild() {
    document.getElementById("createguildbackground").style.display = "block"
    document.getElementById("createguildname").value = ""
}

function closeCreateGuild() {
    document.getElementById("createguildbackground").style.display = "none"
}

function createGuild() {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "guildName": document.getElementById("createguildname").value
    };
    fetch('https://traoxfish.us-3.evennode.com/createguild', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.error != undefined) {
            document.getElementById("guildcreatestatus").innerText = json.error
            document.getElementById("guildcreatestatus").style.color = "#ea7b7b";
            delay(2000).then(() => {
                document.getElementById("guildcreatestatus").innerText = ""
            })
        } else if (json.status == "success") {
            document.getElementById("guildcreatestatus").innerText = "Successfully created guild!"
            document.getElementById("guildcreatestatus").style.color = "#84ea84";
            delay(1000).then(() => {
                document.getElementById("guildcreatestatus").innerText = ""
                viewProfile(getCookie("username"), true)
                delay(200).then(() => {
                    profileGuild = document.getElementById("createguildname").value
                    closeCreateGuild()
                    openGuild()
                })
            })
        }
    })
}

var openedGuild = "none"

function openGuild(guild) {
    document.getElementById("guildbackground").style.display = "block"
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "guild": guild || profileGuild
    };
    fetch('https://traoxfish.us-3.evennode.com/getguild', {
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

            var owner = json.owner
            var members = json.members
            var onlineMembers = json.onlineMembers
            var level = json.level
            var guildName = json.guildName
            var memberLimit = json.memberLimit
            var joinSetting = json.joinSetting
            var membershipStatus = json.membershipStatus
            var guildFish = json.guildFish
            var upgradeCosts = json.upgradeCosts
            var upgrades = json.upgrades
            var requests = json.requests

            openedGuild = guild || profileGuild

            document.getElementById("guildxpcolor").style.width = (json.xp / (json.xpForNextLevel + json.xp)) * 100 + "%"
            document.getElementById("guildxpcount").innerText = "XP: " + json.xp + " / " + (json.xpForNextLevel + json.xp)

            document.getElementById("guildname").innerText = guildName
            document.getElementById("guildowner").innerText = "Guild Owner: " + owner
            document.getElementById("guildlevel").innerText = "Level: " + level + " (+" + (Number(level) * 0.2).toFixed(1) + "% Fish)"
            document.getElementById("guildmembercount").innerText = "Members: " + members.length + " / " + memberLimit
            document.getElementById("guildjoinsetting").value = joinSetting
            document.getElementById("guildfish").innerText = "Guild Fish: " + guildFish
            document.getElementById("guildmemberlimitupgrade").innerText = "Member limit: " + (5 + upgrades.memberLimit * 5)
            document.getElementById("guildfishperclickupgrade").innerText = "Fish Per Click: +" + upgrades.fishPerClick + "%"
            document.getElementById("guildfishpersecondupgrade").innerText = "Fish Per Second: +" + upgrades.fishPerSecond + "%"

            document.getElementById("guildjoinbutton").parentNode.replaceChild(document.getElementById("guildjoinbutton").cloneNode(true), document.getElementById("guildjoinbutton"))
            document.getElementById("guildjoinbutton").addEventListener('click', function() { event.stopPropagation(); joinGuild(openedGuild); delay(200).then(() => openGuild(openedGuild)); })

            if (membershipStatus != "owner") {
                document.getElementById("guildjoinsetting").style.display = "none"
                document.getElementById("guildjoinsettingtext").innerText = "Join Setting: " + joinSetting
                document.getElementById("guildjoinrequestsbutton").style.display = "none"
            } else {
                document.getElementById("guildjoinsetting").style.display = "block"
                document.getElementById("guildjoinsettingtext").innerText = "Join Setting: "
                document.getElementById("guildjoinrequestsbutton").style.display = "block"
            }

            if (joinSetting != "request only") {
                document.getElementById("guildjoinrequestsbutton").disabled = true
                document.getElementById("guildjoinrequestsbutton").className = "innactivebutton"
            } else {
                document.getElementById("guildjoinrequestsbutton").disabled = false
                document.getElementById("guildjoinrequestsbutton").className = "nicebutton"
            }

            if (membershipStatus != "owner" && membershipStatus != "member" && members.length < memberLimit) {
                document.getElementById("guildjoinbutton").style.display = "block"
                document.getElementById("guildleavebutton").style.display = "none"
                if (joinSetting == "everyone") {
                    document.getElementById("guildjoinbutton").innerText = "Join Guild"
                } else if (joinSetting == "request only") {
                    if (membershipStatus == "none") {
                        document.getElementById("guildjoinbutton").innerText = "Request to Join"
                        document.getElementById("guildjoinbutton").disabled = false
                        document.getElementById("guildjoinbutton").className = "nicebutton"
                    } else if (membershipStatus == "requested") {
                        document.getElementById("guildjoinbutton").disabled = true
                        document.getElementById("guildjoinbutton").className = "innactivebutton"
                        document.getElementById("guildjoinbutton").innerText = "Requested to join"
                    }
                }
                if (membershipStatus == "invited") {
                    document.getElementById("guildjoinbutton").innerText = "Accept Invite"
                } else if (joinSetting == "invite only") {
                    document.getElementById("guildjoinbutton").style.display = "none"
                }
            } else if (membershipStatus == "owner" || membershipStatus == "member") {
                document.getElementById("guildjoinbutton").style.display = "none"
            } else if (members.length == memberLimit && (joinSetting == "everyone" || joinSetting == "request only")) {
                document.getElementById("guildjoinbutton").style.display = "block"
                document.getElementById("guildjoinbutton").disabled = true
                document.getElementById("guildjoinbutton").className = "innactivebutton"
                document.getElementById("guildjoinbutton").innerText = "Guild is Full"
            }

            if (membershipStatus == "owner" || membershipStatus == "member") {
                document.getElementById("guilddepositguildfish").style.display = "block"
                document.getElementById("guildleavebutton").style.display = "block"
                if (membershipStatus == "owner") {
                    if (members.length > 1) {
                        document.getElementById("guildleavebutton").innerText = "Leave Guild"
                        document.getElementById("guildleavebutton").className = "innactivebutton"
                        document.getElementById("guildleavebutton").disabled = true
                    } else {
                        document.getElementById("guildleavebutton").innerText = "Delete Guild"
                        document.getElementById("guildleavebutton").className = "nicebutton"
                        document.getElementById("guildleavebutton").disabled = false
                    }
                    document.getElementById("guildmemberlimitupgradebutton").style.display = "inline"
                    document.getElementById("guildfishperclickupgradebutton").style.display = "inline"
                    document.getElementById("guildfishpersecondupgradebutton").style.display = "inline"
                    document.getElementById("guildmemberlimitupgradecost").innerText = "Upgrade (" + upgradeCosts.memberLimit + " Guild Fish)"
                    document.getElementById("guildfishperclickupgradecost").innerText = "Upgrade (" + upgradeCosts.fishPerClick + " Guild Fish)"
                    document.getElementById("guildfishpersecondupgradecost").innerText = "Upgrade (" + upgradeCosts.fishPerSecond + " Guild Fish)"

                    document.getElementById("guildrequests").innerHTML = ""

                    for (var i = 0; i < requests.length; i++) {
                        var requestedUser = requests[i]
        
                        var item = document.createElement("p");
                        item.id = "guildrequesteduser-" + requestedUser
                        item.className = "frienditem"
                        item.addEventListener('click', function() { viewProfile(this.id.split("guildrequesteduser-")[1]); closeGuild(); closeGuildInvites(); })
                        item.style.cursor = "pointer"
                        item.textContent = requestedUser
        
                        var button = document.createElement("button");
                        button.innerText = "x"
                        button.className = "friendcancelbutton nicebutton"
                        button.addEventListener('click', function() { event.stopPropagation(); kickFromGuild(this.parentElement.id.split("guildrequesteduser-")[1], true)})

                        var button2 = document.createElement("button");
                        button2.innerText = "✓"
                        button2.className = "friendcancelbutton nicebutton"
                        button2.addEventListener('click', function() { event.stopPropagation(); inviteToGuild(this.parentElement.id.split("guildrequesteduser-")[1], true)})
                        button2.style.marginRight = "4px"
        
                        document.getElementById("guildrequests").appendChild(item);
        
                        document.getElementById("guildrequesteduser-" + requestedUser).appendChild(button);
                        document.getElementById("guildrequesteduser-" + requestedUser).appendChild(button2);
        
                    }

                } else if (membershipStatus == "member") {
                    document.getElementById("guildleavebutton").innerText = "Leave Guild"
                    document.getElementById("guildleavebutton").className = "nicebutton"
                    document.getElementById("guildleavebutton").disabled = false
                    document.getElementById("guildmemberlimitupgradebutton").style.display = "none"
                    document.getElementById("guildfishperclickupgradebutton").style.display = "none"
                    document.getElementById("guildfishpersecondupgradebutton").style.display = "none"
                }
            } else {
                document.getElementById("guilddepositguildfish").style.display = "none"
                document.getElementById("guildleavebutton").innerText = "Leave Guild"
            }

            if (userGuild == "none" || userGuild == "") document.getElementById("guildjoinbutton").style.display = "block"
            else document.getElementById("guildjoinbutton").style.display = "none"

            document.getElementById("guildmemberslist").innerHTML = ""

            for (var i in members) {
                var element = document.createElement("p")
                element.style.marginLeft = "4px"
                element.className = "frienditem"
                element.id = "guildprofile-" + members[i]
                element.innerText = onlineMembers[i].user
                if (onlineMembers[i].online) {
                    element.style.color = "#84ea84"
                } else if (gcTheme) element.style.color = "#212121"
                
                element.style.cursor = "pointer"
                element.addEventListener('click',function (event){
                    closeGuild()
                    viewProfile(this.id.split("-")[1])
                });

                var button = document.createElement("button");
                button.innerText = "Kick"
                button.className = "friendcancelbutton nicebutton"
                button.style.minWidth = "28px"
                button.style.maxWidth = "28px"
                button.style.marginRight = "6px"
                button.addEventListener('click', function() { event.stopPropagation(); kickFromGuild(this.parentElement.id.split("guildprofile-")[1], false); delay(200).then(() => openGuild(openedGuild)); })

                var button2 = document.createElement("button");
                button2.innerText = "Transfer Ownership"
                button2.className = "friendcancelbutton nicebutton"
                button2.style.minWidth = "96px"
                button2.style.maxWidth = "96px"
                button2.addEventListener('click', function() { event.stopPropagation(); transferOwnership(this.parentElement.id.split("guildprofile-")[1]); delay(200).then(() => openGuild(openedGuild)); })
                button2.style.marginRight = "4px"

                if (gcTheme) {
                    button.style.backgroundColor = "#ffffff"
                    button.style.outlineColor = "#dadce0"
                    button.style.color = "#212121"

                    button2.style.backgroundColor = "#ffffff"
                    button2.style.outlineColor = "#dadce0"
                    button2.style.color = "#212121"
                }

                document.getElementById("guildmemberslist").appendChild(element)

                if (members[i].toLowerCase() != getCookie("username").toLowerCase() && membershipStatus == "owner") {
                    document.getElementById("guildprofile-" + members[i]).appendChild(button)
                    document.getElementById("guildprofile-" + members[i]).appendChild(button2)
                }
            }

        }
    })
}

function closeGuild() {
    closeGuildRequests()
    openedGuild = "none"
    document.getElementById("guildrequestnotifications").style.display = "none"
    document.getElementById("guildbackground").style.display = "none"
    document.getElementById("guildmemberslist").innerHTML = "<p class=\"frienditem\" style=\"margin-left: 4px;\">Loading...</p>"
    document.getElementById("guildrequests").innerHTML = "<p class=\"frienditem\" style=\"margin-left: 4px;\">Loading...</p>"
    document.getElementById("guildname").innerText = "Loading..."
    document.getElementById("guildowner").innerText = "Guild Owner: Loading..."
    document.getElementById("guildlevel").innerText = "Level: Loading..."
    document.getElementById("guildmembercount").innerText = "Members: Loading..."
    document.getElementById("guildjoinsettingtext").innerText = "Join Setting: Loading..."
    document.getElementById("guildjoinsetting").style.display = "none"
    document.getElementById("guildjoinrequestsbutton").style.display = "none"
    document.getElementById("guilddepositguildfish").style.display = "none"
    document.getElementById("guildmemberlimitupgradebutton").style.display = "none"
    document.getElementById("guildfishperclickupgradebutton").style.display = "none"
    document.getElementById("guildfishpersecondupgradebutton").style.display = "none"
    document.getElementById("guildmemberlimitupgrade").innerText = "Member limit: Loading..."
    document.getElementById("guildfishperclickupgrade").innerText = "Fish Per Click: Loading..."
    document.getElementById("guildfishpersecondupgrade").innerText = "Fish Per Second: Loading..."
}

function setGuildJoinSetting() {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "setting": document.getElementById("guildjoinsetting").value
    };
    fetch('https://traoxfish.us-3.evennode.com/setguildsetting', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {
        openGuild()
    })
}

function leaveGuild() {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey")
    };
    fetch('https://traoxfish.us-3.evennode.com/leaveguild', {
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
            closeGuild()
            viewProfile(getCookie("username"), true)
        }
    })
}

function joinGuild(guild) {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "guild": guild
    };
    fetch('https://traoxfish.us-3.evennode.com/joinguild', {
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
            openGuild()
        }
    })
}

function depositGuildFish() {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
    };
    fetch('https://traoxfish.us-3.evennode.com/contributeguildfish', {
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
            openGuild()
        }
    })
}

function purchaseGuildUpgrade(upgrade) {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "upgrade": upgrade
    };
    fetch('https://traoxfish.us-3.evennode.com/purchaseguildupgrade', {
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
            openGuild()
        }
    })
}

function openGuildRequests() {
    document.getElementById("guildrequestsbackground").style.display = "block"
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "notificationType": "guildrequests"
    };
    fetch('https://traoxfish.us-3.evennode.com/viewnotification', {
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

function closeGuildRequests() {
    document.getElementById("guildrequestsbackground").style.display = "none"
}

function inviteToGuild(user, request) {
    console.log(user)
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "invitedUser": user
    };
    fetch('https://traoxfish.us-3.evennode.com/invitetoguild', {
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
            if (request) {
                openGuild()
                openGuildRequests()
            }
        }
    })
}

function kickFromGuild(user, request) {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "kickedUser": user
    };
    fetch('https://traoxfish.us-3.evennode.com/kickfromguild', {
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
            openGuild()
            if (request) openGuildRequests()
        }
    })
}

function transferOwnership(user) {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "newOwner": user
    };
    fetch('https://traoxfish.us-3.evennode.com/transerguildownership', {
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
            openGuild()
        }
    })
}

function declineGuildInvite(guild) {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "guild": guild
    };
    fetch('https://traoxfish.us-3.evennode.com/declineguildinvite', {
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
    })
}

function openGuildInvites() {
    document.getElementById("guildinvitesbackground").style.display = "block"
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "notificationType": "guildinvites"
    };
    fetch('https://traoxfish.us-3.evennode.com/viewnotification', {
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

function closeGuildInvites() {
    document.getElementById("guildinvitesbackground").style.display = "none"
}

function setChannel(channel1) {
    if (channel1 == channel) return
    if (channel1 == "public") {
        channel = "public"



        if (!gcTheme) document.getElementById("publicchattext").style.color = "#ffffff"
        else document.getElementById("publicchattext").style.color = "#212121"
        document.getElementById("publicchatbar").style.display = "block"

        document.getElementById("guildchattext").style.color = "#cccccc"
        document.getElementById("guildchatbar").style.display = "none"
        document.getElementById("staffchattext").style.color = "#cccccc"
        document.getElementById("staffchatbar").style.display = "none"
    } else if (channel1 == "guild") {
        channel = "guild"

        if (!gcTheme) document.getElementById("guildchattext").style.color = "#ffffff"
        else document.getElementById("guildchattext").style.color = "#212121"
        document.getElementById("guildchatbar").style.display = "block"

        document.getElementById("publicchattext").style.color = "#cccccc"
        document.getElementById("publicchatbar").style.display = "none"
        document.getElementById("staffchattext").style.color = "#cccccc"
        document.getElementById("staffchatbar").style.display = "none"
    } else if (channel1 == "staff") {
        channel = "staff"

        if (!gcTheme) document.getElementById("staffchattext").style.color = "#ffffff"
        else document.getElementById("staffchattext").style.color = "#212121"
        document.getElementById("staffchatbar").style.display = "block"

        document.getElementById("publicchattext").style.color = "#cccccc"
        document.getElementById("publicchatbar").style.display = "none"
        document.getElementById("guildchattext").style.color = "#cccccc"
        document.getElementById("guildchatbar").style.display = "none"
    }
    document.getElementById("chat").innerHTML = ""
    changedChannel = true
    getMessages(true)
}
