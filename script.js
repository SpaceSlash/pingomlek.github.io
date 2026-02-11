// ===== SLIDER =====

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

setInterval(function ()
{
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
}, 3000);



// ===== PRODUCT LOADING =====

let allProducts = [];
let visibleCount = 0;
const loadAmount = 20;
const container = document.getElementById("productContainer");

fetch("products.json")
.then(function (res)
{
    return res.json();
})
.then(function (data)
{
    allProducts = data.products;
    loadMoreProducts();
});


function loadMoreProducts()
{
    const nextProducts = allProducts.slice(visibleCount, visibleCount + loadAmount);

    nextProducts.forEach(function (product)
    {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="price">${product.price} TL</div>
            <button onclick="window.open('${product.link}', '_blank')">
                Satın Al
            </button>
        `;

        container.appendChild(card);
    });

    visibleCount += loadAmount;
}


// ===== INFINITE SCROLL =====

window.addEventListener("scroll", function ()
{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100)
    {
        loadMoreProducts();
    }
});
