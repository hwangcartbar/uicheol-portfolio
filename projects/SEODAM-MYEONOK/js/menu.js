document.addEventListener('DOMContentLoaded', () => {

    /* ========================================
       1. 스크롤 섹션 등장 애니메이션
    ======================================== */

    const sections = document.querySelectorAll('.menu-section');

    const sectionObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }

        });

    }, {
        threshold: 0.15
    });


    sections.forEach((section) => {
        sectionObserver.observe(section);
    });



    /* ========================================
       2. 메뉴별 재료 데이터

       img는 나중에 재료 이미지 준비되면
       경로만 넣으면 됨
    ======================================== */

    const menuIngredients = {

        '물냉면': [
            { name: '메밀면', img: '../img/modal/noodle.webp' },
            { name: '육수', img: '../img/modal/dongcimi.webp' },
            { name: '소고기', img: '../img/modal/meat.webp' },
            { name: '오이', img: '../img/modal/cucumber.webp' },
            { name: '무절임', img: '../img/modal/Pickled_radish.webp' },
            { name: '배', img: '../img/modal/pear.webp' },
            { name: '계란', img: '../img/modal/egg.webp' }
        ],

        '비빔냉면': [
            { name: '메밀면', img: '../img/modal/noodle.webp' },
            { name: '비빔장', img: '../img/modal/jang.webp' },
            { name: '소고기', img: '../img/modal/meat.webp' },
            { name: '오이', img: '../img/modal/cucumber.webp' },
            { name: '무절임', img: '../img/modal/Pickled_radish.webp' },
            { name: '배', img: '../img/modal/pear.webp' },
            { name: '계란', img: '../img/modal/egg.webp' }
        ],

        '물비빔냉면': [
            { name: '메밀면', img: '../img/modal/noodle.webp' },
            { name: '육수', img: '../img/modal/dongcimi.webp' },
            { name: '비빔장', img: '../img/modal/jang.webp' },
            { name: '소고기', img: '../img/modal/meat.webp' },
            { name: '오이', img: '../img/modal/cucumber.webp' },
            { name: '무절임', img: '../img/modal/Pickled_radish.webp' },
            { name: '계란', img: '../img/modal/egg.webp' }
        ],

        '회냉면': [
            { name: '메밀면', img: '../img/modal/noodle.webp' },
            { name: '비빔장', img: '../img/modal/jang.webp' },
            { name: '명태회', img: '../img/modal/fishsalad.webp' },
            { name: '오이', img: '../img/modal/cucumber.webp' },
            { name: '무절임', img: '../img/modal/Pickled_radish.webp' },
            { name: '배', img: '../img/modal/pear.webp' },
            { name: '계란', img: '../img/modal/egg.webp' }
        ],

        '떡만둣국': [
            { name: '떡', img: '../img/modal/ricecake.webp' },
            { name: '만두', img: '../img/modal/mandu.webp' },
            { name: '소고기', img: '../img/modal/meat.webp' },
            { name: '대파', img: '../img/modal/greenonion.webp' },
            { name: '계란', img: '../img/modal/egg.webp' },
            { name: '김', img: '../img/modal/seaweed.webp' }
        ],

        '얼큰해장만둣국': [
            { name: '만두', img: '../img/modal/mandu.webp' },
            { name: '소고기', img: '../img/modal/meat.webp' },
            { name: '대파', img: '../img/modal/greenonion.webp' },
            { name: '계란', img: '../img/modal/egg.webp' },
            { name: '김', img: '../img/modal/seaweed.webp' }
        ],

        '갈비탕': [
            { name: '소갈비', img: '../img/modal/rib.webp' },
            { name: '당면', img: '../img/modal/glassnoodle.webp' },
            { name: '대파', img: '../img/modal/greenonion.webp' },
            { name: '계란', img: '../img/modal/egg.webp' }
        ],

        '수육전골': [
            { name: '돼지고기', img: '../img/modal/pork.webp' },
            { name: '배추', img: '../img/modal/cabbage.webp' },
            { name: '버섯', img: '../img/modal/mushroom.webp' },
            { name: '대파', img: '../img/modal/greenonion.webp' },
            { name: '부추', img: '../img/modal/chives.webp' }
        ],

        '만두전골': [
            { name: '만두', img: '../img/modal/mandu.webp' },
            { name: '배추', img: '../img/modal/cabbage.webp' },
            { name: '버섯', img: '../img/modal/mushroom.webp' },
            { name: '대파', img: '../img/modal/greenonion.webp' }
        ],

        '김치만두': [
            { name: '김치', img: '../img/modal/kimchi.webp' },
            { name: '돼지고기', img: '../img/modal/pork.webp' },
            { name: '두부', img: '../img/modal/tofu.webp' },
            { name: '부추', img: '../img/modal/chives.webp' },
            { name: '만두속', img: '../img/modal/mandu_filing.webp' }
        ],

        '고기만두': [
            { name: '돼지고기', img: '../img/modal/pork.webp' },
            { name: '두부', img: '../img/modal/tofu.webp' },
            { name: '만두속', img: '../img/modal/mandu_filing.webp' }
        ],

        '수육': [
            { name: '돼지고기', img: '../img/modal/pork.webp' },
            { name: '김치', img: '../img/modal/kimchi.webp' },
            { name: '마늘', img: '../img/modal/garlic.webp' },
        ]
    };



    /* ========================================
       3. 모달 HTML을 JS에서 생성
    ======================================== */

    const modal = document.createElement('div');

    modal.className = 'menu-modal';

    modal.innerHTML = `
        <div class="modal-content">

            <button
                type="button"
                class="modal-close"
                aria-label="모달 닫기"
            >
                ×
            </button>


            <div class="modal-left">

                <img
                    class="modal-main-img"
                    src=""
                    alt=""
                >

            </div>


            <div class="modal-right">

                <p class="modal-category">[ MENU ]</p>

                <h2 class="modal-title"></h2>

                <p class="modal-desc"></p>


                <div class="modal-line"></div>


                <h3 class="ingredient-title">
                    재료
                </h3>


                <div class="ingredients">
                    <!-- JS로 재료 들어감 -->
                </div>

            </div>

        </div>
    `;


    document.body.appendChild(modal);



    /* ========================================
       4. 필요한 요소 선택
    ======================================== */

    const menuCards = document.querySelectorAll('.menu-card');

    const modalMainImg =
        modal.querySelector('.modal-main-img');

    const modalTitle =
        modal.querySelector('.modal-title');

    const modalDesc =
        modal.querySelector('.modal-desc');

    const ingredientsContainer =
        modal.querySelector('.ingredients');

    const closeButton =
        modal.querySelector('.modal-close');



    /* ========================================
       5. 재료 출력 함수
    ======================================== */

    function renderIngredients(menuName) {

        ingredientsContainer.innerHTML = '';

        const ingredients =
            menuIngredients[menuName] || [];


        ingredients.forEach((ingredient) => {

            const ingredientItem =
                document.createElement('div');

            ingredientItem.className =
                'ingredient';


            /* 이미지가 아직 없는 상태 */
            if (ingredient.img === '') {

                ingredientItem.innerHTML = `
                    <div class="ingredient-img"></div>
                    <p>${ingredient.name}</p>
                `;

            }

            /* 나중에 이미지 넣었을 때 */
            else {

                ingredientItem.innerHTML = `
                    <div class="ingredient-img">
                        <img
                            src="${ingredient.img}"
                            alt="${ingredient.name}"
                        >
                    </div>

                    <p>${ingredient.name}</p>
                `;

            }


            ingredientsContainer.appendChild(
                ingredientItem
            );

        });

    }



    /* ========================================
       6. 모달 열기
    ======================================== */

    function openModal(card) {

        const cardImage =
            card.querySelector('.menu-img img');

        const cardTitle =
            card.querySelector('.menu-text h3');

        const cardDesc =
            card.querySelector('.menu-text p');


        const menuName =
            cardTitle.textContent.trim();


        /* 카드 내용 → 모달로 복사 */

        modalMainImg.src =
            cardImage.src;

        modalMainImg.alt =
            cardImage.alt;

        modalTitle.textContent =
            menuName;

        modalDesc.textContent =
            cardDesc.textContent.trim();


        /* 재료 출력 */
        renderIngredients(menuName);


        /* 모달 표시 */
        modal.classList.add('show');


        /* 뒤쪽 페이지 스크롤 막기 */
        document.body.style.overflow =
            'hidden';
    }



    /* ========================================
       7. 모달 닫기
    ======================================== */

    function closeModal() {

        modal.classList.remove('show');

        document.body.style.overflow = '';

    }



    /* ========================================
       8. 메뉴 클릭
    ======================================== */

    menuCards.forEach((card) => {

        card.addEventListener('click', () => {

            openModal(card);

        });

    });



    /* ========================================
       9. X 버튼 클릭
    ======================================== */

    closeButton.addEventListener('click', () => {

        closeModal();

    });



    /* ========================================
       10. 검은 배경 클릭 시 닫기
    ======================================== */

    modal.addEventListener('click', (event) => {

        if (event.target === modal) {
            closeModal();
        }

    });



    /* ========================================
       11. ESC 키로 닫기
    ======================================== */

    document.addEventListener('keydown', (event) => {

        if (
            event.key === 'Escape' &&
            modal.classList.contains('show')
        ) {

            closeModal();

        }

    });

});