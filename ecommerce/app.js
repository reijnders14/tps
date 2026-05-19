document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

// Funzione globale di avvio applicazione
function initApp() {
    gestisciConfigurazioneIniziale();
    aggiornaHeaderDinamico();

    // Routing interno rudimentale basato sulla presenza di elementi specifici nel DOM
    if (document.getElementById("config-form")) {
        initPaginaConfig();
    } else if (document.getElementById("catalog-grid")) {
        initPaginaCatalogo();
    } else if (document.getElementById("product-detail")) {
        initPaginaDettaglio();
    } else if (document.getElementById("cart-items")) {
        initPaginaCarrello();
    }
}

/* ==========================================
   SISTEMA DI NOTIFICHE TOAST (Alternativa ad alert)
   ========================================== */
function mostraToast(messaggio) {
    const container = document.getElementById("toast-container");
    if (!container) return;
    
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = messaggio;
    
    container.appendChild(toast);
    
    // Rimuove l'elemento dal DOM al termine dell'animazione CSS (2 secondi)
    setTimeout(() => {
        toast.remove();
    }, 2000);
}

/* ==========================================
   GESTIONE CONFIGURAZIONE E LOCALSTORAGE
   ========================================== */
function gestisciConfigurazioneIniziale() {
    const shopName = localStorage.getItem("shop_name");
    const isIniPage = window.location.pathname.includes("ini.html");

    // Se manca la configurazione e non siamo su ini.html, effettua il redirect forzato
    if (!shopName && !isIniPage) {
        window.location.href = "ini.html";
    }
}

function aggiornaHeaderDinamico() {
    const shopName = localStorage.getItem("shop_name") || "Il Mio E-commerce";
    const shopCat = localStorage.getItem("shop_category") || "Catalogo Generale";

    const elName = document.getElementById("dyn-shop-name");
    const elCat = document.getElementById("dyn-shop-cat");

    if (elName) elName.textContent = shopName;
    if (elCat) elCat.textContent = shopCat;
}

function initPaginaConfig() {
    const form = document.getElementById("config-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("shop-name").value.trim();
        const cat = document.getElementById("shop-category").value;

        localStorage.setItem("shop_name", name);
        localStorage.setItem("shop_category", cat);

        mostraToast("Negozio configurato con successo!");
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    });
}

/* ==========================================
   PARSING DEL FILE CSV IN VANILLA JAVASCRIPT
   ========================================== */
async function caricaProdottiDaCSV() {
    try {
        const response = await fetch("prodotti.csv");
        if (!response.ok) throw new Error("File CSV non trovato o non leggibile.");
        
        const textData = await response.text();
        // Divide per linee, rimuove spazi vuoti finali ed elimina righe vuote
        const righe = textData.split("\n").map(r => r.trim()).filter(r => r.length > 0);
        
        if (righe.length < 2) return [];

        // Prima riga = Intestazioni (id;marca;nome;ecc.)
        const intestazioni = righe[0].split(";").map(i => i.trim());
        
        // Mappa le righe successive in array di oggetti strutturati
        return righe.slice(1).map(riga => {
            const valori = riga.split(";");
            const prodotto = {};
            intestazioni.forEach((intestazione, indice) => {
                prodotto[intestazione] = valori[indice] ? valori[indice].trim() : "";
            });
            return prodotto;
        });
    } catch (errore) {
        console.error("Errore nel caricamento del catalogo:", errore);
        mostraToast("Errore nel caricamento dei prodotti.");
        return [];
    }
}

/* ==========================================
   PAGINA CATALOGO (index.html)
   ========================================== */
async function initPaginaCatalogo() {
    const grid = document.getElementById("catalog-grid");
    const prodotti = await caricaProdottiDaCSV();

    if (prodotti.length === 0) {
        const msg = document.createElement("p");
        msg.textContent = "Nessun prodotto disponibile al momento.";
        grid.appendChild(msg);
        return;
    }

    prodotti.forEach(prod => {
        const card = document.createElement("div");
        card.className = "product-card";

        const img = document.createElement("img");
        img.src = prod.immagine;
        img.alt = prod.nome;
        img.onerror = () => { img.src = "https://placeholder.cards/product"; }; // Fallback se manca l'immagine

        const info = document.createElement("div");
        info.className = "product-info";

        const brand = document.createElement("span");
        brand.className = "brand";
        brand.textContent = prod.marca;

        const title = document.createElement("h3");
        title.textContent = prod.nome;

        const desc = document.createElement("p");
        desc.className = "desc";
        desc.textContent = prod.descrizione_breve;

        const meta = document.createElement("div");
        meta.className = "product-meta";

        const price = document.createElement("span");
        price.className = "price";
        price.textContent = `€ ${parseFloat(prod.prezzo).toFixed(2)}`;

        const btnLink = document.createElement("a");
        btnLink.href = `prodotto.html?id=${prod.id}`;
        btnLink.className = "btn";
        btnLink.textContent = "Dettagli prodotto";

        meta.appendChild(price);
        meta.appendChild(btnLink);

        info.appendChild(brand);
        info.appendChild(title);
        info.appendChild(desc);
        info.appendChild(meta);

        card.appendChild(img);
        card.appendChild(info);

        grid.appendChild(card);
    });
}

