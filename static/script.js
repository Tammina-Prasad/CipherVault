// ---------- Typewriter ----------
const phrases = [
  "Encrypt. Decrypt. Stay secure.",
  "Your secrets, sealed in the vault.",
  "AES-128 encryption made simple."
];
const tw = document.getElementById("typewriter");
let pi = 0, ci = 0, deleting = false;
function type() {
  const p = phrases[pi];
  tw.textContent = p.slice(0, ci);
  if (!deleting && ci < p.length) { ci++; setTimeout(type, 60); }
  else if (deleting && ci > 0) { ci--; setTimeout(type, 30); }
  else {
    deleting = !deleting;
    if (!deleting) pi = (pi + 1) % phrases.length;
    setTimeout(type, 1200);
  }
}
type();

// ---------- Particles ----------
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);
for (let i = 0; i < 60; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.5,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4
  });
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 246, 255, 0.6)";
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();

// ---------- Toast ----------
const toast = document.getElementById("toast");
function showToast(msg, isError = false) {
  toast.textContent = msg;
  toast.classList.toggle("error", isError);
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

// ---------- API helper ----------
async function callApi(endpoint, text) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
  return res.json();
}

// ---------- Encrypt ----------
document.getElementById("encryptBtn").addEventListener("click", async () => {
  const input = document.getElementById("plainText").value.trim();
  const status = document.getElementById("encryptStatus");
  const out = document.getElementById("encryptedOut");
  if (!input) { showToast("Enter some text first", true); return; }
  status.textContent = "Encrypting..."; status.className = "status";
  const data = await callApi("/encrypt", input);
  if (data.success) {
    out.value = data.result;
    status.textContent = "✓ Encrypted"; status.className = "status ok";
    showToast("Text encrypted successfully");
  } else {
    status.textContent = "✗ " + data.error; status.className = "status err";
    showToast(data.error, true);
  }
});

// ---------- Decrypt ----------
document.getElementById("decryptBtn").addEventListener("click", async () => {
  const input = document.getElementById("cipherText").value.trim();
  const status = document.getElementById("decryptStatus");
  const out = document.getElementById("decryptedOut");
  if (!input) { showToast("Enter cipher text first", true); return; }
  status.textContent = "Decrypting..."; status.className = "status";
  const data = await callApi("/decrypt", input);
  if (data.success) {
    out.value = data.result;
    status.textContent = "✓ Decrypted"; status.className = "status ok";
    showToast("Text decrypted successfully");
  } else {
    out.value = "";
    status.textContent = "✗ " + data.error; status.className = "status err";
    showToast(data.error, true);
  }
});

// ---------- Copy buttons ----------
document.querySelectorAll(".btn-copy").forEach(btn => {
  btn.addEventListener("click", async () => {
    const target = document.getElementById(btn.dataset.target);
    if (!target.value) { showToast("Nothing to copy", true); return; }
    try {
      await navigator.clipboard.writeText(target.value);
      showToast("Copied to clipboard");
    } catch {
      showToast("Copy failed", true);
    }
  });
});
