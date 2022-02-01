GitHubCalendar(".calendar1", "wonyoung2257", {
  responsive: true,
  tooltips: true,
  global_stats: false,
}).then(function () {
  $(".float-left").hide();
});

GitHubCalendar(".calendar2", "developer-1px", {
  responsive: true,
  tooltips: true,
  global_stats: false,
}).then(function () {});

$("#post-btn").click((e) => {
  const post = $("#post-box");
  if (post.css("display") === "none") {
    post.show();
  } else {
    post.hide();
  }
});
const test = "https://github.com/developer-1px";
console.log(test.split("https://github.com/"));
$("#git-load-btn").click(() => {
  const link = $("#post-url").val();
  const comment = $("#post-comment").val();
  let nickName = "";
  if (link.includes("https://github.com/")) {
    nickName = link.split("https://github.com/")[1];
  } else {
    nickName = link;
    link = "https://github.com/" + link;
  }

  // GitHubCalendar(".calendar2", "developer-1px", {
  //   responsive: true,
  //   tooltips: true,
  //   global_stats: false,
  // }).then(function () {});
});
