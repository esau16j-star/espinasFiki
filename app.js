/* JavaScript sin dependencias. Funciona con file:// (doble clic en index.html). */
(() => {
  "use strict";
  const $ = (selector) => document.querySelector(selector);
  const SVG_NS = "http://www.w3.org/2000/svg";
  const STORAGE_KEY = "a-tu-ritmo-dedicatoria-v1";
  const config = window.DEDICATORIA;
  let step = 0;
  let toastTimer;

  const chapters = [
    { label: "GESTO 01 · ESTAR", kicker: "", title: "Fiki y el inicio.", description: "A veces levantamos espinas para cuidar lo que sentimos. Acercarse también puede ser hacerlo despacito.", button: "Presiona para continuar", hint: "Tú eliges cuándo dar el siguiente paso.", scene: "UN LUGAR PARA EMPEZAR", caption: "incluso los días grises merecen compañía", alt: "Una joven se abraza las rodillas dentro de una esfera de espinas. Un chico espera cerca con un pingüino." },
    { label: "GESTO 02 · ACOMPAÑAR", kicker: "Sin invadir tu espacio.", title: "No hay prisa.\nEstare aca.", description: "Quiero sacarte sonrisas, Y traje a alguien que sabe escuchar.", button: "Dejarle a mocca loca puchos", hint: "Presiona para continuar", scene: "UN PASITO MÁS CERCA", caption: "hay silencios que también son abrazos", alt: "El chico se acerca un poco, respetando la esfera de espinas. Una luz tenue empieza a iluminar la escena." },
    { label: "GESTO 03 · CUIDAR", kicker: ".", title: "Un amigo pequeño.\nUn abrazo gigante.", description: "Dice que puede quedarse a tu lado todo el tiempo que quieras. No hace muchas preguntas, pero da muy buenos abrazos.", button: "Presiona para continuar", hint: "", scene: "YA HAY ALGO BONITO AQUÍ", caption: "un pequeño gesto puede abrir una ventana", alt: "El pingüino está sentado junto a la joven. Aparece un corazón y las espinas se vuelven más suaves y transparentes." },
    { label: "GESTO 04 · FLORECER", kicker: "Un poquito de luz también cuenta.", title: "A tu ritmo,\nalgo florece.", description: "No hace falta que todo cambie hoy. En esta pequeña historia, las espinas dejan espacio a las flores. Y todavía queda algo para ti…", button: "Leer mi carta", hint: "Hay palabras que también pueden acompañar.", scene: "LAS COSAS BONITAS CRECEN DESPACIO", caption: "no tienes que florecer de golpe", alt: "Las espinas se transforman en un arco de flores rosadas, el pingüino se balancea y pequeñas luces iluminan a los dos personajes." }
  ];

  function svgElement(tag, attributes = {}, parent) {
    const element = document.createElementNS(SVG_NS, tag);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    if (parent) parent.append(element);
    return element;
  }

  // Semilla fija: la ilustración tiene la misma composición al abrirla otra vez.
  let seed = 42;
  function random() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }

  function pointOnEllipse(cx, cy, rx, ry, rotation, angle) {
    const x = rx * Math.cos(angle), y = ry * Math.sin(angle);
    return { x: cx + x * Math.cos(rotation) - y * Math.sin(rotation), y: cy + x * Math.sin(rotation) + y * Math.cos(rotation) };
  }

  function drawVine(rx, ry, rotation, parent, count) {
    const ring = svgElement("g", { class: "vine-ring" }, parent);
    const radians = rotation * Math.PI / 180;
    svgElement("ellipse", { cx: 340, cy: 297, rx, ry, transform: `rotate(${rotation} 340 297)`, class: "vine" }, ring);
    for (let i = 0; i < count; i++) {
      const angle = i / count * Math.PI * 2;
      const a = pointOnEllipse(340, 297, rx, ry, radians, angle - .035);
      const b = pointOnEllipse(340, 297, rx, ry, radians, angle + .035);
      const outer = i % 3 === 0 ? -1 : 1;
      const tip = pointOnEllipse(340, 297, rx + (12 + random() * 7) * outer, ry + (12 + random() * 7) * outer, radians, angle + .016);
      svgElement("path", { d: `M${a.x},${a.y} L${tip.x},${tip.y} L${b.x},${b.y} Z`, class: "thorn" }, ring);
    }
  }

  function drawScene() {
    for (let i = 0; i < 43; i++) {
      const star = svgElement("circle", { cx: 58 + random() * 760, cy: 25 + random() * 450, r: .65 + random() * 1.25, fill: "#c2b3d3", class: "star" }, $("#stars"));
      star.style.animationDelay = `${-random() * 6}s`;
    }
    drawVine(221, 217, -24, $("#vines-back"), 38);
    drawVine(149, 224, 38, $("#vines-back"), 33);
    drawVine(89, 223, -24, $("#vines-back"), 30);
    // Las ramas delanteras rodean a los personajes sin ocultar sus rostros.
    drawVine(219, 120, -30, $("#vines-front"), 34);
    const flowerVines = $("#flower-vines");
    svgElement("path", { d: "M177 472C85 353 131 173 250 100C344 40 494 79 541 210", class: "flower-branch" }, flowerVines);
    svgElement("path", { d: "M173 477C113 305 142 182 243 111M479 461C553 382 574 286 539 207", class: "flower-branch" }, flowerVines);
    const flowers = [[173,465,.68],[142,418,.7],[134,368,.9],[128,315,.7],[137,260,.95],[151,212,.67],[176,166,.95],[210,130,.7],[247,106,1.05],[295,85,.65],[347,83,.92],[397,97,.72],[448,120,.9],[494,155,.75],[526,204,.85],[544,262,.63],[546,316,.81],[532,371,.65],[506,415,.9],[476,463,.7]];
    flowers.forEach(([x,y,scale], index) => {
      const branch = svgElement("g", { transform: `translate(${x} ${y}) rotate(${index * 37}) scale(${scale})`, class: "petal-flower", style: `--delay:${index % 7 * .13}s` }, flowerVines);
      svgElement("path", { d: "M2 4Q23 4 26 19Q10 19 2 4", fill: index % 2 ? "#9dac96" : "#839c90" }, branch);
      const inner = svgElement("g", { class: "flower-inner" }, branch);
      svgElement("use", { href: "#flower-symbol", color: ["#dba9c3", "#ead1cf", "#bba5cc"][index % 3] }, inner);
    });
    [[160,514,.9],[195,520,.7],[453,519,.65],[539,524,1],[570,521,.6],[764,535,.72]].forEach(([x,y,s],i) => {
      const plant = svgElement("g", { transform: `translate(${x} ${y}) scale(${s})`, class:"garden-sprig", style:`--delay:${i * .2}s` }, $("#garden"));
      svgElement("path", { d: "M0 0Q-9-19 0-42M-2-15Q-22-31-22-17Q-18-10-2-15M-2-22Q17-41 18-26Q14-19-2-22", stroke: "#8e9e92", "stroke-width":1.5, fill:"#879789" }, plant);
      svgElement("use", { href:"#flower-symbol", transform:"translate(0 -43) scale(.58)", color:i % 2 ? "#dec6d5" : "#d8abc5" }, plant);
    });
    for (let i = 0; i < 18; i++) {
      const fly = svgElement("g", { class: "firefly", transform:`translate(${156+random()*520} ${98+random()*370})` }, $("#fireflies"));
      const core = svgElement("g", { class:"firefly-core", style:`--delay:${-random()*8}s` }, fly);
      svgElement("circle", { r:5, fill:"#f9d399", filter:"url(#soft-glow)", opacity:.6 }, core);
      svgElement("circle", { r:1.4, fill:"#ffe9be" }, core);
    }
  }

  function renderStep() {
    const chapter = chapters[step];
    document.body.dataset.step = step;
    $("#chapter-label").textContent = chapter.label;
    $("#story-kicker").textContent = chapter.kicker;
    $("#story-title").replaceChildren();
    chapter.title.split("\n").forEach((line,index) => {
      if (index) $("#story-title").append(document.createElement("br"));
      $("#story-title").append(document.createTextNode(line));
    });
    $("#story-description").textContent = chapter.description;
    $("#next-label").textContent = chapter.button;
    $("#interaction-hint").textContent = chapter.hint;
    $("#scene-label").textContent = chapter.scene;
    $("#scene-caption").textContent = chapter.caption;
    $("#scene-description").textContent = chapter.alt;
    $("#progress-number").textContent = `0${step + 1} / 04`;
    $("#restart-button").disabled = step === 0;
    document.querySelectorAll(".progress-dot").forEach((dot,index) => {
      dot.classList.toggle("active", index === step);
      dot.classList.toggle("done", index < step);
      if (index === step) dot.setAttribute("aria-current", "step");
      else dot.removeAttribute("aria-current");
    });
    const copy = $(".story-text");
    copy.classList.remove("copy-enter");
    void copy.offsetWidth;
    copy.classList.add("copy-enter");
  }

  function notify(message) {
    clearTimeout(toastTimer);
    $("#toast").textContent = message;
    $("#toast").classList.add("visible");
    toastTimer = setTimeout(() => $("#toast").classList.remove("visible"), 3500);
  }

  // La carta usa textContent: el contenido personalizado nunca se ejecuta como HTML.
  function isDedication(value) {
    return value && typeof value.para === "string" && value.para.trim() && value.para.length <= 60 &&
      typeof value.mensaje === "string" && value.mensaje.trim() && value.mensaje.length <= 1800 &&
      typeof value.firma === "string" && value.firma.trim() && value.firma.length <= 100;
  }
  let dedication = config;
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (isDedication(stored)) dedication = stored;
  } catch { /* El modo privado o file:// pueden bloquear el almacenamiento. */ }

  function renderLetter() {
    $("#letter-to").textContent = dedication.para;
    $("#letter-message").textContent = dedication.mensaje;
    $("#letter-from").textContent = dedication.firma;
  }

  $("#next-button").addEventListener("click", () => {
    if (step < chapters.length - 1) { step++; renderStep(); playChime(); }
    else { renderLetter(); $("#letter-dialog").showModal(); }
  });
  $("#restart-button").addEventListener("click", () => { step = 0; renderStep(); $("#next-button").focus(); });
  $("#inspiration-button").addEventListener("click", () => $("#inspiration-dialog").showModal());
  $("#edit-button").addEventListener("click", () => {
    $("#recipient").value = dedication.para;
    $("#message").value = dedication.mensaje;
    $("#sender").value = dedication.firma;
    $("#save-status").textContent = "";
    $("#edit-dialog").showModal();
  });
  document.querySelectorAll("[data-close]").forEach(button => button.addEventListener("click", () => button.closest("dialog").close()));
  document.querySelectorAll("dialog").forEach(dialog => {
    dialog.addEventListener("click", event => {
      const rect = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
    });
  });
  $("#dedication-form").addEventListener("submit", event => {
    event.preventDefault();
    const next = { para: $("#recipient").value.trim(), mensaje: $("#message").value.trim(), firma: $("#sender").value.trim() };
    if (!isDedication(next)) { $("#save-status").textContent = "Completa los tres campos con tu dedicatoria."; return; }
    dedication = next;
    let saved = false;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(dedication)); saved = true; } catch { /* Se mantiene la dedicatoria durante esta sesión. */ }
    renderLetter();
    if (!saved) { $("#save-status").textContent = "Tu carta está lista para esta sesión. El navegador no permite guardarla de forma permanente."; return; }
    $("#edit-dialog").close();
    notify("Tu dedicatoria ya tiene un poquito de ti ♡");
  });
  $("#download-button").addEventListener("click", () => {
    const text = `${dedication.para}\n\n${dedication.mensaje}\n\n${dedication.firma}\n\n♡ A tu ritmo.\n`;
    const blob = new Blob(["\uFEFF", text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url; link.download = "Una-carta-para-ti.txt";
    document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  $("#reset-dedication-button").addEventListener("click", () => {
    dedication = config;
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* La copia de sesión se restaura igualmente. */ }
    $("#recipient").value = dedication.para;
    $("#message").value = dedication.mensaje;
    $("#sender").value = dedication.firma;
    renderLetter();
    $("#save-status").textContent = "Texto original restaurado.";
  });

  // Sonido original sintetizado: solo comienza tras pulsar el control.
  let audioContext, audioGain, audioInterval, soundOn = false, noteIndex = 0;
  const notes = [261.63, 329.63, 392, 493.88, 440, 392, 329.63, 293.66];
  function bell(frequency, time, duration = 2.8, volume = .15) {
    if (!audioContext || !audioGain) return;
    const oscillator = audioContext.createOscillator();
    const envelope = audioContext.createGain();
    oscillator.type = "sine"; oscillator.frequency.value = frequency;
    envelope.gain.setValueAtTime(0, time);
    envelope.gain.linearRampToValueAtTime(volume, time + .025);
    envelope.gain.exponentialRampToValueAtTime(.0001, time + duration);
    oscillator.connect(envelope); envelope.connect(audioGain);
    oscillator.start(time); oscillator.stop(time + duration + .1);
    oscillator.onended = () => { oscillator.disconnect(); envelope.disconnect(); };
  }
  function playNote() {
    if (!soundOn || document.hidden) return;
    const frequency = notes[noteIndex++ % notes.length];
    bell(frequency, audioContext.currentTime, 3.1, .13);
    bell(frequency / 2, audioContext.currentTime, 4, .055);
  }
  function playChime() {
    if (!soundOn) return;
    [523.25, 659.25, 783.99].forEach((frequency,i) => bell(frequency, audioContext.currentTime + i * .17, 1.4, .065));
  }
  function updateSoundButton() {
    $("#sound-button").setAttribute("aria-pressed", String(soundOn));
    $("#sound-button").setAttribute("aria-label", soundOn ? "Apagar sonido ambiental" : "Activar sonido ambiental");
    $("#sound-button").title = soundOn ? "Apagar sonido ambiental" : "Activar sonido ambiental";
    $("#sound-label").textContent = soundOn ? "Sonido encendido" : "Sonido apagado";
  }
  $("#sound-button").addEventListener("click", async () => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) { notify("Este navegador no admite el sonido. La historia funciona igualmente."); return; }
    $("#sound-button").disabled = true;
    try {
      if (!audioContext) { audioContext = new AudioContextClass(); audioGain = audioContext.createGain(); audioGain.gain.value = .3; audioGain.connect(audioContext.destination); }
      if (soundOn) { soundOn = false; clearInterval(audioInterval); await audioContext.suspend(); }
      else { await audioContext.resume(); soundOn = true; playNote(); audioInterval = setInterval(playNote, 2200); }
      updateSoundButton();
    } catch { soundOn = false; clearInterval(audioInterval); updateSoundButton(); notify("No se pudo activar el sonido en este navegador."); }
    finally { $("#sound-button").disabled = false; }
  });
  document.addEventListener("visibilitychange", () => {
    if (!audioContext || !soundOn) return;
    if (document.hidden) audioContext.suspend().catch(() => {});
    else audioContext.resume().catch(() => {});
  });

  drawScene();
  renderLetter();
  renderStep();
})();
