shownotes();
impsecdisplay();
important();

// ================add element to local storage memory=================
let addbtn = document.getElementById("addbtn")
const on_addbtn = () => {
    let notes = localStorage.getItem("material")
    let he_ar = document.getElementById("headArea");
    let txar = document.getElementById("txtArea");
    if (notes == null) {
        notesarr = [];
    }
    else {
        notesarr = JSON.parse(notes);
    }
    if (txar.value != "" && he_ar.value!=""){
        notesarr.push([he_ar.value, txar.value.replace(/\s\n\s/gi, "<br/>").replace(/\s\n/gi, "<br/>").replace(/\n\s/gi, "<br/>").replace(/\n/gi, "<br/>").replace(/\s{2,}/g, ' ')]);
    }
    localStorage.setItem("material", JSON.stringify(notesarr));
    txar.value = '';
    he_ar.value = '';
    shownotes();
}
addbtn.addEventListener("click", on_addbtn)

// ===========display the cards on DOM============== 
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
    let star = localStorage.getItem('star');
    if (star == null) {
        stararr = [];
    }
    else {
        stararr = JSON.parse(star);
    }
    notesarr.forEach((e, index) => {
        flag = 0
        stararr.forEach((se) => {
            if (se == index)
                flag++;
        });
        if (flag != 0) {
            writedown.innerHTML += `
                    <div class="shadow noteCard my-2 mx-2 card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title cb">${e[0]}</h5>
                            <p class="card-text cb1">${e[1]}</p>
                            <button id="${index}"onclick="deletecard(this.id)" class="btn btn-danger">Delete Note</button>
                            <span class="impMsg">Important!</span>
                            <i class="bi bi-star-fill imp1"></i>
                        </div>
                    </div>
                `;
        }
        else {
            writedown.innerHTML += `
                    <div class="shadow noteCard my-2 mx-2 card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title cb"> ${e[0]}</h5>
                            <p class="card-text cb1">${e[1]}</p>
                            <button id="${index}"onclick="deletecard(this.id)" class="btn btn-danger">Delete Note</button>
                            <span class="impMsg">Important!</span>
                            <i class="bi bi-star imp1"></i>
                        </div>
                    </div>
                `;
        }
        important();
    });

}

// =================for important section============
function important() {
    let data = document.querySelectorAll(".noteCard");
    data.forEach((e, index) => {
        let halfStar = e.getElementsByTagName("i")[0];
        let impMsg = e.getElementsByTagName("span")[0];
        halfStar.addEventListener("mouseenter", () => {
            impMsg.style.display = "block";
        })
        halfStar.addEventListener("mouseout", () => {
            impMsg.style.display = "none";
        })
        halfStar.addEventListener("click", () => {
            if (halfStar.classList[1] == "bi-star") {
                halfStar.className = 'bi bi-star-fill imp1';
                notesarr.forEach((ne, index) => {
                    console.log(e.getElementsByTagName('p')[0].innerText.replace(/\n/gi, "<br/>"))
                    console.log(ne[1]);
                    if (e.getElementsByTagName('p')[0].innerText.replace(/\n/gi, "<br/>") == ne[1]) { 
                        impsecadd(index); 
                    }
                })
            }
            else if (halfStar.classList[1] == "bi-star-fill") {
                halfStar.className = 'bi bi-star imp1';
                notesarr.forEach((ne, index) => {
                    if (e.getElementsByTagName('p')[0].innerText == ne[1])
                        impsecremove(index);
                })

            }
        })
    });
    // shownotes();
}

// =========to import stared card index no in the local storage of 'star'=====
function impsecadd(index) {
    let star = localStorage.getItem('star');
    if (star == null) {
        stararr = [];
    }
    else {
        stararr = JSON.parse(star);
    }
    stararr.push(index);
    localStorage.setItem('star', JSON.stringify(stararr));
    impsecdisplay();
}

// ============to display card in the important section===================
function impsecdisplay() {
    let impsec = document.querySelector(".important-section");
    impsec.innerHTML = "";
    let star = localStorage.getItem('star');
    if (star == null) {
        stararr = [];
    }
    else {
        stararr = JSON.parse(star);
    }
    stararr.forEach((e) => {

        impsec.innerHTML += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title cb">${notesarr[e][0]}</h5>
        <p class="card-text cb1">${notesarr[e][1]}</p>
        <button id="${e}"onclick="deletecard(this.id)" class="btn btn-danger">Delete Note</button><i>
        <span class="impMsg">Important!</span>
        </div>
        </div>   
        `;
    });

}

//===========to remove card form important if we uncheck star=============
function impsecremove(notodel) {
    stararr.forEach((e, index) => {
        if (e == notodel)
            stararr.splice(index, 1);
        localStorage.setItem('star', JSON.stringify(stararr));
    })
    impsecdisplay();
}

// ===============this will delete the card =============
function deletecard(notodel) {
    notesarr.splice(notodel, 1);
    localStorage.setItem('material', JSON.stringify(notesarr));
    stararr.forEach((e, index) => {
        if (e == notodel)
            stararr.splice(index, 1);
        else if (e > notodel)
            stararr[index]--;
        localStorage.setItem('star', JSON.stringify(stararr));
    })
    impsecdisplay();
    shownotes();
}

// =============for searching any card ===============
let search = document.getElementById('search');
search.addEventListener('input', () => {
    document.querySelector('#divTextArea').style.display = 'none';
    let data = document.querySelectorAll(".noteCard");
    data.forEach((e) => {
        let element = e.getElementsByTagName('p')[0].innerText.toLowerCase();
        let element1 = e.getElementsByTagName('h5')[0].innerText.toLowerCase();
        if (element.includes(search.value.toLowerCase()) || element1.includes(search.value.toLowerCase())) {
            e.style.display = "block"
        }
        else {
            e.style.display = "none";
        }
        if (search.value == "")
            document.querySelector('#divTextArea').style.display = 'block';
    })
});