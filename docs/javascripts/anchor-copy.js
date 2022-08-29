document$.subscribe(() => {
  const links = Array.from(document.querySelectorAll(".headerlink"))
  for (const link of links) {
    link.setAttribute("data-clipboard-text", link.href)
  }
})