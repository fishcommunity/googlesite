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

function getData() {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
    };
    fetch("https://traoxfish.eu-4.evennode.com/getadmindata", {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {
        document.getElementById("data").innerText = JSON.stringify(json.data, null, 4)
    });
}

function sendCommand() {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "command": document.getElementById("command").value,
        "user": document.getElementById("user").value,
        "value": document.getElementById("value").value,
    };
    fetch("https://traoxfish.eu-4.evennode.com/sendadmincommand", {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {
        getData()
    });
}

getData()

setInterval(function() {
    keepOnline()
}, 1000)

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