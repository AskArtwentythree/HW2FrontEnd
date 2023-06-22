const enter = document.getElementById("enter")

const time = document.getElementById("time")

const notice = document.getElementById("notice")

const button = document.getElementById("button")

const img = document.getElementById("img")

const title = document.getElementById("title")



async function getId(){
    var id;
    await fetch(`https://fwd.innopolis.university/api/hw2?email=${enter.value}`)
        .then(response => response.json())
        .then((data) =>{
            id = data;
        })
        .catch(() =>{
            notice.classList.remove("wrapped");
            setTimeout(() => {
                notice.classList.add("wrapped");
            }, 2000);
        });
    return id;
}

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
async function getComic(){
    await fetch(`https://fwd.innopolis.university/api/comic?id=${await getId()}`)
        .then(response => response.json())
        .then((data) =>{
            img.src = data["img"]
            title.textContent = data["safe_title"]
            img.alt = data["alt"]
            time.textContent = new Date(data["year"], data["month"], data["day"]).toLocaleDateString(undefined, options)
        })
}

button.onclick = getComic

