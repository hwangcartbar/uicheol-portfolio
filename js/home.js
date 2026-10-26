// 프로젝트 분류 버튼과 목록
const filterButtons = document.querySelectorAll('.filters button');
const projects = document.querySelectorAll('.project');

// 선택한 분류에 맞는 프로젝트 표시
function changeFilter(filterName) {
    projects.forEach((project) => {
        const projectKind = project.dataset.kind;

        if (filterName === 'all' || projectKind === filterName) {
            project.hidden = false;
        } else {
            project.hidden = true;
        }
    });
}

// 분류 버튼 클릭
filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // 기존 버튼 선택 상태 초기화
        filterButtons.forEach((filterButton) => {
            filterButton.classList.remove('active');
            filterButton.setAttribute('aria-pressed', 'false');
        });

        // 클릭한 버튼 활성화
        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');

        // 선택한 분류 표시
        const filterName = button.dataset.filter;
        changeFilter(filterName);
    });
});
