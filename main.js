let myForm = document.querySelector('#myForm');
let title = document.querySelector('#title');
let description = document.querySelector('#description');
let image_url =  document.querySelector('#image_url');
let category = document.querySelector('#category');
let condition =  document.querySelector('#condition');
let wrapper = document.querySelector('#wrapper');
let loader = document.querySelector('#loader');
let regerEx = /^[a-zA-Z0-9]{3,}$/
let regerExx = /^https:\/\/.+/i
myForm.addEventListener('submit', (event)=>{
    event.preventDefault();
if(regerEx.test(title.value && description.value) && regerExx.test(image_url.value)){
    postData()
}else{
    title.style.border = "1px solid red";
    description.style.border = "1px solid red";
    image_url.style.border = "1px solid red";
    alert("name va model eng kamida 3ta harf bulsin va img_url boshlanishi https dan boshlansin ")
}

})
async function postData() {
    try{
        loader.style.display = "block";
        let data_url = await fetch("https://effective-mobile.duckdns.org/api/ads/",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: title.value,
                description: description.value,
                image_url: image_url.value,
                category: category.value,
                condition: condition.value
            })
        })

        if(data_url.ok){
            alert("Success!")
            fetchData()
        }else{
            alert("Error!")
        }
    }catch (error) {
        alert(error)
    }finally{
        loader.style.display = "none";
        title.value = ""
        description.value = ""
        image_url.value = ""
        category.value = ""
        condition.value = ""
    }

}

async function fetchData() {
    try{
        loader.style.display = "block";
        let data = await fetch("https://effective-mobile.duckdns.org/api/ads/",{
            method: "GET",
        })
        let json = await data.json();
        render(json.results)
    }catch (errors) {
        alert(errors)
    }finally {
        loader.style.display = "none";
    }

}
function render(get) {
    wrapper.innerHTML = "";

    get.forEach(element => {
        let box = document.createElement("div");
        box.innerHTML = `
<div class="items-center w-full">
<div class="bg-red-300 items-center justify-center flex   p-6">
<div>
        <p class="font-mono font-bold text-xl ">${element.id}</p>
        <p class="font-mono font-bold text-xl ">${element.title} </p>
        <p class="font-mono font-bold text-xl ">${element.description} </p>
        
</div>
<img class=" max-w-[300px]  h-[200px]" src="${element.image_url}" alt="${element.title}"/>
        </div>
</div>

        `
        wrapper.appendChild(box);
    })
}
fetchData()


