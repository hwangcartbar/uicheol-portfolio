const tabs = document.querySelectorAll('.damage-tab');
const contents = document.querySelectorAll('.damage-contents .content');

const leftImg = document.querySelector('.damage-hero .left-img');
const rightImg = document.querySelector('.damage-hero .right-img');

// 하위 메뉴 링크와 연결할 이름
const tabNames = ['privacy', 'phishing', 'deepfake'];

const heroImages = [
    {
        left: '../images/damage_image/damage_hero_img01.webp',
        right: '../images/damage_image/damage_hero_img02.webp'
    },
    {
        left: '../images/damage_image/damage_hero_img03.webp',
        right: '../images/damage_image/damage_hero_img04.webp'
    },
    {
        left: '../images/damage_image/damage_hero_img06.webp',
        right: '../images/damage_image/damage_hero_img07.webp'
    }
];

// 탭, 콘텐츠, 이미지 변경
function changeTab(index) {
    if (!tabs[index] || !contents[index] || !heroImages[index]) {
        return;
    }

    tabs.forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
    });

    contents.forEach((content, i) => {
        content.classList.toggle('active', i === index);
    });

    if (leftImg) {
        leftImg.src = heroImages[index].left;
    }

    if (rightImg) {
        rightImg.src = heroImages[index].right;
    }
}

// 주소의 # 이름에 맞는 탭 표시
function openTabFromHash() {
    const name = window.location.hash.slice(1);
    const index = tabNames.indexOf(name);

    changeTab(index === -1 ? 0 : index);
}

// 히어로 탭 버튼 클릭
tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        changeTab(index);

        // 새로고침해도 선택한 탭 유지
        history.replaceState(null, '', `#${tabNames[index]}`);
    });
});

// 현재 페이지에서 GNB 하위 메뉴로 탭 변경
window.addEventListener('hashchange', openTabFromHash);

// 다른 페이지에서 들어오거나 새로고침할 때 적용
openTabFromHash();