/* ==========================================
   PAGINA DETTAGLIO PRODOTTO (prodotto.html)
   ========================================== */
async function initPaginaDettaglio() {
    const container = document.getElementById("product-detail");
    const urlParams = new URLSearchParams(window.location.search);
    const prodId = urlParams.get("id");

    if (!prodId) {
        container.textContent = "Prodotto non specificato.";
        return;
    }

    const prodotti = await caricaProdottiDaCSV();
    const prodotto = prodotti.find(p => p.id === prodId);

    if (!prodotto) {
        container.textContent = "Prodotto non trovato nel catalogo.";
        return;
    }

    // Costruzione dinamica dell'interfaccia dettaglio prodotto
    const img = document.createElement("img");
    img.src = prodotto.immagine;
    img.alt = prodotto.nome;
    img.className = "details-image";

    const content = document.createElement("div");
    content.className = "details-content";

    const brand = document.createElement("span");
    brand.className = "brand";
    brand.textContent = prodotto.marca;

    const title = document.createElement("h2");
    title.textContent = prodotto.nome;

    const desc = document.createElement("p");
    desc.className = "full-desc";
    desc.textContent = prodotto.descrizione_completa;

    const price = document.createElement("div");
    price.className = "price";
    price.style.fontSize = "1.8rem";
    price.style.marginBottom = "1.5rem";
    price.textContent = `€ ${parseFloat(prodotto.prezzo).toFixed(2)}`;

    const actionDiv = document.createElement("div");
    actionDiv.className = "details-action";

    const btnAdd = document.createElement("button");
    btnAdd.className = "btn";
    btnAdd.textContent = "Aggiungi al carrello";
    btnAdd.addEventListener("click", () => {
        aggiungiAlCarrello(prodotto);
    });

    const btnBack = document.createElement("a");
    btnBack.href = "index.html";
    btnBack.className = "btn btn-secondary";
    btnBack.textContent = "Torna al catalogo";

    actionDiv.appendChild(btnAdd);
    actionDiv.appendChild(btnBack);

    content.appendChild(brand);
    content.appendChild(title);
    content.appendChild(desc);
    content.appendChild(price);
    content.appendChild(actionDiv);

    container.appendChild(img);
    container.appendChild(content);
}

/* ==========================================
   GESTIONE LOGICA DEL CARRELLO
   ========================================== */
function ottieniCarrello() {
    return JSON.parse(localStorage.getItem("cart_items")) || [];
}

function salvaCarrello(carrello) {
    localStorage.setItem("cart_items", JSON.stringify(carrello));
}

function aggiungiAlCarrello(prodotto) {
    const carrello = ottieniCarrello();
    // Aggiunge l'oggetto direttamente salvando le info necessarie per sessioni offline/statiche
    carrello.push({
        id: prodotto.id,
        nome: prodotto.nome,
        marca: prodotto.marca,
        descrizione_breve: prodotto.descrizione_breve,
        prezzo: prodotto.prezzo
    });
    salvaCarrello(carrello);
    mostraToast("Prodotto aggiunto al carrello!");
}

/* ==========================================
   PAGINA CARRELLO (carrello.html)
   ========================================== */
function initPaginaCarrello() {
    renderingElementiCarrello();

    document.getElementById("btn-clear").addEventListener("click", () => {
        const carrello = ottieniCarrello();
        if (carrello.length === 0) {
            mostraToast("Il carrello è già vuoto!");
            return;
        }
        salvaCarrello([]);
        renderingElementiCarrello();
        mostraToast("Carrello svuotato!");
    });

    document.getElementById("btn-pdf").addEventListener("click", generaRicevutaPDF);
}

