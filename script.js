shownotes();

// add element to local storage 
let addbtn = document.getElementById("addbtn")
addbtn.addEventListener("click", () => {
    let notes = localStorage.getItem("material")
    let txar = document.getElementById("txtArea");
    if (notes == null) {
        notesarr = [];
    }
    else {
        notesarr = JSON.parse(notes);
    }
    if (txar.value != "")
        notesarr.push(txar.value);
    localStorage.setItem("material", JSON.stringify(notesarr));
    txar.value = '';
    shownotes();
})

// display the cards on DOM 
function shownotes() {
    let writedown = document.getElementById("write");
    writedown.innerHTML = "";
    let notes = localStorage.getItem("material")
    if (notes == null) {
        notesarr = [];
    }
    else {
        notesarr = JSON.parse(notes);
    }
    notesarr.forEach((e, index) => {
        writedown.innerHTML += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title cb">Note ${index + 1}</h5>
                    <p class="card-text cb1">${e}</p>
                    <button id="${index}"onclick="deletecard(this.id)" class="btn btn-danger">Delete Note</button>
                </div>
            </div>
        `
    });
}

// this will delete the card 
function deletecard(index) {
    notesarr.splice(index, index + 1);
    localStorage.setItem('material', JSON.stringify(notesarr));
    shownotes();
}

let search = document.getElementById('search');
search.addEventListener('input', () => {
    document.querySelector('#divTextArea').style.display = 'none';
    let data = document.querySelectorAll(".noteCard");
    data.forEach((e) => {
        let element = e.getElementsByTagName('p')[0].innerText.toLowerCase();
        if (element.includes(search.value.toLowerCase())) {
            e.style.display = "block"
        }
        else {
            e.style.display = "none";
        }
        if (search.value == "")
            document.querySelector('#divTextArea').style.display = 'block';
    })
});