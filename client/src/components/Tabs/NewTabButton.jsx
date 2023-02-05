import React from 'react'

export const NewTabButton = ({isLoading, handleNewTabButton}) => {

    return (
        <div className="new-tab-button-container">
            <div className="new-tab-button-wrap">
                <button className={`${isLoading ? "disabled" : ""}`} onClick={handleNewTabButton}>
                    <img src="../assets/icons/plus.svg" alt="" />
                </button>
            </div>
        </div>
    )
}
