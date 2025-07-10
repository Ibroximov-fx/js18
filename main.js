let myForm = document.querySelector('#myForm');
let title = document.querySelector('#title');
let description = document.querySelector('#description');
let image_url = document.querySelector('#image_url');
let category = document.querySelector('#category');
let condition = document.querySelector('#condition');
let wrapper = document.querySelector('#wrapper');
let loader = document.querySelector('#loader');
let btn_box = document.querySelector('#btn_box');
let x_btn = document.querySelector('#x_btn');
let back_btn = document.querySelector('#back_btn');
let delete_btn = document.querySelector('#delete_btn');
let card
let regerEx = /^[a-zA-Z0-9]{3,}$/
let regerExx = /^https:\/\/.+/i
myForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (regerEx.test(title.value && description.value) && regerExx.test(image_url.value)) {
        postData()
    } else {
        title.style.border = "1px solid red";
        description.style.border = "1px solid red";
        image_url.style.border = "1px solid red";
        alert("name va model eng kamida 3ta harf bulsin va img_url boshlanishi https dan boshlansin ")
    }

})

async function postData() {
    try {
        loader.style.display = "block";
        let data_url = await fetch("https://effective-mobile.duckdns.org/api/ads/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                title: title.value,
                description: description.value,
                image_url: image_url.value,
                category: category.value,
                condition: condition.value
            })
        })

        if (data_url.ok) {
            alert("Success!")
            fetchData()
        } else {
            alert("Error!")
        }
    } catch (error) {
        alert(error)
    } finally {
        loader.style.display = "none";
        title.value = ""
        description.value = ""
        image_url.value = ""
        category.value = ""
        condition.value = ""
    }

}

async function fetchData() {
    try {
        loader.style.display = "block";
        let data = await fetch("https://effective-mobile.duckdns.org/api/ads/", {
            method: "GET",
        })
        let json = await data.json();
        render(json.results)
    } catch (errors) {
        alert(errors)
    } finally {
        loader.style.display = "none";
    }

}

function render(get) {
    wrapper.innerHTML = "";

    get.forEach(element => {
        let box = document.createElement("div");
        box.innerHTML = `
<div class="items-center w-full bg-red-300">
<div class=" items-center justify-center flex gap-10  p-6">
<div>
        <p class="font-mono font-bold text-xl ">${element.id}</p>
        <p class="font-mono font-bold text-xl ">${element.title} </p>
        <p class="font-mono font-bold text-xl ">${element.description} </p>
</div>
<img class=" max-w-[300px]  h-[200px]" src="${element.image_url}" alt="${element.title}"/>
        </div>
        <div class="flex gap-2 justify-end">
        <button data-id="${element.id}" class="bg-yellow-300 border border-yellow-200 px-4 rounded btn_edit">edit</button>
        <button data-id="${element.id}" class="bg-red-700 border border-red-200 px-4 rounded btn_delete">delete</button>
        </div>
</div>

        `
        wrapper.appendChild(box);
    })
    let btn_edit = document.querySelectorAll(".btn_edit");
    let btn_delete = document.querySelectorAll(".btn_delete")
    btn_edit.forEach(btn_edits => {
        btn_edits.addEventListener("click", (event) => {
            inputEdit(btn_edits.getAttribute("data-id"))
        })
    })
    btn_delete.forEach(btn_deletes => {
        btn_deletes.addEventListener('click', (event) => {
            btn_box.style.display = "block";
            delete_btn.addEventListener('click', (event) => {
                btn_box.style.display = "none";
                inputDelite(btn_deletes.getAttribute("data-id"))
            })
            x_btn.addEventListener('click', (event) => {
                btn_box.style.display = "none";
            })
            back_btn.addEventListener('click', (event) => {
                btn_box.style.display = "none";
                alert("you did not delete this file")
            })



        })
    })
}


async function inputEdit(id) {
    let getData = await fetch(`https://effective-mobile.duckdns.org/api/ads/${id}/`)
    let inputparse = await getData.json()

    title.value = inputparse.title;
    description.value = inputparse.description;
    image_url.value = inputparse.image_url;
    category.value = inputparse.category;
    condition.value = inputparse.condition;
}

async function inputDelite(id) {
    let deliteData = await fetch(`https://effective-mobile.duckdns.org/api/ads/${id}/`, {
        method: "DELETE",
    })
    if (deliteData.ok) {
        alert("Success delete")
        fetchData()
    } else {
        alert("Error delete")
    }
}

fetchData()


