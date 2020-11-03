export const editSelectionned = (kanji) => {
    return ({
        type: "EDIT_SELECTIONNED",
        character: kanji
    })
}

export const addSelectionned = (kanji) => {
    return({
        type: "ADD_SELECTIONNED",
        character: kanji
    })
}

export const deleteSelectionned = (kanji) => {
    return ({
        type: "DELETE_SELECTIONNED",
        character: kanji
    })
}

export const deleteAll = () => {
    return ({
        type: "DELETE_ALL"
    })
}