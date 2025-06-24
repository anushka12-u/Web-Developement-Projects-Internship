document.getElementById("submit").addEventListener("click", async function (e) {
    e.preventDefault(); // Prevent form from reloading the page

    const data = {};
    document.querySelectorAll("input").forEach(input => {
        if (input.name) {
            data[input.name] = input.value;
        }
    });

    // Build resume HTML
    const resumeHTML = `
      <h2 style="text-align:center">${data.name || "Your Name"}</h2><hr>
      <div class=info>
      <p><strong>Email:</strong> ${data.email || ""}</p>
      <p><strong>Phone:</strong> ${data.contact || ""}</p>
      <p><strong>LinkedIn:</strong> ${data.linkedin || ""}</p>
      <p><strong>GitHub:</strong> ${data.github || ""}</p>
      </div><hr>
      <div class="info1">
      <p><strong>Skills:</strong><hr> <ul>
      ${(data.skills || "")
      .split(/[\s,]+/)
      .filter(item => item.trim())
      .map(item => `<li>${item.trim()}</li>`)
      .join("")}</ul></p>
      <p><strong>Languages:</strong> <hr><ul>
       ${(data.languages || "")
       .split(/[\s,]+/)
      .filter(item => item.trim())
      .map(item => `<li>${item.trim()}</li>`)
      .join("")}</ul></p>
      <p><strong>Certifications:</strong><hr> <ul>
    ${(data.certifications || "")
      .split(/[,]+/)
      .filter(item => item.trim())
      .map(item => `<li>${item.trim()}</li>`)
      .join("")}
  </ul></p>
      <p><strong>Hobbies:</strong> <hr> <ul>${(data.hobbies || "").split(/[,]+/)
      .filter(item => item.trim())
      .map(item => `<li>${item.trim()}</li>`)
      .join("")}</ul></p>
      <p><strong>Projects:</strong> <hr> ${(data.projects || "").split(/[,]+/)
      .filter(item => item.trim())
      .map(item => `<li>${item.trim()}</li>`)
      .join("")}</ul></p>
      <p><strong>Academics:</strong> <hr> <ul>${(data.academics || "").split(/[,]+/)
      .filter(item => item.trim())
      .map(item => `<li>${item.trim()}</li>`)
      .join("")}</ul></p>
      <p><strong>Achievements:</strong> <hr><ul> ${(data.achievements || "").split(/[,]+/)
      .filter(item => item.trim())
      .map(item => `<li>${item.trim()}</li>`)
      .join("")}</ul></p>
      <p><strong>Personal Statement:</strong><hr> ${data.statement || ""}</p>
      </div>
    `;


    const resumeOutput = document.getElementById("resume-output");
    resumeOutput.innerHTML = resumeHTML;
    resumeOutput.style.display = "block";
await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

const canvas = await html2canvas(resumeOutput, { scale: 2, useCORS: true });
const imgData = canvas.toDataURL("image/png");

const { jsPDF } = window.jspdf;
const pdf = new jsPDF("p", "mm", "a4");
const pdfWidth = pdf.internal.pageSize.getWidth();
const pageHeight = pdf.internal.pageSize.getHeight();
const imgHeight = (canvas.height * pdfWidth) / canvas.width;

let heightLeft = imgHeight;
let position = 0;

while (heightLeft > 0) {
  pdf.addImage(imgData, "PNG", 0, position ? -position : 0, pdfWidth, imgHeight);
  heightLeft -= pageHeight;
  if (heightLeft > 0) {
    pdf.addPage();
    position += pageHeight;
  }
}

pdf.save(`${data.name || "Resume"}.pdf`);

});
