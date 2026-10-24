const message = document.getElementById("message");
const Button = document.getElementById("loadbtn");
const Button2 = document.getElementById("loadbtn2");
const profile = document.getElementById("profile");
const grade = document.getElementById("grade");
const schedules = document.getElementById("schedules");

function showMessage() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve("Checking Account");
    }, 200);
  });
}

Button.addEventListener("click", function () {
  message.innerHTML = "Loading....";
  message.style.color = "Red";

  showMessage().then(function (result) {
    message.innerHTML = result;
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve("Loding Profile");
      }, 3000);
    })
      .then(function (result) {
        message.innerHTML = result;

        return new Promise(function (resolve) {
          setTimeout(function (result) {
            resolve("Welcome:)");
          }, 3000);
        });
      })
      .then(function (result) {
        message.innerHTML = result;
      });
  });
});

Button2.addEventListener("click", function () {
  message.innerHTML = "Loading Dashboard.....";
  profile.innerHTML = "Profile:Waiting.....";
  grade.innerHTML = "Grade: Waiting.....";
  schedules.innerHTML = "Schedules:Waiting.....";
  message.style.color = "Red";

  const profilePromise = new Promise(function (resolve) {
    setTimeout(function () {
      profile.innerHTML = "Profile loading";

      resolve();
    }, 5000);
  });
  const gradePromise = new Promise(function (resolve) {
    setTimeout(function () {
      grade.innerHTML = "Grade loading";

      resolve();
    }, 4000);
  });
  const schedulesPromise = new Promise(function (resolve) {
    setTimeout(function () {
      schedules.innerHTML = "Schedules loading";

      resolve();
    }, 3000);
  });

  Promise.all([profilePromise, gradePromise, schedulesPromise]).then(
    function () {
      message.innerHTML = "Dashboard ready";
    },
  );
}); /* ---------- Back to top button ---------- */
const toTop = document.querySelector(".to-top");
const toggleToTop = () => toTop.classList.toggle("show", window.scrollY > 400);
window.addEventListener("scroll", toggleToTop, { passive: true });
toggleToTop();
