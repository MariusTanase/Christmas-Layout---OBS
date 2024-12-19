// Face update la timerul de Craciun / de deschidere
function updateTimer() {
  const timpCurent = new Date();
  const timpCraciun = new Date(timpCurent.getFullYear(), 11, 25);

  if (timpCurent.getMonth() === 11 && timpCurent.getDate() > 25) {
    timpCraciun.setFullYear(timpCraciun.getFullYear() + 1);
  }

  const diferenta = timpCraciun - timpCurent;

  const zile = Math.floor(diferenta / 1000 / 60 / 60 / 24);
  const ore = Math.floor(diferenta / 1000 / 60 / 60) % 24;
  const minute = Math.floor(diferenta / 1000 / 60) % 60;
  const secunde = Math.floor(diferenta / 1000) % 60;

  document.querySelector(
    "#countdown"
  ).textContent = `${zile} zile ${ore} ore ${minute} minute ${secunde}s`;
}

// Functie principala pentru mesaj de craciun cu animatie
function arataMesajCraciun() {
  const mesaj = document.querySelector("#christmasMessage");
  updateTimer();

  //   arata mesajul cu animate de FadeIn
  mesaj.classList.remove("hidden", "fadeOut");

  //   ascunde mesajul cu animate de FadeOut
  setTimeout(() => {
    mesaj.classList.add("fadeOut");
  }, 13000);

  //   ascunde mesajul
  setTimeout(() => {
    mesaj.classList.add("hidden");
  }, 15000);
}

// resetare animatie mos craciun
function resetareMosCraciunAnimatie() {
  const mosCraciun = document.querySelector("#santa");

  // Repornire animatie prin reset
  mosCraciun.classList.remove("hidden"); // Scoatere din hidden
  mosCraciun.style.animation = "none"; // Scoatere temporara a animatiei

  // Aplicare animatie
  requestAnimationFrame(() => {
    mosCraciun.style.animation = ""; // Aplicare animatie
    mosCraciun.style.animationPlayState = "running";
  });

  setTimeout(() => {
    mosCraciun.classList.add("hidden");
    mosCraciun.style.animationPlayState = "paused";
  }, 20000);
}

// call initial
function startInitial() {
  arataMesajCraciun();
  resetareMosCraciunAnimatie();
}

// Creare lumini craciun, animatie si cablu de legatura
function creareLuminiCraciun() {
  // selectare container lumini
  const containerLuminiCraciun = document.querySelector("#lightsContainer");
  //   array de culori pentru lumini
  const culori = [
    "red",
    "green",
    "blue",
    "yellow",
    "purple",
    "orange",
    "cyan",
    "pink",
  ];
  //   generare numar fix de lumini pe baza de latime browser
  const numarDeBeculete = Math.floor(window.innerWidth / 50); // o luminita la fiecare 50px

  //   creare SVG path pentru fiecare lumina
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  const path = document.createElementNS(svgNS, "path");

  //   adaugare punct de start svg pentru path
  let distantaPath = "M0, 25";
  //   initiere array pentru a salva pozitia luminilor
  const pozitiiLumini = [];

  for (let i = 0; i < numarDeBeculete; i++) {
    // generare progress pentru fiecare lumina numarul o sa fie sub 1 pana la final
    const progress = i / numarDeBeculete;

    const x = window.innerWidth * progress; // pozitia pe axa x pentru fiecare lumina
    const y = 25 + Math.sin(i * 0.5) * 10; // ajustare unghi sinusoidal pentru fiecare lumina

    distantaPath += `L${x}, ${y}`; // adaugare la path

    // oprire generare lumini pentru a avea cablu la final
    if (progress < 0.999) {
      pozitiiLumini.push({ x, y }); // salvare lumina daca este sub 99.9% din width
    }
  }

  //   asigurare ca path-ul se intinde pana la final de pagina (width)
  distantaPath += `L${window.innerWidth}, 25`;

  //   adaugare path la SVG
  path.setAttribute("d", distantaPath); // adaugare distanta la path
  path.setAttribute("fill", "none"); // fara fill
  path.setAttribute("stroke", "white"); // culoare cablu de legatura
  path.setAttribute("stroke-width", "2"); // grosimea cablului de legatura a luminilor de 2px

  svg.appendChild(path); // adaugare path la SVG
  containerLuminiCraciun.appendChild(svg); // adaugare SVG la container

  //   initire variabila pentru culoare random trecuta
  let culoareTrecuta = null;

  pozitiiLumini.forEach((pos) => {
    const luminita = document.createElement("div"); // creare container pentru lumina
    luminita.classList.add("beculete"); // adaugare clasa light pentru stilizare

    // generare culoare random pentru lumina
    let culoareRandom;
    // asigurare ca culoarea nu se repeta si este un loop pana se genereaza o culoare noua
    do {
      culoareRandom = culori[Math.floor(Math.random() * culori.length)];
    } while (culoareRandom === culoareTrecuta); // asigurare ca culoarea nu se repeta

    luminita.style.setProperty("--culoare-lumina", culoareRandom); // adaugare culoare proprietatea root --culoare-lumina
    culoareTrecuta = culoareRandom; // salvare culoare trecuta

    // setare timp random pentru animatie la fiecare lumina
    const duratieAleatorie = `${Math.random() * 1 + 3}s`; // duratie random intre 2 si 5 secunde
    const intarizereAleatorie = `${Math.random() * 2}s`; // intarziere random intre 0 si 2 secunde

    // adaugare animatie la fiecare lumina
    luminita.style.setProperty("--timp-aprindere", duratieAleatorie); // adaugare duratie animatie
    luminita.style.animationDelay = intarizereAleatorie; // adaugare intarziere animatie

    // setare pozitie pentru fiecare lumina
    luminita.style.left = `${pos.x + 15}px`; // setare pozitie x // pozitie orizontala // de la stanga la dreapta
    luminita.style.top = `${pos.y - 15}px`; // setare pozitie y // pozitie verticala // de sus in jos

    // adaugare lumina la container
    containerLuminiCraciun.appendChild(luminita);
  });
}

// Rulare initiala
startInitial();
creareLuminiCraciun();

// Repetari la fiecare 1000ms
setInterval(updateTimer, 1000);

// repetare interval
setInterval(startInitial, 300000);
