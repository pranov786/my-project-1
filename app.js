document.querySelector('a[href="#contact"]').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#contact').scrollIntoView({
      behavior: 'smooth'
    });
  });
  
  document.addEventListener('DOMContentLoaded', () => {
  const commentList = document.getElementById('comment-list');
  const commentForm = document.getElementById('comment-form');
  
  // Fetch and display comments
  const fetchComments = async () => {
    const response = await fetch('/comments');
    const comments = await response.json();
    commentList.innerHTML = '';
    comments.forEach(comment => {
      const div = document.createElement('div');
      div.classList.add('comment');
      div.innerHTML = `<strong>${comment.username}</strong>: ${comment.content}`;
      commentList.appendChild(div);
    });
  };
  
  // Post a new comment
  commentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const content = document.getElementById('content').value;
    
    const response = await fetch('/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, content })
    });
    
    if (response.ok) {
      fetchComments();
      commentForm.reset();
    }
  });
  
  // Load comments when the page loads
  fetchComments();
});
