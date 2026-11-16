let countDown_banner=document.querySelector('.countdown-banner')
let count=document.querySelectorAll('.countdown-banner p')

const scrollProcess=new IntersectionObserver((enter)=>{
if(enter[0].isIntersecting){
   count.forEach( el => {
   let counter =0
   let number =el.dataset.num

let increment =number/400

let interval =setInterval(()=>{

counter +=increment
if(counter>=number){
clearInterval(interval)
counter = number
}

el.innerHTML=Math.floor(counter)

},10)

   });
    scrollProcess.unobserve(countDown_banner)
}
})

scrollProcess.observe(countDown_banner)




// add to cart

const productsCards=document.querySelector('.products .cards')



let card=''



document.addEventListener('DOMContentLoaded',()=>{
    products.forEach((val,index)=>{
card +=`<div class="card wow animate_animated animate bounceInUp animate__delay-2s	2s">
<div class="card-img">
    <img src="${val.image}" alt="">

</div>

<div class="card-data">
    <h3>${val.name}</h3>
    <p><del>$${val.oldPrice}</del>$ ${val.price}</p>
     <button onClick='addToCart(${index})'> add to cart</button>

</div>

</div>`

   })
   setTimeout(()=>{
        productsCards.innerHTML =card
   },2000)
})

   