function renderingElementiCarrello() {
    const container = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");
    const carrello = ottieniCarrello();

    container.textContent = ""; // Reset del box

    if (carrello.length === 0) {
        const vuoto = document.createElement("p");
        vuoto.textContent = "Il carrello è vuoto.";
        vuoto.style.padding = "2rem 0";
        container.appendChild(vuoto);
        totalEl.textContent = "€ 0.00";
        return;
    }

    let totaleConto = 0;

    carrello.forEach((item, index) => {
        totaleConto += parseFloat(item.prezzo);

        const row = document.createElement("div");
        row.className = "cart-item";

        const info = document.createElement("div");
        info.className = "cart-item-info";

        const titolo = document.createElement("h4");
        titolo.textContent = `${item.marca} - ${item.nome}`;

        const desc = document.createElement("p");
        desc.className = "desc";
        desc.style.fontSize = "0.85rem";
        desc.textContent = item.descrizione_breve;

        info.appendChild(titolo);
        info.appendChild(desc);

        const prezzo = document.createElement("span");
        prezzo.className = "price";
        prezzo.style.fontSize = "1.1rem";
        prezzo.textContent = `€ ${parseFloat(item.prezzo).toFixed(2)}`;

        const btnRemove = document.createElement("button");
        btnRemove.className = "btn btn-danger";
        btnRemove.style.padding = "0.5rem 1rem";
        btnRemove.style.fontSize = "0.85rem";
        btnRemove.textContent = "Rimuovi";
        btnRemove.addEventListener("click", () => {
            rimuoviDalCarrello(index);
        });

        row.appendChild(info);
        row.appendChild(prezzo);
        row.appendChild(btnRemove);

        container.appendChild(row);
    });

    totalEl.textContent = `€ ${totaleConto.toFixed(2)}`;
}

function rimuoviDalCarrello(indice) {
    const carrello = ottieniCarrello();
    carrello.splice(indice, 1);
    salvaCarrello(carrello);
    renderingElementiCarrello();
    mostraToast("Prodotto rimosso dal carrello.");
}

/* ==========================================
   GENERAZIONE PDF MULTIPAGINA CON jspdf
   ========================================== */
function generaRicevutaPDF() {
    const carrello = ottieniCarrello();
    if (carrello.length === 0) {
        mostraToast("Il carrello è vuoto! Impossibile generare il PDF.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const nomeNegozio = localStorage.getItem("shop_name") || "Il Mio E-commerce";
    const categoriaNegozio = localStorage.getItem("shop_category") || "Catalogo Generale";

    // Setup iniziale Layout del PDF
    doc.setFont("Helvetica", "bold");
    doc.setFillColor(79, 70, 229); // Colore Primario (--primary) in RGB
    doc.rect(0, 0, 210, 40, "F");

    // Header grafico interno al PDF
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text(nomeNegozio.toUpperCase(), 15, 20);
    doc.setFontSize(10);
    doc.setFont("Helvetica", "normal");
    doc.text(`Categoria: ${categoriaNegozio} | Ricevuta Ordine`, 15, 30);

    // Corpo del documento
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(14);
    doc.setFont("Helvetica", "bold");
    doc.text("Riepilogo dei Prodotti Acquistati", 15, 55);

    doc.setStrokeColor(226, 232, 240);
    doc.line(15, 58, 195, 58);

    let coordinataY = 70;
    let totaleFinale = 0;

    doc.setFontSize(10);

    carrello.forEach((prodotto, i) => {
        // Controllo di sicurezza per evitare overflow (Gestione automatica multipagina)
        if (coordinataY > 270) {
            doc.addPage();
            coordinataY = 30; // Riparte dall'alto nella nuova pagina
        }

        doc.setFont("Helvetica", "bold");
        doc.text(`${i + 1}. ${prodotto.marca} - ${prodotto.nome}`, 15, coordinataY);
        
        doc.setFont("Helvetica", "normal");
        // Tronca la descrizione se troppo lunga per il layout del PDF
        const descTroncata = prodotto.descrizione_breve.substring(0, 75);
        doc.text(descTroncata, 15, coordinataY + 5);

        const prezzoFormattato = `EUR ${parseFloat(prodotto.prezzo).toFixed(2)}`;
        doc.setFont("Helvetica", "bold");
        doc.text(prezzoFormattato, 165, coordinataY, { align: "right" });

        totaleFinale += parseFloat(prodotto.prezzo);
        coordinataY += 18; // Spazio verticale tra i prodotti
    });

    // Controllo spazio finale per i totali conto
    if (coordinataY > 250) {
        doc.addPage();
        coordinataY = 40;
    }

    coordinataY += 5;
    doc.setStrokeColor(79, 70, 229);
    doc.lineWidth = 0.5;
    doc.line(15, coordinataY, 195, coordinataY);

    // Totale a schermo del PDF
    coordinataY += 12;
    doc.setFontSize(14);
    doc.setFont("Helvetica", "bold");
    doc.text("TOTALE FINALE:", 15, coordinataY);
    doc.text(`EUR ${totaleFinale.toFixed(2)}`, 165, coordinataY, { align: "right" });

    // Salva il file scaricandolo nel browser locale
    doc.save(`ordine-${nomeNegozio.toLowerCase().replace(/\s+/g, "-")}.pdf`);
    mostraToast("PDF Generato e scaricato!");
}
