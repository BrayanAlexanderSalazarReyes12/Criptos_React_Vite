import styled from "@emotion/styled"

const Respuesta = styled.div`
    color: #FFF;
    font-family: 'Lato', sans-serif;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 30px;
`

const Texto = styled.p`
    font-size: 18px;
    span{
        font-weight: 700;
    }
`

const Precio = styled.p`
    font-size: 24px;
    span{
        font-weight: 700;
    }
`

const Imagen = styled.img`
    display: block;
    width: 120px;
`

const Resultado = ({cotizacion}) => {
    const {PRICE, HIGHDAY, LOWDAY, IMAGEURL, CHANGEPCT24HOUR, LASTUPDATE} = cotizacion
    return (
        <Respuesta>
            <Imagen src={`https://cryptocompare.com${IMAGEURL}`} alt="Imagen Cripto" />
            <div>
                <Precio>El precio es de: <span>{PRICE}</span></Precio>
                <Texto>Precio más alto del dia: <span>{HIGHDAY}</span></Texto>
                <Texto>Precio más bajo del dia: <span>{LOWDAY}</span></Texto>
                <Texto>Variación últimas 24 horas: <span>{CHANGEPCT24HOUR}</span></Texto>
                <Texto>Última Actualización: <span>{LASTUPDATE}</span></Texto>
            </div>
        </Respuesta>
    )
}

export default Resultado
