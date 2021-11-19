let addbtn =document.getElementById("addbtn")
addbtn.addEventListener("click",() =>{
    let notes = localStorage.getItem("material")
    let txar=document.getElementById("txtArea");
    if(notes == null){
        notesarr=[];
    }
    else{
        notesarr=JSON.parse(notes);
    }
    notesarr.push(txar.value);
    localStorage.setItem("material",JSON.stringify(notesarr));
})