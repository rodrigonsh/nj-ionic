import axios from 'axios'
import store from './store'

const dj = 
{    

    voz: new Audio(),
    bgm: new Audio(),
    sfx: new Audio(),

    get( trackName )
    {
        return this[trackName]
    },

    diga( fileName )
    {
        this.voz.src = "/vozes/"+fileName
        this.voz.play()
    },

    play( musica )
    {

        let state = store.state

        let partes = []
        partes.push(state.apiURL)
        partes.push('music')
        partes.push(state.account.theme)
        partes.push(musica+'.mp3')
    
        this.bgm.src = partes.join('/')

        this.bgm.dataset.musica = musica
        this.bgm.play()
    },

    efeito( som )
    {
        //console.log('efeito', som)
        if ( !this.sfx.paused ) 
        {   //console.log('nao está pausado')
            return;
        }

        if ( som.substring(0, 4) == 'http' ) 
        {
            this.sfx.src = som
        }
        else
        {
            this.sfx.src = "/sfx/"+som
        }
        this.sfx.play()
    }
    
}

export default dj