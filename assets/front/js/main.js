(function () {

  window.onload = function () {
    init();
  }

  function init() {
    eventBinding();
  }

  function eventBinding() {
    gnb();
    comSlide();
    comPopupLayer();
    comTab();
    goTop();
    scrollInput();
  }

  // 공통 gnb
  const gnb = () => {
    (function (e) {
      const $header = document.querySelector(".header");
      const $headerWrap = document.querySelector(".headerWrap");
      const $$gnbLink = document.querySelectorAll(".gnbLink");
      const $headerBg = document.querySelector(".headerBg");
      const $$subPanel = document.querySelectorAll(".subPanel");
      const $main = document.querySelector(".main");
      const activeName = "on";
      const $gnb = document.querySelector(".gnb");
      const links = $gnb.querySelectorAll('a');
      const subPenelHeight = [];
      let maxHeight = '';


      // Gnb 최대 높이 설정 함수
      const gnbMaxHeight = (e) => {
        // panel height 높이 설정
        $$subPanel.forEach((el, idx) => {
          let panelHeight = el.clientHeight;
          subPenelHeight.push(panelHeight);
          maxHeight = Math.max(maxHeight, subPenelHeight[idx]);
          el.style.height = maxHeight.toString() + `px`;
          return maxHeight;
        });
        $headerBg.style.height = `${maxHeight + 20}px`;
      }

      // Gnb 오픈 함수
      const gnbOpen = (e) => {
        const target = e.target;

        $$gnbLink.forEach((el) => {
          if (target == el) {
            $headerWrap.classList.add(activeName);
            $headerBg.classList.add(activeName);
            gnbMaxHeight(e);
          }
        });
      }

      // Gnb 닫는 함수
      const gnbClose = () => {
        $headerBg.classList.remove(activeName);
        $headerWrap.classList.remove(activeName);
      }

      // 탭키 접근성
      const tabKey = (e) => {
        if (event.key === 'Tab') {
          $headerWrap.classList.add(activeName);
          $headerBg.classList.add(activeName);
          gnbMaxHeight(e);

          // 탭 키가 눌렸을 때, 현재 포커스가 있는 링크의 인덱스
          const focusedIndex = Array.from(links).indexOf(event.target);

          // 탭키가 처음 마지막 키 눌렀을때
          if (focusedIndex === -1 || focusedIndex === links.length - 1) {
            $headerBg.classList.remove(activeName);
            $headerWrap.classList.remove(activeName);
            return;
          }
        }
      }

      // Gnb 활성화
      const subPanelActive = (e) => {
        $$subPanel.forEach((el) => {
          el.addEventListener("mouseover", (e) => {
            el.previousElementSibling.classList.add("on");
          });
          el.addEventListener("mouseout", (e) => {
            el.previousElementSibling.classList.remove("on");
          });
        });
      }

      // gnbItem li 활성화
      const changeImgAtive = (e) => {
        const target = e.target;
        const $changeImg = document.querySelector(".changImg");
        const $$gnbItem = document.querySelectorAll(".gnbItem");
        const $$subPanelItem = document.querySelectorAll(".subPanel a");

        // 배경 이미지 활성화 함수
        const changImgActive = (el) => {
          let changeImg = el.closest(".gnbItem").getAttribute("data-img");
          $changeImg.style.backgroundImage = `url(${changeImg})`;
        }

        $$gnbItem.forEach((el) => {
          if (target == el || target == el.querySelector(".subPanel")) {
            changImgActive(el);
          }
        });
        $$subPanelItem.forEach((el) => {
          if (target == el) {
            changImgActive(el);
          }
        });
      }

      $header.addEventListener("mouseover", gnbOpen);
      $main.addEventListener("mouseover", gnbClose);
      $gnb.addEventListener('keydown', tabKey);
      $gnb.addEventListener('keydown', subPanelActive(e));
      $gnb.addEventListener('mouseover', changeImgAtive);

      // 모바일 메뉴
      let menu = "close";
      document.querySelector('.menuToggle').addEventListener('click', () => {
        if (menu === "close") {
          document.querySelector('.mobileNav').style.transform = 'translate(0%, 0)'
          menu = "open";
        } else {
          document.querySelector('.mobileNav').style.transform = 'translate(100%, 0)'
          menu = "close";
        }
        document.querySelector('.menuToggle').classList.toggle('open');
        document.querySelector("html").classList.toggle('open');

      })

      const $$mobileNavItemAnchor = document.querySelectorAll(".mobileNavItem>a");
      const $$mobileNavItem = document.querySelectorAll(".mobileNavItem");

      // mobileNavItem a 클릭
      $$mobileNavItemAnchor.forEach((el) => {
        el.addEventListener("click", () => {

          // --> mobileNavItem.on이 아닐시
          if (!el.closest(".mobileNavItem").classList.contains("on")) {
            // 1. mobileNavItem 모두가 on클래스 remove
            $$mobileNavItem.forEach((element) => {
              element.classList.remove("on");
            });
            // 2. mobileNavItem a 클릭하면 부모요소 mobileNavItem.on 되어서 ul.dapth2가 보임
            el.closest(".mobileNavItem").classList.add("on");
          }

          // --> mobileNavItem.on 일시
          else {
            // 1. mobileNavItem a 클릭하면  mobileNavItem on remove
            el.closest(".mobileNavItem").classList.remove("on");
          }
        });
      });
      // 모바일 메뉴 eee

    })();
  }

  // 공통 접근성 슬라이드
  const comSlide = () => {
    const $$swiperAll = document.querySelectorAll(".swiper-slide");
    const $currentNum = document.querySelector(".currentNum");
    const $allNum = document.querySelector(".allNum");
    const comSlidePaging = document.querySelector(".comSlidePaging");

    const changeTabIndex = () => {
      $$swiperAll.forEach((el) => {
        const $swiperAnchor = el.querySelector("a");
        if (el.classList.contains("swiper-slide-active")) {
          $swiperAnchor.setAttribute("tabindex", "0");
        } else {
          $swiperAnchor.setAttribute("tabindex", "-1");
        }
      });
      const $$swiperSlideDuplicateAll = document.querySelectorAll(".swiper-slide-duplicate a");
      $$swiperSlideDuplicateAll.forEach((el) => {
        el.setAttribute("tabindex", "-1");
      });
    }

    // visualSlide
    if ($$swiperAll.length > 1) {
      comSlidePaging.style.display = "flex";
      const visualSlide = new Swiper('#visualSlide', {
        // autoplay: {
        //   delay: 3000,
        // },
        loop: true,
        // effect: 'fade',
        navigation: {
          nextEl: '.swiper-button-next', // 다음 버튼 클래스명
          prevEl: '.swiper-button-prev', // 이번 버튼 클래스명
        },
        a11y: {
          prevSlideMessage: '이전 슬라이드',
          nextSlideMessage: '다음 슬라이드',
          slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
        },
        on: {
          init: function () {
            thisSlide = this;
            autoPlayBtn = document.querySelector('.autoplayControl > button');
            autoPlayBtn.addEventListener('click', () => {
              autoPlayState = autoPlayBtn.getAttribute('aria-pressed');
              if (autoPlayState === 'false') {
                autoPlayBtn.setAttribute('aria-pressed', 'true');
                thisSlide.autoplay.stop();
              } else if (autoPlayState === 'true') {
                autoPlayBtn.setAttribute('aria-pressed', 'false');
                thisSlide.autoplay.start();
              };
            });
            changeTabIndex();
          },
          activeIndexChange: function () {
            this.realIndex += 1;
            $currentNum.textContent = `0${this.realIndex}`;
            $allNum.textContent = `0${$$swiperAll.length}`;
          },
          slideChangeTransitionStart: () => {
            changeTabIndex();
          },
        },
      });
    }

  }

  // 공통 접근성 팝업
  const comPopupLayer = () => {
    const comPopup = () => {

      const $$comPopupWrap = document.querySelectorAll(".comPopupWrap");
      const $$modalBtn = document.querySelectorAll(".modalBtn");
      const $$closeBtn = document.querySelectorAll(".popClose");
      const $$comPopContainer = document.querySelectorAll(".comPopupContainer");

      // open popup
      $$modalBtn.forEach((el) => {
        el.addEventListener("click", () => {
          openPop(el);
        });
      });

      // close popup
      $$comPopupWrap.forEach((popWrap) => {
        popWrap.addEventListener("click", (e) => {
          $$comPopContainer.forEach((element) => {
            $$closeBtn.forEach((el) => {
              const curentTarget = e.target;
              if (curentTarget == el || curentTarget == element) {
                closePop(el);
              }
            });
          });
        });
      });
    }

    const openPop = (el) => {
      const target = el.getAttribute("data-id");
      const targetId = `#${target}`;
      document.querySelector(targetId).classList.add("on");
    }

    const closePop = (el) => {
      el.closest(".comPopupWrap").classList.remove("on");
    }

    comPopup();
  }

  // 접근성 탭 메뉴
  const comTab = () => {
    const tabGroups = document.querySelectorAll('[data-role="tab"]');
    if (tabGroups) {
      let currentTarget, targetTabWrap, targetTabListWrap, targetPanelWrap;
      //이벤트 타켓 변수 설정
      const init = (e) => {
        currentTarget = e.target.tagName;

        currentTarget === 'BUTTON' || currentTarget === 'A' ? currentTarget = e.target : currentTarget = e.target.closest('button') || e.target.closest('a');

        targetTabWrap = currentTarget.closest('[data-role="tab"]');
        targetTabListWrap = targetTabWrap.querySelector('[role="tablist"]');
        targetPanelWrap = targetTabWrap.querySelector('.tabContents');
      };

      //클릭 이벤트
      const tabClickEvt = (e) => {
        init(e);
        if (currentTarget.ariaSelected === 'false') {
          // 미선택된 탭 속성 false 상태로 만들기
          tabRemoveEvt(targetTabListWrap, targetPanelWrap);
          // 선택된 탭 속성 true 상태로 만들기
          tabAddEvt(currentTarget, targetTabWrap);
        }
      }

      // 키보드 접근 이벤트
      const tabKeyUpEvt = (e) => {
        init(e);
        const targetBtnWrap = currentTarget.parentElement;
        if (e.key == 'ArrowRight') {
          //키보드 -> 화살표 눌렀을 때
          if (targetBtnWrap.nextElementSibling) {
            targetBtnWrap.nextElementSibling.children[0].focus();
            tabRemoveEvt(targetTabListWrap, targetPanelWrap);
            tabAddEvt(targetBtnWrap.nextElementSibling.children[0], targetTabWrap);
          }
        } else if (e.key == 'ArrowLeft') {
          //키보드 <- 화살표를 눌렀을 때
          if (targetBtnWrap.previousElementSibling) {
            targetBtnWrap.previousElementSibling.children[0].focus();
            tabRemoveEvt(targetTabListWrap, targetTabWrap);
            tabAddEvt(targetBtnWrap.previousElementSibling.children[0], targetTabWrap);
          }
        } else {
          endKeyEvt(targetTabListWrap, targetTabWrap, targetPanelWrap);
        }
      }

      // tab active event
      const tabAddEvt = (currentTarget, targetPanelWrap) => {
        // 선택 된 탭 속성 true 로 변경
        currentTarget.setAttribute('aria-selected', 'true');
        currentTarget.removeAttribute('tabindex');
        currentTarget.parentElement.classList.add('active');
        // 연결 된 tabpanel 숨김 해제
        targetPanelWrap
          .querySelector(`[aria-labelledby="${currentTarget.id}"]`)
          .removeAttribute('hidden');
        targetPanelWrap
          .querySelector(`[aria-labelledby="${currentTarget.id}"]`)
          .setAttribute('tabindex', '0');
      };

      // tab active remove event
      const tabRemoveEvt = (tabListWrap, tabPanelWrap) => {
        targetTabListWrap.querySelectorAll('li').forEach((tabBtnWrap) => {
          // 기존에 선택 된 탭 속성 false 로 변경
          if (tabBtnWrap.classList.contains('active')) {
            tabBtnWrap.classList.remove('active');
            tabBtnWrap.querySelector('[role="tab"]').setAttribute('aria-selected', 'false');
            tabBtnWrap.querySelector('[role="tab"]').setAttribute('tabindex', '-1');
          }
        });
        // 기존에 선택 된 tabpanel 숨김
        for (let tabPanel of targetPanelWrap.children) {
          tabPanel.setAttribute('hidden', 'false');
          tabPanel.setAttribute('tabindex', '-1');
        }
      };

      // 클릭/키보드 탭 이벤트 제거/할당
      tabGroups.forEach((tabWrapper) => {
        const tabBtns = tabWrapper.querySelectorAll('[role="tab"]');
        tabBtns.forEach((tabBtn) => {
          tabBtn.removeEventListener('click', tabClickEvt);
          tabBtn.addEventListener('click', tabClickEvt);
          tabBtn.removeEventListener('keyup', tabKeyUpEvt);
          tabBtn.addEventListener('keyup', tabKeyUpEvt);
        });
      });

    }
  }

  // 상단이동
  const goTop = () => {
    const goTop = document.querySelector(".goTop");
    const goTopAnchor = goTop.querySelector("button");

    window.addEventListener("scroll", () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 100) {
        goTop.classList.add("on");
      } else {
        goTop.classList.remove("on");
      }
    });

    goTop.addEventListener("click", () => {
      window.scrollTo({
        behavior: "smooth",
        top: 0,
      });
    });

  }

  // input스크롤
  const scrollInput = () => {

    if (document.querySelector('.scrollable-element')) {
      const $$scrollableElement = document.querySelectorAll('.scrollable-element');

      $$scrollableElement.forEach((el) => {
        el.addEventListener('scroll', () => {
          const agreeRow = el.closest(".agreeRow");
          const hint = agreeRow.querySelector(".hint");
          const checkbox = agreeRow.querySelector('.my-checkbox');
          if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
            checkbox.disabled = false;
            hint.style.display = "none";
          } else {
            checkbox.disabled = true;
            hint.style.display = "block";
          }
        });
      });
    }

  }

})();