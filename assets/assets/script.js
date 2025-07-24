// 페이지 전환 및 진행률 업데이트
function showPage(n) {
    document.querySelectorAll('.container').forEach((c, i) => {
      c.classList.toggle('hidden', i !== n - 1);
    });
  
    // 모든 progress-bar 업데이트
    const bars = document.querySelectorAll(".progress-bar");
    bars.forEach(bar => {
      bar.style.width = (n / 3 * 100) + "%";
    });
  
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  
  // 카카오 주소 API
  function execDaumPostcode() {
    new daum.Postcode({
      oncomplete: function(data) {
        document.getElementById('postcode').value = data.zonecode;
        document.getElementById('roadAddress').value = data.roadAddress;
        setTimeout(() => document.getElementById('detailAddress').focus(), 100);
      }
    }).open();
  }
  
  // 입력 오류 시 흔들림 효과
  document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", (e) => {
      const invalid = form.querySelector(":invalid");
      if (invalid) {
        e.preventDefault();
        const container = form.closest(".container");
        container.classList.remove("shake");
        void container.offsetWidth; // Reflow for animation reset
        container.classList.add("shake");
      }
    });
  });
  
  // 후기 항목 동적 생성
  const reviewData = [
    { title: "근무환경/시설" },
    { title: "근무강도/스트레스" },
    { title: "급여/복지" },
    { title: "안정성/전망" },
    { title: "사람들" },
    { title: "취업준비", isDifficulty: true },
    { title: "면접준비", isDifficulty: true },
    { title: "이 곳에서 일하게 될 사람들에게 한마디" }
  ];
  
  const container = document.getElementById("reviewItems");
  
  reviewData.forEach((item, idx) => {
    const section = document.createElement("div");
    let content = `<label>${idx + 1}. ${item.title}</label>`;
  
    if (item.isDifficulty) {
      content += `
        <label>난이도 평가</label>
        <select required>
          <option value="">선택</option>
          <option value="1">1 (쉬움)</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4 (어려움)</option>
        </select>
      `;
    } else if (item.title.includes("한마디")) {
      // 주관식 항목
    } else {
      content += `
        <div class="rating-stars">
          <input type="radio" id="${item.title}-star5" name="${item.title}" value="5" required>
          <label for="${item.title}-star5">★</label>
          <input type="radio" id="${item.title}-star4" name="${item.title}" value="4">
          <label for="${item.title}-star4">★</label>
          <input type="radio" id="${item.title}-star3" name="${item.title}" value="3">
          <label for="${item.title}-star3">★</label>
          <input type="radio" id="${item.title}-star2" name="${item.title}" value="2">
          <label for="${item.title}-star2">★</label>
          <input type="radio" id="${item.title}-star1" name="${item.title}" value="1">
          <label for="${item.title}-star1">★</label>
        </div>
      `;
    }
  
    content += `
      <label>상세 리뷰 *</label>
      <textarea rows="4" minlength="50" required placeholder="최소 50자 이상 입력"></textarea>
    `;
  
    section.innerHTML = content;
    container.appendChild(section);
  });
  