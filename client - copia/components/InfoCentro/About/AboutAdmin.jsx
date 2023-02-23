import React from 'react'
import ContainerWrap from '../../ContainerWrap/ContainerWrap'

const AboutAdmin = ({comentario, handleInputChange}) => {

    return (
        <div className="about-container">
            <ContainerWrap title={"Información adicional"}>
                <div className="about">
                    <div className="info">
                        <textarea defaultValue={comentario} name={"comentario"} onChange={handleInputChange}>
                        </textarea>
                    </div>
                </div>
            </ContainerWrap>
        </div>
    )
}

export default AboutAdmin
