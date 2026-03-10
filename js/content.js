document.addEventListener("DOMContentLoaded", async () => {

  async function loadSection(section) {

    const response = await fetch(`content/sections/${section}.md`);
    if (!response.ok) return;

    const text = await response.text();
    const lines = text.split("\n");

    const data = {};

    lines.forEach(line => {

      const parts = line.split(":");
      if (parts.length < 2) return;

      const key = parts[0].trim();
      const value = parts.slice(1).join(":").trim();

      data[key] = value;

    });

    // TEXT CONTENT
    Object.keys(data).forEach(key => {

      const element = document.querySelector(`[data-content="${section}.${key}"]`);
      if (element) element.innerHTML = data[key];

    });

    // IMAGE CONTENT
    Object.keys(data).forEach(key => {

      const img = document.querySelector(`[data-img="${section}.${key}"]`);
      if (img) img.src = "Images/" + data[key];

    });

  }

  const sections = [
    "arrival",
    "wifi",
    "heating"
  ];

  sections.forEach(loadSection);

});