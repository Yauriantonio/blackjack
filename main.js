
// import { shuffle } from 'underscore';
import _ from 'underscore';
import './style.css';

// PATRON DE MODULO

// Encapsulación
// Creamos una función anónima autoinvocable que es una función tradicional o de flecha.
// Se crea un nuevo scout que no tiene referencia por nombre por lo que no va a ser posible llamarla.

// (function() {

// })();


// (() => {

// })();

// Ejemplo de como se útiliza:
// (() => {  
//     'use strict' // Significa decirle a JS ser estricto con el código.
//     const personajes = ['Ana', 'Mercy', 'Mei'];  // {Toda esta funcion es un Patron Modulo.
//     console.log(personajes);
// })();
// Agregamos una constante que se llama miModulo para todo el código.
const miModulo = (() => {
  'use strict' 
// OPTIMIZACIÓN DEL CÓDIGO
  let deck         = [];
  const tipos      = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K']; // Eliminamos las const que estan de más.

  let puntosJugadores = [];
  // let puntosPlayer = 0,
  //     puntosSkynet = 0;
  // Referencias del HTML.
  const btnPedir         = document.querySelector('#btnPedir'),
        btnDetener       = document.querySelector('#btnDetener'),
        btnNuevo         = document.querySelector('#btnNuevo');
  // Estas lineas de código ya no son necesarias por que las remplazaremos por:
  const divCartasJugadores = document.querySelectorAll('.divCarts'),
  // const divCartasJugador = document.querySelector('#jugador-cartas'),
  //       divCartaSkynet   = document.querySelector('#skinet-cartas'),
        sumatoria        = document.querySelectorAll('small');

  // Esta función inicia el juego.
  // const iniciarJuego = () => {  // A la hora de inicializar el juego podemos pedir cuantos número de jugadores existen.
  const iniciarJuego = ( numJugadores = 2) => { // quiero iniciar agregando una variable que por defecto pondre 1 - numJugadores = 1 -.
      deck = crearDeck(); // El último jugador simpre va a ser la computadora.
      
      puntosJugadores = []; // Se vacia todo y se reinicia dependiendo de cuentos jugadores son.
      for( let i = 0; i < numJugadores; i ++ ) { 
          puntosJugadores.push(0);
      }
      // console.log({ puntosJugadores });

      sumatoria.forEach( elem => elem.innerText = 0 );
      divCartasJugadores.forEach( elem => elem.innerHTML = '' );
      // sumatoria[0].innerText = 0;
      // sumatoria[1].innerText = 0;

      btnPedir.disabled   = false;
      btnDetener.disabled = false;  

  }     

  // Esta función crea un nuevo deck
  const crearDeck = () => {        
      
      deck = [];
      for( let i = 2; i <= 10; i++ ){
          for( let tipo of tipos ){
              deck.push( i + tipo );
          }
      }
      for( let tipo of tipos ){  
          for( let especial of especiales ){
              deck.push( especial + tipo );
          }
      }
      // deck = _.shuffle( deck ); 
      // return deck; // Optimizamos estas lineas de código.
      return _.shuffle( deck );
  }
  // crearDeck(); // No deberia estar, así que, le creamos una función que ponemos al inicio.

  // const iniciarJuego = () => {
  //     deck = crearDeck();
  // }

  const pedirCarta = () => {
      if( deck.length === 0 ){
          throw 'No hay más cartas prro!!!!!s' 
      }
  // const carta = deck.pop();  
  // return carta; // Optimizamos estas lineas de código.
      return deck.pop();
  }
// Se podria optimizar pero se perderia la lectura.
  const valorCarta = ( carta ) => {
      const valor = carta.substring(0, carta.length -1 );
      return ( isNaN( valor ) ) ?
          ( valor === 'A') ? 11 : 10
          : valor * 1;
  }

// Turno: 0 = Primer jugador
// Turno: 1 = Último jugador siempre será la computadora ( Skynet)
  const acumularPuntos = ( carta, turno) => {

      puntosJugadores[ turno ] = puntosJugadores[turno] + valorCarta( carta );
      sumatoria[turno].innerText = puntosJugadores[turno];
      return puntosJugadores[turno];
// Estos son los puntos acumulados y al final es lo que nos va a regresar.
}
// Creamos una nueva constante para la creacion de las cartas
  const crearCarta = ( carta, turno) => {

      const imgCarta = document.createElement('img');
      imgCarta.src = `assets/cartas/${ carta }.png`;
      imgCarta.classList.add('carta');
      // Agregamos la constante creada y agregamos la imagen de la carta.
      divCartasJugadores[turno].append(imgCarta);
      // divCartaSkynet.append( imgCarta );
  }

  const detGanador = () => {

      const [ puntosMinimos, puntosSkynet] = puntosJugadores;

      setTimeout(() => { 
          if( puntosSkynet === puntosMinimos ) {
              alert('"NADIE GANA"');
          }else if( puntosMinimos > 21 ){
              alert('FELICIDADES SKYNET GANASTE ERES BIEN PRO');
          }else if( puntosSkynet > 21 ){
              alert('FELICIDADES JUGADOR GANASTE ERES EL MEJOR');
          }else {
              alert('FELICIDADES SKYNET GANASTE SIEMPRE GANAS')
          }
      }, 100 ); 

  }

  // TURNO DE LA COMPUTADORA
  const turnoSkinet = ( puntosMinimos ) => { 
      
      let puntosSkynet = 0;

      do {  
          const carta = pedirCarta();
          // Cometamos estas lineas que ya ne se utilizaran por que se ha cambiado de 
          // puntos de la computadora a puntos de los jugadores y se ha optimizado.
          // Sólo mandamos a llamar la constante acumular puntos.
          puntosSkynet =  acumularPuntos(carta, puntosJugadores.length - 1 );
          // puntosSkynet = puntosSkynet + valorCarta( carta );
          // sumatoria[1].innerText = puntosSkynet;

          // Mandamos a llamar la función crearCarta y los puntos de los jugadores.
          crearCarta(carta,puntosJugadores.length - 1 );
          // Cometamos estas lineas que ya ne se utilizaran
          // const imgCarta = document.createElement('img');
          // imgCarta.src = `assets/cartas/${ carta }.png`;
          // imgCarta.classList.add('carta');
          // divCartaSkynet.append( imgCarta );
          // if( puntosMinimos > 21 ) { 
          //     break; 
          // }

      } while( (puntosSkynet < puntosMinimos) && ( puntosMinimos <= 21 ) );

      detGanador();
  }

  // EVENTO CLICK - PEDIR CARTA

  btnPedir.addEventListener('click', () => { 

      const carta = pedirCarta();
      // Comentamo estás lineas de código para optimizarlas, ya que no se utilizarán 
      // por que se han cambiado por acumularPuntos.
      const puntosPlayer =  acumularPuntos( carta, 0 );
      // puntosPlayer = puntosPlayer + valorCarta( carta ); 
      // sumatoria[0].innerText = puntosPlayer;

      // Mandamos a llamar crear carta y colocamos la carta y el jugador 1.
      crearCarta( carta, 0 );
      // Por lo que ya no se útilizan las siguientes lineas de código y las comentamos.

  // CREAR CARTAS DEL JUGADOR EN EL HTML

      // const imgCarta = document.createElement('img'); 
      // imgCarta.src = `assets/cartas/${ carta }.png`;                                             
      // imgCarta.classList.add('carta');
      // divCartasJugadores.append( imgCarta );

      if ( puntosPlayer > 21 ){
          console.warn('Lo siento mucho, perdiste');
          btnPedir.disabled   = true;
          btnDetener.disabled = true;
          turnoSkinet( puntosPlayer );

      }else if ( puntosPlayer === 21 ) {
          console.warn('21, GREAT HDPM...!!!!');
          btnPedir.disabled   = true;
          btnDetener.disabled = true;
          turnoSkinet( puntosPlayer );
      }
  });

  btnDetener.addEventListener('click', () => {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoSkinet( puntosJugadores[0]  );
  });

  btnNuevo.addEventListener('click', () => {
      // console.clear(); 

      iniciarJuego();

      // deck = [];
      // deck = crearDeck(); 

      // puntosPlayer = 0;
      // puntosSkynet = 0; 

      // sumatoria[0].innerText = 0;
      // sumatoria[1].innerText = 0;

      // divCartaSkynet.innerHTML   = '';
      // divCartasJugador.innerHTML = '';

      // btnPedir.disabled   = false;
      // btnDetener.disabled = false;    
  });
// Antes de que termine siempre se va a retornar.
// Todo lo que contenga el return va a ser público y sólo se suede acceder a el mediante miModulo.
  return {
      nuevoJuego: iniciarJuego
  };

})();
// La terminació min es para hacer referencia a un a un archivo listo para subir a la web.
// https://www.toptal.com/developers/javascript-minifier   -  Enlace para minimizar el código.














