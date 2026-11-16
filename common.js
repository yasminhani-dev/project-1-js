
 new WOW().init();




const menuToggle = document.querySelector(".menu-toggle");
const linkNav = document.querySelector(".linknav");
const menuClose = document.querySelector(".menu-close");
const menuOverlay = document.querySelector(".menu-overlay");

const closeMenu = () => {
    linkNav.classList.remove("active");
    menuOverlay.classList.remove("active");
document.body.classList.remove("menu-open");
    linkNav.querySelectorAll("li.active").forEach((item) => {
        item.classList.remove("active");
    });
};

menuToggle.addEventListener("click", () => {
    linkNav.classList.toggle("active");
    menuOverlay.classList.toggle("active");
    document.body.classList.toggle("menu-open");
});

menuClose.addEventListener("click", closeMenu);
menuOverlay.addEventListener("click", closeMenu);

const navLinks = document.querySelectorAll(".linknav a");

navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {

        const dropdown = link.nextElementSibling;

        if (dropdown && dropdown.classList.contains("dropdown")) {
            if(link.getAttribute('href')===""||link.getAttribute('href')==="#"){
                e.preventDefault();
            }

            const parent = link.parentElement;
            parent.classList.toggle("active");
        }

    });
});



let products = [
    {
        id: 1,
        name: "Long Sleeve Tops",
        oldPrice: 80.50,
        price: 70.30,
        image: "images/imgi_10_4.jpg"
    },
    {
        id: 2,
        name: "Casual Sweater",
        oldPrice: 65.50,
        price: 50.30,
        image: "images/imgi_9_3.jpg"
    },
    {
        id: 3,
        name: "Fashion Top",
        oldPrice: 105.50,
        price: 70.30,
        image: "images/imgi_8_2.jpg"
    },
    {
        id: 4,
        name: "Summer Outfit",
        oldPrice: 85.50,
        price: 70.30,
        image: "images/imgi_7_1.jpg"
    },
    {
        id: 5,
        name: "Elegant Blouse",
        oldPrice: 90.00,
        price: 75.00,
        image:"images/imgi_11_1.jpg"
    },
    {
        id: 6,
        name: "Women Jacket",
        oldPrice: 120.00,
        price: 95.00,
        image:"images/imgi_12_2.jpg"
    },
    {
        id: 7,
        name: "Casual Shirt",
        oldPrice: 75.00,
        price: 60.00,
        image:"images/imgi_13_3.jpg" 
    },
    {
        id: 8,
        name: "Classic Pants",
        oldPrice: 100.00,
        price: 80.00,
        image: "images/imgi_14_4.jpg"
    },
    {
        id: 9,
        name: "Winter Sweater",
        oldPrice: 110.00,
        price: 90.00,
        image:"images/imgi_18_8.jpg"
    },
    {
        id: 10,
        name: "Fashion Dress",
        oldPrice: 130.00,
        price: 105.00,
        image:"images/imgi_17_7.jpg"
    },
    {
        id: 11,
        name: "Casual Sneakers",
        oldPrice: 95.00,
        price: 80.00,
        image:"images/imgi_16_6.jpg"
    },
    {
        id: 12,
        name: "Stylish Top",
        oldPrice: 85.00,
        price: 70.00,
        image: "images/imgi_15_5.jpg"
    }
];



const cartIcon = document.querySelector(".cart-icon");
const cartSidebar = document.querySelector(".cart-sidebar");
const cartOverlay = document.querySelector(".cart-overlay");
const cartClose = document.querySelector(".cart-close");

const openCart = () => {
    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");
    document.body.classList.add("cart-open");
};

const closeCart = () => {
    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");
    document.body.classList.remove("cart-open");
};

cartIcon.addEventListener("click", openCart);

cartClose.addEventListener("click", closeCart);

cartOverlay.addEventListener("click", closeCart);


// add to cart

const cartProducts=document.querySelector('.cart-sidebar .cart-products')



let cartItems =JSON.parse(localStorage.getItem('cart')) ||[]




function addToCart(index){
const product = products[index]


const findedProduct=cartItems.find((el=>el.id==product.id))

if(!findedProduct){

cartItems.unshift({...product ,quantity:1})
}else{
   ++findedProduct.quantity
}


displayProducts()

openCart()

}

function displayProducts(){
const domCart= cartItems.map((val,index)=>(
` <div class="cart">
            <img src="${val.image}" alt="">
            <div>
                <b>${val.name} :</b>
                <b>price :${Math.round(val.price *val.quantity)}</b>
            </div>
            <div>
            <button onClick='handleQuantity("inc",${val.id})'>+</button>
            <span>${val.quantity}</span>
            <button onClick='handleQuantity("dec",${val.id})'>-</button>
            </div>
 <i  onClick="deleteProduct(${val.id})" class="fa-solid fa-trash"></i>
         </div>`
)).join('')


const cartLength= +cartItems.reduce((a,b)=>(a+b.quantity),0)
document.querySelector('.cartlength').innerHTML= cartLength

const totalProducts=+cartItems.reduce((a,b)=>(a+(b.price*b.quantity)),0)
document.querySelector('.cart-total').innerHTML=" $" +totalProducts.toFixed(2)

localStorage.setItem('cart',JSON.stringify(cartItems))


if(!cartItems.length){
   cartProducts.innerHTML="there is no product"
}else{
   
cartProducts.innerHTML=domCart
}

}

displayProducts()

function handleQuantity(type,idd){
const product=cartItems.find((el=>el.id==idd))

if(type=="inc"){
product.quantity++
}else{
   if(product.quantity >1){
 product.quantity--

   }else{
      deleteProduct(idd)
   }
  
}
   displayProducts() 
}


function deleteProduct(idd){

const isconfirmed=window.confirm("delete thiss..?!")

if(isconfirmed){
const filterData=cartItems.filter((el)=>el.id !==idd)
cartItems=filterData
displayProducts()
}



}



// fixed element

let toTop=document.querySelector(".totop")


window.addEventListener("scroll",()=>{
if(window.scrollY>=775){
    toTop.style.visibility="visible"
    toTop.style.opacity=1
    toTop.style.bottom='50px'
}else{
     toTop.style.visibility="hidden"
    toTop.style.opacity=0
      toTop.style.bottom='100%'
}
})

toTop.addEventListener("click",()=>{
    window.scrollTo({top:0,behavior:"smooth"})
})


window.addEventListener("load",()=>{
    setTimeout(()=>{
 const preLoader=document.querySelector(".preloader")
    preLoader.classList.add("hide")
    },100)
   
})


