/* ========================================
   창업안내 탭
======================================== */

const tabList = document.querySelector('.franchise-tab-list');
const franchisePanels = document.querySelector('.franchise-panels');
const franchiseProcess = document.querySelector('.franchise-process');


// 창업절차 원래 위치 기억
const processParent = franchiseProcess.parentElement;
const processNextSibling = franchiseProcess.nextElementSibling;


// 모바일에서 생성할 창업절차 패널 / 탭
let processPanel = null;
let processTab = null;


/* ========================================
   탭 전환
======================================== */

function setActiveTab(tab, panel) {

    document
        .querySelectorAll('.franchise-tab-list button')
        .forEach((button) => {
            button.classList.remove('active');
        });

    document
        .querySelectorAll('.franchise-panel')
        .forEach((panel) => {
            panel.classList.remove('active');
        });

    tab.classList.add('active');
    panel.classList.add('active');
}


/* ========================================
   PC 탭 이벤트
======================================== */

function desktopTabs() {

    const tabs =
        document.querySelectorAll('.franchise-tab-list button');

    const panels =
        document.querySelectorAll('.franchise-panel');


    tabs.forEach((tab, index) => {

        tab.onclick = () => {

            // PC에서는 창업절차 패널이 없음
            if (window.innerWidth > 430) {

                setActiveTab(
                    tab,
                    panels[index]
                );

            }

        };

    });

}


/* ========================================
   모바일 창업절차 생성
======================================== */

function mobileFranchise() {

    if (window.innerWidth > 430) return;

    // 이미 만들어져 있으면 다시 만들지 않음
    if (processPanel) return;


    /* --------------------------------
       창업절차 탭 생성
    -------------------------------- */

    processTab = document.createElement('button');

    processTab.type = 'button';
    processTab.textContent = '창업절차';
    processTab.classList.add('active');

    tabList.prepend(processTab);


    /* --------------------------------
       창업절차 패널 생성
    -------------------------------- */

    processPanel = document.createElement('div');

    processPanel.classList.add(
        'franchise-panel',
        'franchise-process-panel',
        'active'
    );


    // 기존 창업절차 영역을 패널 안으로 이동
    processPanel.appendChild(franchiseProcess);


    // 패널 맨 앞에 추가
    franchisePanels.prepend(processPanel);


    /* --------------------------------
       모바일 탭 이벤트
    -------------------------------- */

    processTab.onclick = () => {

        setActiveTab(
            processTab,
            processPanel
        );

    };


    /* --------------------------------
       기존 4개 탭 이벤트
    -------------------------------- */

    const tabs =
        document.querySelectorAll(
            '.franchise-tab-list button:not(:first-child)'
        );

    const panels =
        document.querySelectorAll('.franchise-panel');


    tabs.forEach((tab, index) => {

        tab.onclick = () => {

            // index 0 = 창업비용
            // index 1 = 매장조건
            // index 2 = 본사지원
            // index 3 = 가맹문의

            setActiveTab(
                tab,
                panels[index + 1]
            );

        };

    });


    // 창업절차 활성화
    setActiveTab(
        processTab,
        processPanel
    );

}


/* ========================================
   모바일 → PC 복귀
======================================== */

function desktopFranchise() {

    if (window.innerWidth <= 430) return;

    if (!processPanel) return;


    /* --------------------------------
       창업절차 원래 위치로 이동
    -------------------------------- */

    processParent.insertBefore(
        franchiseProcess,
        processNextSibling
    );


    /* --------------------------------
       모바일용 패널 삭제
    -------------------------------- */

    processPanel.remove();

    processPanel = null;


    /* --------------------------------
       모바일용 탭 삭제
    -------------------------------- */

    if (processTab) {

        processTab.remove();
        processTab = null;

    }


    /* --------------------------------
       PC 탭 이벤트 다시 연결
    -------------------------------- */

    desktopTabs();


    /* --------------------------------
       PC 첫 번째 탭 활성화
    -------------------------------- */

    const tabs =
        document.querySelectorAll('.franchise-tab-list button');

    const panels =
        document.querySelectorAll('.franchise-panel');


    tabs.forEach((tab) => {
        tab.classList.remove('active');
    });

    panels.forEach((panel) => {
        panel.classList.remove('active');
    });


    tabs[0].classList.add('active');
    panels[0].classList.add('active');

}


/* ========================================
   초기 실행
======================================== */

// PC 탭 이벤트 연결
desktopTabs();

// 모바일이면 창업절차 생성
mobileFranchise();


/* ========================================
   화면 크기 변경
======================================== */

window.addEventListener('resize', () => {

    if (window.innerWidth <= 430) {

        mobileFranchise();

    } else {

        desktopFranchise();

    }

});


/* ========================================
   모바일 메뉴
======================================== */

const mobileMenuBtn =
    document.querySelector('.mobile-menu-btn');

const mobileMenu =
    document.querySelector('.mobile-menu');

const mobileMenuClose =
    document.querySelector('.mobile-menu-close');


// 햄버거 버튼 → 메뉴 열기
mobileMenuBtn.addEventListener('click', () => {

    mobileMenu.classList.add('active');

    document.body.style.overflow = 'hidden';

});


// X 버튼 → 메뉴 닫기
mobileMenuClose.addEventListener('click', () => {

    mobileMenu.classList.remove('active');

    document.body.style.overflow = '';

});