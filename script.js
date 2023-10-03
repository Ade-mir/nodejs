document.addEventListener("DOMContentLoaded", () => {
  fetchPosts();

  const form = document.getElementById("new-post-form");
  form.addEventListener("submit", createPost);
});

async function fetchPosts() {
  const res = await fetch("http://localhost:3000/posts");
  const data = await res.json();
  const postsList = document.getElementById("posts-list");

  postsList.innerHTML = data
    .map(
      (post) => `
        <div>
            <h2>${post.title}</h2>
            <p>${post.content}</p>
        </div>
    `
    )
    .join("");
}

async function createPost(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  const newPost = {
    title,
    content,
  };

  await fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });

  fetchPosts();
}
