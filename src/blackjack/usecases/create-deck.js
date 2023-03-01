// import {shuffle} from 'underscore';
import _ from 'underscore';

/**
 * Esta función crea un nuevo deck
 * @param {Array<String>} tiposDeCarta Ejemplo: ['C', 'D', 'H', 'S'],
 * @param {Array<String>} tiposEspeciales Ejemplo: ['A', 'J', 'Q', 'K'];
 * @returns {Array<String>} retorna un nuevo deck de cartas
 */
  // Esta función crea un nuevo deck
  export const crearDeck = ( tiposDeCarta, tiposEspeciales ) => {        

    if ( !tiposDeCarta || tiposDeCarta.length === 0 ) 
        throw new Error('TiposDeCarta es obligatorio como un arreglo de String');
    if ( !tiposEspeciales || tiposEspeciales.length === 0 ) 
        throw new Error('tiposEspeciales es obligatorio como un arreglo de String');

      
    let deck = [];

    deck = [];
    for( let i = 2; i <= 10; i++ ){
        for( let tipo of tiposDeCarta ){
            deck.push( i + tipo );
        }
    }
    for( let tipo of tiposDeCarta ){  
        for( let especial of tiposEspeciales ){
            deck.push( especial + tipo );
        }
    }
    // deck = _.shuffle( deck ); 
    // return deck; // Optimizamos estas lineas de código.

    // return shuffle( deck );
    return _.shuffle( deck );
}
// crearDeck(); // No deberia estar, así que, le creamos una función que ponemos al inicio.

// const iniciarJuego = () => {
//     deck = crearDeck();
// }

// export default crearDeck;