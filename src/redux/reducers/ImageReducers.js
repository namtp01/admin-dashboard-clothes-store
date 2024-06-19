import { IMAGE_UPLOAD_FAIL, IMAGE_UPLOAD_REQUEST, IMAGE_UPLOAD_RESET, IMAGE_UPLOAD_SUCCESS } from "../constants/ImageConstatns"

export const imageProductUploadReducer = (state = {}, action) => {
    switch (action.type) {
        case IMAGE_UPLOAD_REQUEST:
            return { loading: true }
        case IMAGE_UPLOAD_SUCCESS:
            return { loading: false, imageUrl: action.payload }
        case IMAGE_UPLOAD_FAIL:
            return { loading: false, error: action.payload }
        case IMAGE_UPLOAD_RESET:
            return { }
        default:
            return state
    }
}