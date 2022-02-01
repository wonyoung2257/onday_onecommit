$("#document").ready(() => {
  // $(".grahp-gruop").hide();
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
          location.reload();
        }
      }
    },
  });
  // createCard(nickName, comment, link);
});

const createCard = (nickName, comment, link) => {
  try {
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
    }).then(function () {
      const $userCardTag = $(`.${nickName}`);
      if ($userCardTag.text() === "false") {
        //추가한 카드 삭제
        //다시 입력창 표시
        $userCardTag.parents("div#user-git-card").remove(); // $userCardTag.parents("div").remove();
        alert("유효하지 않는 깃허브 링크입니다.");
      }
      console.log("inner");
    });
  } catch (err) {
    console.log(err);
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
