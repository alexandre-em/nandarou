import { deleteSelectionned } from "../actions/selectionnedAction";

let INITIAL_STATE = {
    selectionned: []
}

let selectionnedReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "EDIT_SELECTIONNED":
            if (state.selectionned.includes(action.character))
                return deleteSelected(state, action)
            else
                return addSelected(state, action)
        default:
            return state

    }
}

const deleteSelected = (state, action) => {
    return { ...state, selectionned: state.selectionned.filter(val => val != action.character) }
}

const addSelected = (state, action) => {
    return { ...state, selectionned: [...state.selectionned, action.character] };
}

export default selectionnedReducer