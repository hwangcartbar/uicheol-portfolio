$(document).ready(function() {
    // 공통 메뉴: 바깥 영역, ESC 키, 링크 선택 시 닫기
    const menuButton = $('.btn-menu a');
    function closeMenu() {
        $('.menu').stop(true, true).slideUp(180);
        menuButton.attr('aria-expanded', 'false');
    }
    menuButton.on('click', function(e) {
        e.preventDefault();
        const open = $(this).attr('aria-expanded') !== 'true';
        $(this).attr('aria-expanded', String(open));
        $('.menu').stop(true, true)[open ? 'slideDown' : 'slideUp'](180);
    });
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.menu-container').length) closeMenu();
    });
    $('.menu a').on('click', closeMenu);
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') closeMenu();
    });
    function headerState() {
        $('.gnb').toggleClass('scrolled', window.scrollY > 40);
    }
    $(window).on('scroll', headerState);
    headerState();

    // 상세 보기: 네이티브 dialog로 키보드 이동과 초점 복귀 지원
    $('body').append('<dialog class="detail-modal" aria-labelledby="detail-title"><button class="detail-close" aria-label="상세 닫기">닫기 ×</button><div class="detail-content"></div></dialog><button class="btn-top" aria-label="맨 위로 이동">↑ TOP</button>');
    const dialog = document.querySelector('.detail-modal');
    function showDetail(title, text, image) {
        const content = $('.detail-content').empty();
        if (image) $('<img>', { src: image, alt: title }).appendTo(content);
        $('<h2>', { id: 'detail-title', text: title }).appendTo(content);
        $('<p>', { text: text }).appendTo(content);
        dialog.showModal();
        $('body').addClass('modal-open');
    }
    $('.detail-close').on('click', function() { dialog.close(); });
    $(dialog).on('close', function() { $('body').removeClass('modal-open'); });
    $(dialog).on('click', function(e) { if (e.target === dialog) {
        const rect = dialog.getBoundingClientRect();
        if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) dialog.close();
    }});
    $('.btn-top').on('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    $('[data-info="about"]').on('click', function(e) {
        e.preventDefault();
        showDetail('ABOUT MODULER', '패션, 커머셜, 뷰티, 런웨이를 아우르는 모델 에이전시 콘셉트 사이트입니다. 제공된 이미지를 활용한 포트폴리오 시안이며, 모델 이름과 프로젝트 분류는 시안용입니다. 실제 소속·협업 관계를 의미하지 않습니다.');
    });
    $('.seocial a, .menu-icon a').each(function(i) {
        $(this).attr('href', '#social').attr('aria-label', ['Instagram 안내', 'X 안내', 'YouTube 안내'][i % 3]);
    }).on('click', function(e) {
        e.preventDefault();
        showDetail('SOCIAL', '공식 SNS 주소가 등록되지 않았습니다. 실제 계정이 준비되면 이 링크를 연결해 주세요.');
    });
    $('.featured .box-area > a, .news .box a, .updates .card-box > a, .swiper-slide a, .fashion-profile .box a').on('click', function(e) {
        e.preventDefault();
        const card = $(this).closest('.card-box, .swiper-slide, .profile-box .box');
        const title = card.find('h3, p').first().text().trim() || $(this).find('h3').text() || 'MODULER EDITORIAL';
        showDetail(title, 'MODULER 포트폴리오 이미지입니다. 제공된 사진을 활용한 콘셉트 작업으로, 실제 모델의 이름이나 브랜드와의 협업 정보를 나타내지 않습니다.', $(this).find('img').attr('src'));
    }).attr('href', '#detail');
    $('img').each(function() {
        if (!this.alt) this.alt = 'MODULER 패션 포트폴리오';
        if (!$(this).closest('.main').length) this.loading = 'lazy';
    });

    // 기존 슬라이드 클래스 유지. 외부 라이브러리 없이 이동/드래그 지원
    const track = document.querySelector('.swiper-wrapper');
    if (track) {
        const slides = Array.from(track.children);
        function updateSlider() {
            const width = slides[0].getBoundingClientRect().width + 30;
            const page = Math.round(track.scrollLeft / width) + 1;
            $('.swiper-pagination').text(page + ' / ' + slides.length);
            $('.swiper-button-prev').prop('disabled', track.scrollLeft < 2);
            $('.swiper-button-next').prop('disabled', track.scrollLeft + track.clientWidth >= track.scrollWidth - 2);
        }
        $('.swiper-button-next, .swiper-button-prev').on('click', function() {
            track.scrollBy({ left: ($(this).hasClass('swiper-button-next') ? 1 : -1) * (slides[0].getBoundingClientRect().width + 30), behavior: 'smooth' });
        });
        track.addEventListener('scroll', updateSlider);
        window.addEventListener('resize', updateSlider);
        updateSlider();
    }

    // Fashion 페이지 분류 및 검색 (시안용 분류)
    const categories = ['Fashion', 'Commercial', 'Beauty', 'Runway'];
    const cards = $('.fashion-profile .profile-box > .box');
    if (cards.length) {
        let active = new URLSearchParams(window.location.search).get('category') || 'Fashion';
        if (!categories.includes(active)) active = 'Fashion';
        cards.each(function(i) { $(this).attr('data-category', categories[i % 4]); });
        categories.forEach(function(category) {
            $('<button>', { type: 'button', text: category, 'data-category': category }).appendTo('.filter-buttons');
        });
        function filterModels() {
            const query = $('#model-search').val().trim().toLowerCase();
            let count = 0;
            cards.each(function() {
                const visible = (active === 'Fashion' || $(this).attr('data-category') === active) && $(this).find('h3').text().toLowerCase().includes(query);
                this.hidden = !visible;
                if (visible) count++;
            });
            $('.filter-buttons button').each(function() { $(this).attr('aria-pressed', String($(this).text() === active)); });
            $('.main .text h1').text(active.toUpperCase());
            $('.main .text h2').text(active === 'Fashion' ? 'Editorial, Runway, & Lookbook' : active + ' — Selected Portfolio');
            $('.filter-count').text(count ? count + ' models · 시안용 분류' : '검색 결과가 없습니다. 다른 이름을 입력해 주세요.');
            $('.nav a').removeAttr('aria-current').filter(function() { return $(this).text() === active; }).attr('aria-current', 'page');
        }
        $('.filter-buttons button').on('click', function() {
            active = $(this).text();
            const url = new URL(window.location.href);
            url.searchParams.set('category', active);
            history.replaceState(null, '', url);
            filterModels();
        });
        $('#model-search').on('input', filterModels);
        filterModels();
    }
});
