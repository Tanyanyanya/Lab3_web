var size_global = 30;

window.onload = () =>{
    set_masonry_grid_layout();
    add_the_pic_by_url();
    //hide_the_containers();
    change_the_size();
}

function add_the_pic_by_url(){
    const grid = document.querySelector('.grid');
    const button_add = document.querySelector('.buttonadd');
    const input_field = document.querySelector('.pictureurl');
    button_add.onclick = function(event){
        const img_container = document.createElement("div");
        img_container.className = "grid-item";
        const added_img = document.createElement("img");
        added_img.className = "grid-img";
        added_img.alt = "";
        added_img.src = input_field.value;
        img_container.appendChild(added_img);
        input_field.value = "";


        /*var deletebut = document.createElement("button");
        deletebut.name="delbut";
        deletebut.textContent="delete"
        deletebut.style="width:100%; height:25px;"*/

        added_img.onclick = function(event){
            added_img.remove();
            set_masonry_grid_layout();

            save_innerhtml();
        }
        //img_container.appendChild(deletebut);

        grid.appendChild(img_container);
        img_container.style.width = size_global+"%";
        set_masonry_grid_layout();

        save_innerhtml();
    }
}

function set_masonry_grid_layout(){
    const grid = document.querySelector('.grid');

    const masonry = new Masonry(grid, {
        itemSelecor: '.grid-item',
        gutter: 5,
        
    });
}

async function save_innerhtml(){
    const html_to_save = document.querySelector(".grid").outerHTML;
    const response = await fetch("/api/updates/put?id=1", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            id: 1,
            innerhtml: html_to_save
        })
    });
}

function change_the_size(){
    const button_size = document.querySelector('.buttonsize');
    const input_field = document.querySelector('.maxpicsize');
    button_size.onclick = function(event){
        var field_val = parseInt(input_field.value);
        console.log(field_val);
        if(field_val.toString() != "NaN")
        {
            const divs_to_hide = document.querySelectorAll('.grid-item');
            console.log(divs_to_hide);
            divs_to_hide.forEach(pic=>{
                pic.style.width = field_val + "%"
            });
            size_global = field_val;
        }
        else
        {
            alert('NaN');
        }
        input_field.value = "";
        set_masonry_grid_layout();
        save_innerhtml();
    }
}

/*
function hide_the_containers(){
    const button_hide = document.querySelector('.buttonhide');
    const input_field = document.querySelector('.maxpicvalue');
    button_hide.onclick = function(event){
        var count = parseInt(input_field.value);
        console.log(count);
        if(count.toString() != "NaN")
        {
            const divs_to_hide = document.querySelectorAll('.grid-item');
            console.log(divs_to_hide);
            if (count>divs_to_hide.length)
            {
                count = divs_to_hide.length;
            }
            for(var i=0; i<count; i++)
            {
                divs_to_hide[i].style.visibility = "visible";
            }
            if(count!=divs_to_hide.length)
            {
                for(var j=count; j<divs_to_hide.length; j++)
                {
                    divs_to_hide[j].style.visibility = "hidden";
                }
            }
        }
        else
        {
            alert('NaN');
        }
        input_field.value = "";
    }    
}*/