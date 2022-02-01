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

$("#git-load-btn").click(() => {
  let link = $("#post-url").val();
  const comment = $("#post-comment").val();
  let nickName = "";
  if (link.includes("https://github.com/")) {
    nickName = link.split("https://github.com/")[1];
  } else {
    nickName = link;
    link = "https://github.com/" + link;
  }
  let template = `
    <div id="user-git-card">
      <div style="text-align: center">
        <strong>'${nickName}' 님의 GitHub 잔디밭입니다.</strong>
      </div>
      <div class="${nickName}">false</div>
      <p class="comment">${comment}</p>
    </div>`;

  $(".grahp-gruop").append(template);

  GitHubCalendar(`.${nickName}`, `${nickName}`, {
    responsive: true,
    tooltips: true,
    global_stats: false,
  }).then(function (e) {
    const $userCardTag = $(`.${nickName}`);
    if ($userCardTag.text() === "false") {
      //추가한 카드 삭제
      //다시 입력창 표시
      $userCardTag.parents("div#user-git-card").remove(); // $userCardTag.parents("div").remove();
      alert("유효하지 않는 깃허브 링크입니다.");
    }
  });
});
