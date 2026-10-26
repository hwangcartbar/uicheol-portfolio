(() => {
    const survey = document.querySelector(".diagnosis-survey");
    if (!survey) return;

    // 첨부된 문항 이미지 기준: 확인되는 문항은 9개
    const questions = [
        "같은 비밀번호를\n여러 사이트에서 사용하고 있나요?",
        "비밀번호에 생일이나 전화번호처럼\n추측하기 쉬운 정보를 넣고 있나요?",
        "2단계 인증 없이\n아이디와 비밀번호만으로 로그인하고 있나요?",
        "다른 사람에게\n내 계정의 비밀번호를 알려준 적이 있나요?",
        "스마트폰이나 컴퓨터를\n화면 잠금 없이 사용하고 있나요?",
        "기기나 앱의 업데이트 알림을\n계속 미루고 있나요?",
        "앱이 요청하는 접근 권한을\n확인하지 않고 모두 허용하고 있나요?",
        "출처를 모르는 문자나 이메일의\n링크를 바로 누르고 있나요?",
        "SNS에 사진을 올릴 때\n개인정보가 보이는지 확인하지 않나요?",
        "사용하지 않는 서비스의 계정을\n탈퇴하지 않고 그대로 두고 있나요?"
    ];

    const answers = Array(questions.length).fill(null);
    let currentIndex = 0;
    let completed = false;

    const question = survey.querySelector(".survey-question");
    const count = survey.querySelector(".survey-count");
    const track = survey.querySelector(".survey-progress-track");
    const fill = survey.querySelector(".survey-progress-fill");
    const inputs = survey.querySelectorAll('input[name="survey-answer"]');
    const prevButton = survey.querySelector(".survey-prev");
    const nextButton = survey.querySelector(".survey-next");
    const completeMessage = survey.querySelector(".survey-complete");

    function render(moveFocus = false) {
        question.textContent = questions[currentIndex];
        count.textContent = `질문 ${currentIndex + 1} / ${questions.length}`;

        fill.style.width =
            `${((currentIndex + 1) / questions.length) * 100}%`;

        track.setAttribute("aria-valuemax", questions.length);
        track.setAttribute("aria-valuenow", currentIndex + 1);

        inputs.forEach((input) => {
            input.checked = input.value === answers[currentIndex];
        });

        // 첫 문항에서만 이전 버튼 비활성화
        prevButton.disabled = currentIndex === 0;

        // 현재 질문에 답해야 다음 버튼 활성화
        nextButton.disabled = answers[currentIndex] === null || completed;
        nextButton.setAttribute(
            "aria-label",
            currentIndex === questions.length - 1
                ? "설문 완료"
                : "다음 질문"
        );

        completeMessage.hidden = !completed;

        if (moveFocus) question.focus();
    }

    inputs.forEach((input) => {
        input.addEventListener("change", () => {
            answers[currentIndex] = input.value;
            completed = false;
            render();
        });
    });

    prevButton.addEventListener("click", () => {
        if (currentIndex === 0) return;

        currentIndex--;
        completed = false;
        render(true);
    });

    nextButton.addEventListener("click", () => {
        if (answers[currentIndex] === null || completed) return;

        if (currentIndex < questions.length - 1) {
            currentIndex++;
            render(true);
            return;
        }

        completed = true;
        render();

        // 결과 화면 연결 시 이 이벤트에서 답변을 받을 수 있음
        survey.dispatchEvent(
            new CustomEvent("survey:complete", {
                bubbles: true,
                detail: {
                    answers: [...answers]
                }
            })
        );
    });

    render();
})();