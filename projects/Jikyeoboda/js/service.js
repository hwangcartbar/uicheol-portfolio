(() => {
    const area = document.querySelector(".service-area");

    if (!area) return;

    // 캐릭터 이미지 폴더
    const imagePath = "../images/service_Image/";

    // 서비스 화면 5개
    const services = {
        rights: {
            group: "privacy",
            name: "열람·정정·삭제 요구",
            character: "rights-character.webp",
            message: [
                "“내 개인정보,",
                "확인하고 바로잡을 수 있어요.”"
            ],
            heading: "개인정보 열람 등 요구란?",
            paragraphs: [
                "내 개인정보가 어떻게 이용되는지 확인하고, 잘못된 정보의 정정이나 삭제를 요청하는 권리예요.",
                "개인정보를 보유한 기관이나 서비스의 안내에 따라 요청 방법을 확인해보세요."
            ],
            button: "권리 행사 안내보기",
            url: "https://www.privacy.go.kr/",
            processTitle: "권리 행사 절차 알아보기",
            steps: [
                "요청 내용 확인",
                "해당 기관에 요청",
                "처리 결과 확인"
            ]
        },

        identity: {
            group: "privacy",
            name: "본인확인 내역 조회",
            character: "identity-character.webp",
            message: [
                "“내가 인증한 기록,",
                "한눈에 확인해요.”"
            ],
            heading: "본인확인 내역 조회란?",
            paragraphs: [
                "온라인에서 본인확인을 진행한 이용 내역을 확인하는 서비스예요.",
                "조회할 수 있는 내역과 이용 방법은 서비스 안내에서 확인해보세요."
            ],
            button: "서비스 바로가기",
            url: "https://www.privacy.go.kr/",
            processTitle: "이용 방법 알아보기",
            steps: [
                "서비스 접속",
                "본인확인 진행",
                "이용 내역 조회"
            ]
        },

        withdrawal: {
            group: "management",
            name: "웹사이트 회원탈퇴",
            character: "withdrawal-character.webp",
            message: [
                "“쓰지 않는 계정,",
                "이제 정리해볼까요?”"
            ],
            heading: "웹사이트 회원탈퇴란?",
            paragraphs: [
                "사용하지 않는 웹사이트의 회원탈퇴 신청을 돕는 서비스예요.",
                "신청 가능한 웹사이트와 처리 방식은 서비스 안내에서 확인해보세요."
            ],
            button: "서비스 바로가기",
            url: "https://www.privacy.go.kr/",
            processTitle: "이용 방법 알아보기",
            steps: [
                "대상 사이트 확인",
                "탈퇴 신청",
                "처리 결과 확인"
            ]
        },

        eraser: {
            group: "management",
            name: "지우개 서비스",
            character: "eraser-character.webp",
            message: [
                "“지우고 싶은 개인정보,",
                "도움받는 방법을 알아봐요.”"
            ],
            heading: "지우개 서비스 알아보기",
            paragraphs: [
                "지우개 서비스의 지원 내용과 신청 방법을 확인해보세요.",
                "지원 대상과 필요한 자료는 공식 서비스 안내에서 확인해주세요."
            ],
            button: "서비스 안내보기",
            url: "https://www.privacy.go.kr/",
            processTitle: "이용 안내 확인하기",
            steps: [
                "지원 대상 확인",
                "신청 방법 확인",
                "처리 안내 확인"
            ]
        },

        leak: {
            group: "leak",
            name: "털린 내 정보 찾기",
            character: "leak-character.webp",
            message: [
                "“내 계정정보,",
                "유출 여부를 확인해요.”"
            ],
            heading: "털린 내 정보 찾기란?",
            paragraphs: [
                "계정정보의 유출 여부를 확인하고 필요한 보호 조치를 살펴보는 서비스예요.",
                "조회 결과와 관계없이 비밀번호를 점검하고 계정 보안 설정을 확인해보세요."
            ],
            button: "유출 여부 확인하기",
            url: "https://kidc.eprivacy.go.kr/",
            processTitle: "이용 방법 알아보기",
            steps: [
                "서비스 안내 확인",
                "유출 여부 조회",
                "보호 조치 확인"
            ]
        }
    };

    const title = area.querySelector("#service-title");
    const character = area.querySelector("#service-character");
    const message = area.querySelector("#service-message");
    const heading = area.querySelector("#service-heading");
    const text = area.querySelector("#service-text");
    const link = area.querySelector("#service-link");
    const processTitle = area.querySelector("#service-process-title");
    const steps = area.querySelector("#service-steps");

    function renderService() {
        const requested = window.location.hash.slice(1);

        // 잘못된 주소거나 # 값이 없으면 첫 화면 표시
        const key = Object.prototype.hasOwnProperty.call(
            services,
            requested
        )
            ? requested
            : "rights";

        const service = services[key];

        // 제목 / 이미지 변경
        title.textContent = service.name;
        character.src = imagePath + service.character;

        // 말풍선 문구 변경
        message.replaceChildren();

        service.message.forEach((line, index) => {
            if (index > 0) {
                message.appendChild(document.createElement("br"));
            }

            message.appendChild(document.createTextNode(line));
        });

        // 설명 제목 변경
        heading.textContent = service.heading;

        // 설명 문단 변경
        text.replaceChildren();

        service.paragraphs.forEach(paragraph => {
            const p = document.createElement("p");

            p.textContent = paragraph;
            text.appendChild(p);
        });

        // 외부 서비스 버튼 변경
        link.textContent = service.button;
        link.href = service.url;

        link.setAttribute(
            "aria-label",
            `${service.button} (새 창)`
        );

        // 절차 제목 변경
        processTitle.textContent = service.processTitle;

        // 절차 3개 변경
        steps.replaceChildren();

        service.steps.forEach((label, index) => {
            const li = document.createElement("li");
            li.className = "service-step";

            const number = document.createElement("span");
            number.className = "service-step-number";
            number.textContent = String(index + 1).padStart(2, "0");

            const stepText = document.createElement("span");
            stepText.className = "service-step-text";
            stepText.textContent = label;

            li.append(number, stepText);
            steps.appendChild(li);
        });

        // 상위 탭 활성화
        area.querySelectorAll("[data-group]").forEach(tab => {
            const active = tab.dataset.group === service.group;

            tab.classList.toggle("is-active", active);

            if (active) {
                tab.setAttribute("aria-current", "true");
            } else {
                tab.removeAttribute("aria-current");
            }
        });

        // 선택한 분류의 하위 탭 표시
        area.querySelectorAll("[data-sub-group]").forEach(nav => {
            nav.hidden = nav.dataset.subGroup !== service.group;
        });

        // 하위 탭 활성화
        area.querySelectorAll("[data-service]").forEach(tab => {
            const active = tab.dataset.service === key;

            tab.classList.toggle("is-active", active);

            if (active) {
                tab.setAttribute("aria-current", "page");
            } else {
                tab.removeAttribute("aria-current");
            }
        });

        // 기존 헤더 GNB 하위메뉴 선택 표시
        document.querySelectorAll(
            "header .gnb-submenu a"
        ).forEach(anchor => {
            const url = new URL(anchor.href, window.location.href);

            const active =
                url.pathname === window.location.pathname &&
                url.hash === `#${key}`;

            if (active) {
                anchor.setAttribute("aria-current", "page");
            } else {
                anchor.removeAttribute("aria-current");
            }
        });

        // 브라우저 탭 제목 변경
        document.title = `${service.name} | 지켜봐요`;
    }

    // 다른 페이지의 GNB에서 들어온 경우
    renderService();

    // 서비스 페이지 안의 탭 / GNB / 뒤로가기 / 앞으로가기
    window.addEventListener("hashchange", renderService);
})();