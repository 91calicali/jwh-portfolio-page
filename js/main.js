let sectionIdx = 0;

window.addEventListener('load', () => {
    const section = document.querySelectorAll('section');
    const slideNav = document.querySelector('.slide-nav');

    InOutSectionHeightSet();

    // 옵저버로 각 섹션이 보여질 때 처리.
    let observer = new IntersectionObserver((e) => {
        e.forEach((param) => {
            if(param.isIntersecting) {
                // 화면 우측에 fix된 슬라이드 바 색상 처리.
                for(let i = 0; i < section.length; i++) {
                    slideNav.children[i].children[0].classList.remove('active'); 
                    slideNav.children[i].children[1].classList.remove('active');

                    const targetName = param.target.classList[0];

                    switch (targetName) {
                        case 'intro-section':
                            sectionIdx = 0;
                            break;
                        case 'about-section':
                            sectionIdx = 1;
                            break;
                        case 'skill-section':
                            sectionIdx = 2;
                            break;
                        case 'publ-section':
                            sectionIdx = 3;
                            break;
                        case 'outro-section':
                            sectionIdx = 4;
                            break;
                        default:
                            break;
                    }
                }

                slideNav.children[sectionIdx].children[0].classList.add('active'); 
                slideNav.children[sectionIdx].children[1].classList.add('active');

                if(sectionIdx > 0) {
                    for(let i = 0; i < section.length; i++) {
                        slideNav.children[i].children[0].style.color = '#2a2a77';
                        slideNav.children[i].children[1].style.backgroundColor = '#2a2a77';
                    }
                } else {
                    for(let i = 0; i < section.length; i++) {
                        slideNav.children[i].children[0].style.color = '#fff';
                        slideNav.children[i].children[1].style.backgroundColor = '#fff';
                    }
                }
            }
        });        
    }, {
        threshold: 0.6
    });

    for(let i = 0; i < section.length; i++) {
        observer.observe(section[i]);
    }
});
    
// in, outro 섹션 높이 세팅.
function InOutSectionHeightSet() {
    document.querySelector('.intro-section').style.height = `${window.innerHeight}px`;
    document.querySelector('.outro-section').style.height = `${window.innerHeight}px`;
}

// slide-nav를 눌렀을 때 섹션 이동.
function goSection(idx) {
    const section = document.querySelectorAll('section');
    let scrollY_Value = 0;

    for(let i = 0; i < idx; i++) {
        scrollY_Value += section[i].clientHeight;
    }

    window.scrollTo({ top:scrollY_Value, behavior: 'smooth' });
}

// slide-nav에 mouseenter & leave일 때.
function slideNavMouseEnter(ele) {
    ele.children[0].classList.add('active');
    ele.children[1].classList.add('active');
}

function slideNavMouseLeave(idx, ele) {
    if(sectionIdx != idx) { // 현재 섹션의 nav에 마우스가 떠났을 때 나타나는 버그 방지.
        ele.children[0].classList.remove('active');
        ele.children[1].classList.remove('active');
    }
}

// 퍼블리싱 작업물 선택.
function itemView(idx, ele) {
    const btnSiblingEle = ele.parentElement.children;
    const descSiblingEle = document.querySelector('.item-desc').parentElement.children;

    for(let i = 0; i < btnSiblingEle.length; i++){
        btnSiblingEle[i].classList.remove('active');
        descSiblingEle[i].classList.remove('active');
    }

    ele.classList.add('active');
    descSiblingEle[idx].classList.add('active');
}

// modal로 작업물 보이기.
let urls = [
    "https://91calicali.github.io/vogue-main-page-hard-coding/",
    "https://91calicali.github.io/neker-main-page-hard-coding/",
    "publishing/coupang-play.html",
    "publishing/mega-login.html",
    "publishing/tab-slider.html",
    "publishing/video-landing.html",
];

function viewPageInModal(idx) {
    let container = document.querySelector(".container");

    let modal = `
            <div id="modal" class="web-page-modal">
                <iframe src="${urls[idx]}"></iframe>
                <div class="web-page-modal-close-btn" onClick="hideModal()">&larr;<div>
            </div>
            `;

            container.insertAdjacentHTML("beforeend", modal);
}

// modal 제거.
function hideModal() {
    let modal = document.getElementById("modal");

    modal.remove();
}
