$("#document").ready(() => {
  showGitCard();
});

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

  $.ajax({
    url: "/card",
    type: "POST",
    data: {
      nickName,
      comment,
      link,
    },
    success: function (response) {
      if (response["result"] === "success") {
        if (response["msg"] === "exists") {
          alert("이미 등록된 깃허브 입니다.");
        } else {
          createCard(nickName, comment, link).then((result) => {
            if (!result) {
              $.ajax({
                url: "/delete",
                type: "POST",
                data: {
                  nickName,
                },
              });
            } else {
              const post = $("#post-box");
              post.hide();
            }
          });
        }
      }
    },
  });
  // createCard(nickName, comment, link);
});

const createCard = async (nickName, comment, link) => {
  let template = `
    <div class="user-git-card">
      <div style="text-align: center">
        <strong>'${nickName}' 님의 GitHub 잔디밭입니다.</strong>
      </div>
      <div class="${nickName}">false</div>
    </div>`;

  $(".grahp-gruop").append(template);
  const $userCardTag = $(`.${nickName}`);
  try {
    const response = await GitHubCalendar(`.${nickName}`, `${nickName}`, {
      responsive: true,
      tooltips: true,
      // global_stats: false,
    }).then(function () {
      if ($userCardTag.text() === "false") {
        //추가한 카드 삭제
        //다시 입력창 표시
        $userCardTag.parents("div.user-git-card").remove(); // $userCardTag.parents("div").remove();
        alert("유효하지 않는 깃허브 링크입니다.");
        return false;
      }
      $(`.${nickName} div.float-left`).text(comment);
      return true;
    });
    return response;
  } catch (err) {
    console.log(err);
    $userCardTag.parents("div.user-git-card").remove();
    alert("등록에러입니다");
    return false;
  }
};

const showGitCard = () => {
  $.ajax({
    url: "/card",
    type: "GET",
    data: {},
    success: function (response) {
      if (response["result"] === "success") {
        response["data"].map((el) => {
          createCard(el.nickName, el.comment, el.link);
        });
      }
    },
  });
};
