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