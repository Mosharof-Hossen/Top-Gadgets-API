const defaultPhonesLoad = async (phone,limit)=> {
    isLoading(true);
    const url = `https://openapi.programming-hero.com/api/phones?search=${phone}`;
    const res = await fetch(url);
    const phones = await res.json();
    phoneDisplay(phones.data,limit);
}

function phoneDisplay(products, limit) {
    const productContainer = document.getElementById('product-container');
    console.log(products);
    productContainer.innerText = "";
    if(products.length > limit && limit){
        products = products.slice(0,8)
        showAll(true);
    }else{
        showAll(false);
    }
    products.forEach((product ) => {
        let div = document.createElement('div');
        div.classList.add('card','bg-base-100', 'w-80', 'shadow-lg');
        div.innerHTML = `
        <figure class="px-5 pt-5">
            <img src=${product.image} alt="Shoes"
                class="rounded-md" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title text-2xl font-bold">${product.phone_name}</h2>
            <p class="text-lg">If a dog chews shoes whose shoes does he choose?</p>
            <h2 class=" text-2xl font-bold">$999</h2>
            <div class="card-actions">
                <button class="btn bg-blue-500 hover:bg-blue-600 text-white">Show Details</button>
            </div>
        </div>
        `
        productContainer.appendChild(div)
        isLoading(false);
    });
}

const defaultPhoneSeeAll =()=>{
    console.log('clicked');
    defaultPhonesLoad('iphone')
}

const processSearch = (limit)=>{
    isLoading(true);
    const inputField = document.getElementById('input-field');
    
}


const isLoading = (value)=>{
    const loadingContainer = document.getElementById('loading');
    if(value){
        loadingContainer.classList.remove('hidden');
    }else{
        loadingContainer.classList.add('hidden');
    }
}
const showAll = (value)=>{
    const showAll = document.getElementById('show-all');
    if(value){
        showAll.classList.remove('hidden');
    }else{
        showAll.classList.add('hidden');
    }
}

defaultPhonesLoad('iphone',8)