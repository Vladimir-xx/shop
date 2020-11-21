// ===================Товары=====================
let products = [
    {
        id: 'qwerty1',
        productName: 'asus',
        price: 1000,
        img: 'images/asus-5.jpg',
        counter: 1
    },
    {   
        id: 'qwerty2',
        productName: 'dell',
            price: 7000,
            img: 'images/nout-asus.jpg',
            counter: 1
    },
    {   
        id: 'qwerty3',
        productName: 'acer',
            price: 3000,
            img: 'images/asus-5.jpg',
            counter: 1
    },
    {   
        id: 'qwerty4',
        productName: 'apple',
            price: 13000,
            img: 'images/asus-5.jpg',
            counter: 1
    },
    {   
        id: 'qwerty5',
        productName: 'apple pro',
            price: 18000,
            img: 'images/asus-5.jpg',
            counter: 1
    },
    {   
        id: 'qwerty6',
        productName: 'MSI pro',
            price: 11000,
            img: 'images/asus-5.jpg',
            counter: 1
    }
];

let basket = [];

initBasket()
renderProducts();
initEvent();

function initEvent(){

    let btnsBuy =  document.querySelectorAll('.buy__produkt');
    btnsBuy.forEach( btn => {
        btn.addEventListener('click', event =>{
            addToBasket( event.target.dataset.id);
        });
    })

    document.querySelector('.basket-icon').addEventListener('click', event =>{
        renderBasket( )
    });
   

}

function renderProducts(){
    let container =  document.querySelector('.container__product');
    
    products.forEach( elem => {

        let div = document.createElement('div');
        div.innerHTML = `
        <div class="card__produkt" id="${elem.id}">
        <a class="card__produkt__item" href="#">
          <h2 class="card__produkt__name">Ноутбук ${elem.productName}</h2>
          <div class="card__produkt__img">
            <img src="${elem.img}" alt="">
          </div>
          <div class="card__produkt__menu">
            <p class="card__produkt__price">Цена: ${elem.price}.p</p>
            <div class="block__menu">
              <p>Kоличество:</p>
              <input type="number" placeholder="0" data-input-id="${elem.id}"  value="${elem.counter}" >
              <button class="buy__produkt" data-id="${elem.id}">Купить</button>
            </div>
          </div>
        </a>
      </div>
        `
        container.appendChild(div);

    } ) 



}

function renderBasket(){
    let listProduct =  document.querySelector('.basket-container');
    listProduct.innerHTML = '';
    basket.forEach( elem => {

        let div = document.createElement('div');
        div.innerHTML = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
              Model: ${elem.productName}
              <span>Цена: ${elem.price}.р</span>
              <span class="badge badge-primary badge-pill">${elem.counter}</span>
              <button class='basket-del' data-delete='${elem.id}'>Удалить</button>
            </li>
        `
        listProduct.appendChild(div);

    } ) 
    document.querySelector('.total-price').innerHTML = `Итого: ${getAllPrice()}.р`;

    document.querySelectorAll('.basket-del').forEach(btn => {

        btn.addEventListener('click', event =>{ delBasket(event.target.dataset.delete) } )

    })
}

function addToBasket(id){

    let addProduct = products.find(elem => elem.id === id);
    addProduct.counter = getCount(id);

    if(basket.some( el => el.id ===  id)){

        basket.forEach(elem => {
            if(elem.id === id){
                elem.counter = addProduct.counter
            }
        })

    } else {
        basket.push(addProduct)
    }
    

    
    console.log(basket)
    activeBasket();
    saveToLocalStorage();
    
    console.log(getAllPrice())
}

function delBasket(id){
    const index = basket.findIndex(el => el.id === id);
    console.log(index)

    if(index !== -1){
        basket.splice(index, 1 );
    }
   
    saveToLocalStorage();
    renderBasket();
    activeBasket();
}

function getCount(id){

    let value = document.querySelector(`input[data-input-id=${id}]`).value;
   
    return +value;
}

function saveToLocalStorage(){
    localStorage.setItem('BASKET', JSON.stringify(basket));
}

function initBasket(){
    basket = JSON.parse(localStorage.getItem('BASKET')) || [];
    activeBasket();
}

function activeBasket(){
    if(basket && basket.length > 0){
        let basket = document.querySelector('.basket-icon');
        basket.classList.add('active-basket');
    }
    bascetCount ();
}

function getAllPrice(){
    let allPrice = 0;
    basket.forEach(elem =>{

        allPrice = allPrice + (+elem.price * +elem.counter );


    })

    return allPrice;
}

function bascetCount (){
    
    document.querySelector('.basketCount').innerHTML = basket.length;

}

