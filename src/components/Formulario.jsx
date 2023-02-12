import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { monedas } from "../data/monedas"
import useSelectMonedas from "../hooks/useSelectMonedas"

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;
    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Formulario = ({setMonedas}) => {
    
    const [criptos,SetCriptos] = useState([])
    const [moneda,SelectMonedas] = useSelectMonedas('Elige tu Moneda',monedas)
    const [criptoMoneda,SelecCriptoMoneda] = useSelectMonedas('Elige tu Criptomoneda',criptos)
    const [error, setError] = useState(false)
    
    useEffect(()=>{
        const consultarAPI = async () =>{
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            const arrayCriptos = resultado.Data.map(cripto => {
                const objeto= {
                    id: cripto.CoinInfo.Name,
                    Nombre:cripto.CoinInfo.FullName
                }
                return objeto
            })
            SetCriptos(arrayCriptos)
        }
        consultarAPI()
    },[])

    const errorMensaje = () => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Todos los campos son obligatorios'
        })
        setError(false)
    }

    const handleSubmit = e => {
        e.preventDefault()
        if([moneda,criptoMoneda].includes('')){
            setError(true)
            return
        }
        setError(false)
        setMonedas({
            moneda,
            criptoMoneda
        })
    }

    return (
        <>
            {error && errorMensaje()}
            <form onSubmit={handleSubmit}>
                <SelectMonedas />
                <SelecCriptoMoneda />
                <InputSubmit type="submit" value="Cotizar" />
            </form>
        </>
    )
}

export default Formulario
