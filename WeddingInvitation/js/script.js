/* =========================================
  スクロール時のフェードイン
========================================= */

const fadeElements = document.querySelectorAll(".fade-in");

const fadeObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
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
  日付差を計算する共通関数
========================================= */

const getCountdownValues = (eventDate) => {
  const now = new Date();

  const difference =
    eventDate.getTime() - now.getTime();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const oneSecond = 1000;
  const oneMinute = oneSecond * 60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;

  return {
    days: Math.floor(difference / oneDay),

    hours: Math.floor(
      (difference % oneDay) / oneHour
    ),

    minutes: Math.floor(
      (difference % oneHour) / oneMinute
    ),

    seconds: Math.floor(
      (difference % oneMinute) / oneSecond
    ),
  };
};


/* =========================================
  表紙のカウントダウン
========================================= */

const heroCountdown =
  document.querySelector(".hero-countdown");


if (heroCountdown) {
  const heroEventDate =
    new Date(heroCountdown.dataset.eventDate);

  const heroDays =
    heroCountdown.querySelector(
      ".hero-countdown__number"
    );

  const updateHeroCountdown = () => {
    const values =
      getCountdownValues(heroEventDate);

    heroDays.textContent =
      String(values.days);
  };

  updateHeroCountdown();

  setInterval(
    updateHeroCountdown,
    1000
  );
}


/* =========================================
  メインのカウントダウン
========================================= */

const countdown =
  document.querySelector(".countdown");


if (countdown) {
  const eventDate =
    new Date(countdown.dataset.eventDate);

  const daysElement =
    countdown.querySelector(
      ".countdown__days"
    );

  const hoursElement =
    countdown.querySelector(
      ".countdown__hours"
    );

  const minutesElement =
    countdown.querySelector(
      ".countdown__minutes"
    );

  const secondsElement =
    countdown.querySelector(
      ".countdown__seconds"
    );


  const updateCountdown = () => {
    const values =
      getCountdownValues(eventDate);

    daysElement.textContent =
      String(values.days);

    hoursElement.textContent =
      String(values.hours).padStart(2, "0");

    minutesElement.textContent =
      String(values.minutes).padStart(2, "0");

    secondsElement.textContent =
      String(values.seconds).padStart(2, "0");
  };


  updateCountdown();

  setInterval(
    updateCountdown,
    1000
  );
}