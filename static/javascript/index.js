document.addEventListener("DOMContentLoaded", (evt) => {
  const all_header_links = document.querySelectorAll(".nav-link");
  all_header_links.forEach(function (link) {
    link.addEventListener("click", function (evt) {
      const loader = this.querySelector('.spinner-border')
      loader.style.display = 'block';
    });
  });
});
