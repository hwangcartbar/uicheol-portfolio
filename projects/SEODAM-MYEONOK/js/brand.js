const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuClose = document.querySelector('.mobile-menu-close');


// 햄버거 버튼 클릭 → 메뉴 열기
mobileMenuBtn.addEventListener('click', function () {
    mobileMenu.classList.add('active');

    // 메뉴가 열렸을 때 뒤쪽 페이지 스크롤 막기
    document.body.style.overflow = 'hidden';
});


// X 버튼 클릭 → 메뉴 닫기
mobileMenuClose.addEventListener('click', function () {
    mobileMenu.classList.remove('active');

    // 페이지 스크롤 다시 사용
    document.body.style.overflow = '';
});

// =========================
// 서담면옥 3가지 원칙
// =========================

const princupleArea = document.querySelector('.princuple-area');
const cards = document.querySelectorAll('.princuple-area .card');

const descTitle = document.querySelector('.princuple-desc h3');
const descText = document.querySelector('.princuple-desc p');


// 각 카드 데이터
const princupleData = [

    // 좋은 재료
    {
        bg: 'princuple-bg01',
        title: '매일 엄선하는 좋은 재료',
        desc: `
            신선하고 좋은 재료를 꼼꼼하게 골라<br>
            재료 본연의 맛과 풍미를 살립니다.
        `
    },


    // 정직한 면
    {
        bg: 'princuple-bg02',
        title: '냉면의 기본을 지키는 면',
        desc: `
            면의 식감과 맛을 중요하게 생각하며<br>
            매일 한결같은 면을 만듭니다.
        `
    },


    // 깊은 육수
    {
        bg: 'princuple-bg03',
        title: '재료의 맛을 담은 깊은 육수',
        desc: `
            엄선한 재료를 정성껏 우려내 깔끔하고<br>
            깊은 육수의 맛을 완성합니다.
        `
    }

];


// =========================
// 카드 클릭
// =========================

cards.forEach((card) => {

    card.addEventListener('click', () => {

        // 클릭한 카드 번호
        const index = Number(card.dataset.index);


        // -------------------------
        // 1. 기존 active 제거
        // -------------------------

        cards.forEach((item) => {
            item.classList.remove('active');
        });


        // -------------------------
        // 2. 클릭한 카드 active
        // -------------------------

        card.classList.add('active');


        // -------------------------
        // 3. 기존 배경 제거
        // -------------------------

        princupleArea.classList.remove(
            'princuple-bg01',
            'princuple-bg02',
            'princuple-bg03'
        );


        // -------------------------
        // 4. 새로운 배경 적용
        // -------------------------

        princupleArea.classList.add(
            princupleData[index].bg
        );


        // -------------------------
        // 5. 설명 변경
        // -------------------------

        descTitle.textContent =
            princupleData[index].title;

        descText.innerHTML =
            princupleData[index].desc;

    });

});