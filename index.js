//Esercizio 1: Gestione Completa di un Carrello con Applicazione di Sconto e Verifica Stock

// funzione che applica lo sconto ai prodotti
function applicaSconto(prodotti, sconto, callback) {
  const prodottiScontati = prodotti.map(({ nome, prezzo, ...rest }) => {
    // con .map creaiamo un nuovo array, in cui ogni prodotto ha il suo prezzo scontato
    const prezzoScontato = prezzo - (prezzo * sconto) / 100;
    return {
      nome,
      prezzo: prezzoScontato.toFixed(2),
      ...rest,
    };
  });

  setTimeout(() => {
    callback(prodottiScontati);
  }, 1000);
}
// funzione che verifica la disponibilità di stock dei prodotti
function verificaStock(prodottiScontati, callback) {
  const prodottiDisponibili = [];
  let prodottiVerificati = 0;

  prodottiScontati.forEach((prodotto) => {
    setTimeout(() => {
      const disponibile = Math.random() > 0.2;
      if (disponibile) {
        prodottiDisponibili.push(prodotto);
      }

      prodottiVerificati++;

      if (prodottiVerificati === prodottiScontati.length) {
        callback(prodottiDisponibili);
      }
    }, 1000 * prodottiVerificati);
  });
}
// funzione per calcolare il totale del carrello
function calcolaTotale(prodottiDisponibili, callback) {
  const totale = prodottiDisponibili
    .reduce((acc, { prezzo }) => acc + parseFloat(prezzo), 0) // .reduce lo utilizziamo per sommare i prezzi dei prodotti disponibili
    .toFixed(2);

  setTimeout(() => {
    callback(totale);
  }, 1000);
}

const prodotti = [
  {
    nome: "Maglietta",
    prezzo: 19.99,
    categoria: "Abbigliamento",
    disponibilita: true,
    quantita: 50,
  },
  {
    nome: "Laptop",
    prezzo: 799.99,
    categoria: "Elettronica",
    disponibilita: false,
    quantita: 0,
  },
  {
    nome: "Bottiglia d'acqua",
    prezzo: 1.5,
    categoria: "Cibo e Bevande",
    disponibilita: true,
    quantita: 200,
  },
  {
    nome: "Cuffie Bluetooth",
    prezzo: 49.99,
    categoria: "Elettronica",
    disponibilita: true,
    quantita: 30,
  },
];
// funzione che richiama le chiamate
function gestisciCarrello() {
  const sconto = 10;

  applicaSconto(prodotti, sconto, (prodottiScontati) => {
    verificaStock(prodottiScontati, (prodottiDisponibili) => {
      calcolaTotale(prodottiDisponibili, (totale) => {
        console.log(`Il totale del carrello è: €${totale}`);
      });
    });
  });
}

gestisciCarrello();
