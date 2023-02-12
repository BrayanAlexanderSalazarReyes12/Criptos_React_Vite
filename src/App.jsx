import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import imagenCripto from './img/imagen-criptos.png'
import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import Spiner from './components/Spiner'

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;
  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`

const Contendor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

function App() {
  const [monedas,setMonedas] = useState({})
  const [cotizacion, setCotizacion] = useState({})
  const [Cargando, setCargando] = useState(false)

  useEffect(()=>{
    if(Object.keys(monedas).length > 0){
      const cotizarCriptos = async () =>{
        setCargando(true)
        setCotizacion({})
        const {moneda, criptoMoneda} = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        setTimeout(() => {  
          setCotizacion(resultado.DISPLAY[criptoMoneda][moneda])
          setCargando(false)
        }, 1000);
      }
      cotizarCriptos()
    }
  },[monedas])

  return (
    <Contendor>
      <Imagen src={imagenCripto} alt="Imagenes criptomonedas" />
      <div>
        <Heading>Cotiza Criptomonedas Al Instante</Heading>
        <Formulario 
          setMonedas = {setMonedas}
        />
        {Cargando && <Spiner />}
        {cotizacion.PRICE && <Resultado cotizacion = {cotizacion}/>} 
      </div>
    </Contendor>
  )
}

export default App
