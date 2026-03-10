document.addEventListener("DOMContentLoaded", async () => {

  async function loadSection(section) {

    const response = await fetch(`content/sections/${section}.md`);
    if (!response.ok) return;

    const text = await response.text();
    const lines = text.split("\n");

    const data = {};
    let currentKey = null;

    lines.forEach(line => {

      if (line.includes(":") && !line.startsWith(" ")) {

        const parts = line.split(":");
        currentKey = parts[0].trim();
        data[currentKey] = parts.slice(1).join(":").trim();

      } else if (currentKey) {

        data[currentKey] += "<br>" + line.trim();

      }

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