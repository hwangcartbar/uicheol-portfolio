/* ========================================
   STORE PRODUCT DATA
======================================== */

const storeProducts = [
    {
        id: 1,
        name: "물냉면 2인 세트",
        price: 18000,
        category: "naengmyeon",
        image: "../img/store/meal_kit01.webp"
    },
    {
        id: 2,
        name: "비빔냉면 2인 세트",
        price: 18000,
        category: "naengmyeon",
        image: "../img/store/meal_kit02.webp"
    },
    {
        id: 3,
        name: "물비빔냉면 2인 세트",
        price: 19000,
        category: "naengmyeon",
        image: "../img/store/meal_kit03.webp"
    },
    {
        id: 4,
        name: "고기만두 1팩",
        price: 12000,
        category: "mandu",
        image: "../img/store/meal_kit04.webp"
    },
    {
        id: 5,
        name: "김치만두 1팩",
        price: 12000,
        category: "mandu",
        image: "../img/store/meal_kit05.webp"
    },
    {
        id: 6,
        name: "물냉면 + 고기만두 세트",
        price: 28000,
        category: "set",
        image: "../img/store/mul_gogi.webp"
    },
    {
        id: 7,
        name: "물냉면 4인 세트",
        price: 34000,
        category: "naengmyeon",
        image: "../img/store/mul_x2.webp"
    },
    {
        id: 8,
        name: "비빔냉면 4인 세트",
        price: 34000,
        category: "naengmyeon",
        image: "../img/store/bibim_x2.webp"
    },

    /* 여기부터 상품 계속 추가하시면 됩니다. */

    {
        id: 9,
        name: "물비빔냉면 4인 세트",
        price: 36000,
        category: "naengmyeon",
        image: "../img/store/mulbi_x2.webp"
    },
    {
        id: 10,
        name: "물냉면 + 김치만두 세트",
        price: 28000,
        category: "set",
        image: "../img/store/mul_kimchi.webp"
    },
    {
        id: 11,
        name: "비빔냉면 + 고기만두 세트",
        price: 28000,
        category: "set",
        image: "../img/store/bibim_gogi.webp"
    },
    {
        id: 12,
        name: "비빔냉면 + 김치만두 세트",
        price: 28000,
        category: "set",
        image: "../img/store/bibim_kimchi.webp"
    },
    {
        id: 13,
        name: "물비빔냉면 + 고기만두 세트",
        price: 29000,
        category: "set",
        image: "../img/store/mulbi_gogi.webp"
    },
    {
        id: 14,
        name: "물비빔냉면 + 김치만두 세트",
        price: 29000,
        category: "set",
        image: "../img/store/mulbi_kimchi.webp"
    },
    {
        id: 15,
        name: "명태회무침 (200g)",
        price: 12000,
        category: "etc",
        image: "../img/store/muchim.webp"
    },
    {
        id: 16,
        name: "냉면장 (600g)",
        price: 9000,
        category: "etc",
        image: "../img/store/dadegi.webp"
    },
]



/* ========================================
   ELEMENT
======================================== */

const productList = document.querySelector("#storeProductList")
const pagination = document.querySelector("#storePagination")
const categoryBtns = document.querySelectorAll(".store-category-btn")



/* ========================================
   STATE
======================================== */

let currentCategory = "all"
let currentPage = 1

const productsPerPage = 8



/* ========================================
   PRODUCT FILTER
======================================== */

function getFilteredProducts() {

    if (currentCategory === "all") {
        return storeProducts
    }

    return storeProducts.filter(
        product => product.category === currentCategory
    )
}



/* ========================================
   PRODUCT RENDER
======================================== */

function renderProducts() {

    const filteredProducts = getFilteredProducts()

    const startIndex = (currentPage - 1) * productsPerPage
    const endIndex = startIndex + productsPerPage

    const currentProducts = filteredProducts.slice(
        startIndex,
        endIndex
    )

    productList.innerHTML = ""



    currentProducts.forEach(product => {

        const card = document.createElement("article")

        card.classList.add("store-product-card")

        card.innerHTML = `
    <a href="#" class="store-product-link">

        <div class="store-product-img">
            <img
                src="${product.image}"
                alt="${product.name}"
            >
        </div>

    </a>

    <a href="#" class="store-product-cart">
        🛒 담기
    </a>

    <div class="store-product-info">

        <h3 class="store-product-name">
            ${product.name}
        </h3>

        <p class="store-product-price">
            ${product.price.toLocaleString()}원
        </p>

    </div>
`

        productList.appendChild(card)
    })
}



/*  */

function renderPagination() {

    const filteredProducts = getFilteredProducts()

    const totalPages = Math.ceil(
        filteredProducts.length / productsPerPage
    )

    pagination.innerHTML = ""



    /* 페이지 번호 */

    for (let i = 1; i <= totalPages; i++) {

        const pageBtn = document.createElement("button")

        pageBtn.type = "button"
        pageBtn.classList.add("store-page-btn")

        pageBtn.textContent = i



        if (i === currentPage) {
            pageBtn.classList.add("is-active")
        }



        pageBtn.addEventListener("click", () => {

            currentPage = i

            renderProducts()
            renderPagination()

        })



        pagination.appendChild(pageBtn)
    }



    /* 다음 페이지 버튼 */

    if (currentPage < totalPages) {

        const nextBtn = document.createElement("button")

        nextBtn.type = "button"
        nextBtn.classList.add("store-page-next")
        nextBtn.innerHTML = "›"

        nextBtn.setAttribute(
            "aria-label",
            "다음 페이지"
        )



        nextBtn.addEventListener("click", () => {

            currentPage++

            renderProducts()
            renderPagination()

        })



        pagination.appendChild(nextBtn)
    }
}



/* ========================================
   CATEGORY
======================================== */

categoryBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        /* 기존 active 제거 */

        categoryBtns.forEach(categoryBtn => {
            categoryBtn.classList.remove("is-active")
        })



        /* 클릭한 버튼 active */

        btn.classList.add("is-active")



        /* 현재 카테고리 저장 */

        currentCategory = btn.dataset.category



        /* 카테고리 바꾸면 1페이지로 */

        currentPage = 1



        renderProducts()
        renderPagination()

    })

})



/* ========================================
   FIRST RENDER
======================================== */

renderProducts()
renderPagination()