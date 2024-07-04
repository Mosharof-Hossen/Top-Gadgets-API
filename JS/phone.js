const phonesLoad = async ()=> {
    const url = 'https://openapi.programming-hero.com/api/phones?search=iphone';
    const res = await fetch(url);
    const phones = await res.json();
    console.log(phones.data);
}

function phoneDisplay(params) {
    
}

phonesLoad()