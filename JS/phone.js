const defaultPhonesLoad = async (phone, limit) => {
    isLoading(true);
    const url = `https://openapi.programming-hero.com/api/phones?search=${phone}`;
    const res = await fetch(url);
    const phones = await res.json();
    phoneDisplay(phones.data, limit);
}

function phoneDisplay(products, limit) {
    const productContainer = document.getElementById('product-container');
    console.log(products);
    if(products.length ==0){
        isLoading(false);
        return;
    }
    productContainer.innerText = "";
    if (products.length > limit && limit) {
        products = products.slice(0, 8)
        showAll(true);
    } else {
        showAll(false);
    }
    products.forEach((product) => {
        let div = document.createElement('div');
        div.classList.add('card', 'bg-base-100', 'w-80', 'shadow-lg');
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
                <button  onclick="loadPhoneDetails('${product.slug}')" class="btn bg-blue-500 hover:bg-blue-600 text-white">Show Details</button>
            </div>
        </div>
        `
        productContainer.appendChild(div)
        isLoading(false);
    });
}

const defaultPhoneSeeAll = () => {
    isLoading(true);
    const inputFieldValue = document.getElementById('input-field').value;
    console.log(inputFieldValue);
    inputFieldValue ? defaultPhonesLoad(inputFieldValue) : defaultPhonesLoad('iphone');
}

const processSearch = (limit) => {
    isLoading(true);
    const inputFieldValue = document.getElementById('input-field').value;
    defaultPhonesLoad(inputFieldValue, limit);

}

document.getElementById('input-search-btn').addEventListener('click', () => {
    processSearch(8);
})

document.getElementById('input-field').addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        processSearch(8)
    }
})

// Display phone details

const loadPhoneDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const productDetail = await res.json();
    phoneDetailsDisplay(productDetail.data);
}
const phoneDetailsDisplay = (phone) => {

    document.getElementById("modalImage").setAttribute('src', phone.image);
    const detailsDiv = document.getElementById('description-details');
    detailsDiv.innerHTML = `
        <h2 id="name" class="card-title text-3xl font-bold">${phone.name}</h2>
        <p class="text-base">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <p class="text-xl"><span class="font-bold">Storage:</span> ${phone?.mainFeatures?.storage}</p>
        <p class="text-xl"><span class="font-bold">Display Size:</span> ${phone?.mainFeatures?.displaySize}</p>
        <p class="text-xl"><span class="font-bold">Chipset:</span> ${phone?.mainFeatures?.chipSet}</p>
        <p class="text-xl"><span class="font-bold">Memory:</span> ${phone?.mainFeatures?.memory}</p>
        <p class="text-xl"><span class="font-bold">Slug:</span> ${phone?.slug}</p>
        <p class="text-xl"><span class="font-bold">Release data:</span> ${phone?.releaseDate || "Recent"}</p>
        <p class="text-xl"><span class="font-bold">Brand:</span> ${phone?.brand}</p>
        <p class="text-xl"><span class="font-bold">GPS:</span> ${phone?.others?.GPS || "No GPS"}</p>
    `
    my_modal.showModal()
}

const isLoading = (value) => {
    const loadingContainer = document.getElementById('loading');
    if (value) {
        loadingContainer.classList.remove('hidden');
    } else {
        loadingContainer.classList.add('hidden');
    }
}
const showAll = (value) => {
    const showAll = document.getElementById('show-all');
    if (value) {
        showAll.classList.remove('hidden');
    } else {
        showAll.classList.add('hidden');
    }
}

defaultPhonesLoad('iphone', 8)