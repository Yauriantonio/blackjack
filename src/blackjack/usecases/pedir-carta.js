/**
 * Esta función me permite tomar una carta
 * @param {Array<String>} deck es un arreglo de string. 
 * @returns {String} retorna la carta del deck.
 */

// Esta función me permite tomar una carta
export const pedirCarta = ( deck ) => {

    if( !deck || deck.length === 0 ){
        throw new Error('¡No hay más cartas en el mazo!');
    }
// const carta = deck.pop();  
// return carta; // Optimizamos estas lineas de código.
    return deck.pop();
}