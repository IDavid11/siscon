import React from 'react'
import ContainerWrap from '../../ContainerWrap/ContainerWrap'

const About = (props) => {

    return (
        <div className="about-container">
            <ContainerWrap title={"Información adicional"}>
            <div className="about">
                <div className="info">
                    {props.centro.comentario[0] !== "" ?
                        <>
                            {props.centro.comentario.map((comment) => {
                                return (
                                    <span>{comment}</span>
                                )
                            })}
                        </>
                        :
                        <div className="empty-info">
                            <span>Non hai información adicional</span>
                        </div>
                    }
                </div>
            </div>
            </ContainerWrap>
        </div>
    )
}

export default About
