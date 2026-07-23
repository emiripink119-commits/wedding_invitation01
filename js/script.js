/* =========================================
  スクロール時のフェードイン
========================================= */

const fadeElements =
  document.querySelectorAll(".fade-in");


const fadeObserver =
  new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "is-visible"
          );

          observer.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -30px 0px",
    }
  );


fadeElements.forEach((element) => {
  fadeObserver.observe(element);
});


/* =========================================
  残り日数を計算
========================================= */

const getRemainingDays = (eventDate) => {

  const now = new Date();

  const difference =
    eventDate.getTime() - now.getTime();


  if (difference <= 0) {
    return 0;
  }


  const oneDay =
    1000 * 60 * 60 * 24;


  return Math.floor(
    difference / oneDay
  );

};


/* =========================================
  表紙のカウントダウン
========================================= */

const heroCountdown =
  document.querySelector(
    ".hero-countdown"
  );


if (heroCountdown) {

  const eventDate =
    new Date(
      heroCountdown.dataset.eventDate
    );


  const daysElement =
    heroCountdown.querySelector(
      ".hero-countdown__number"
    );


  const updateHeroCountdown = () => {

    const days =
      getRemainingDays(eventDate);


    daysElement.textContent =
      String(days);

  };


  updateHeroCountdown();


  /*
    日数のみなので1分ごとに更新
  */
  setInterval(
    updateHeroCountdown,
    60000
  );

}