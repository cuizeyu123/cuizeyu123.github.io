const posts = [
  { title: "你好，博客！", file: "hello.md" },
  { title: "第二篇文章", file: "another.md" }
];

const postList = document.getElementById("post-list");
const postView = document.getElementById("post-view");

function showPostList() {
  postList.innerHTML = "";
  postList.style.display = "block";
  postView.style.display = "none";
  posts.forEach(post => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${post.file}`;
    a.textContent = post.title;
    li.appendChild(a);
    postList.appendChild(li);
  });
}

function loadPost(file) {
  fetch(`posts/${file}`)
    .then(res => res.text())
    .then(md => {
      postList.style.display = "none";
      postView.innerHTML = marked.parse(md);
      postView.style.display = "block";
    })
    .catch(() => {
      postView.innerHTML = "<p>文章未找到。</p>";
    });
}

// 路由逻辑
window.addEventListener("hashchange", () => {
  const file = location.hash.slice(1);
  if (file) {
    loadPost(file);
  } else {
    showPostList();
  }
});

window.addEventListener("load", () => {
  if (location.hash) {
    loadPost(location.hash.slice(1));
  } else {
    showPostList();
  }
});
