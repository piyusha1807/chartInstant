import { UPLOAD_FILE, COPY_PASTE, EXAMPLE_FILE } from '../constants/dashboardConstants';

const initialState = {
  uploadedData: [],
  uploadOption: 'upload',
  upload: {},
  copyPaste: {},
  example: {},
};

export const uploadReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case UPLOAD_FILE:
      return {
        ...state,
        uploadedData: payload.uploadedData,
        uploadOption: payload.uploadOption,
        upload: payload.upload,
        copyPaste: {},
        example: {},
      };
    case COPY_PASTE:
      return {
        ...state,
        uploadedData: payload.uploadedData,
        uploadOption: payload.uploadOption,
        upload: {},
        copyPaste: payload.copyPaste,
        example: {},
      };
    case EXAMPLE_FILE:
      return {
        ...state,
        uploadedData: payload.uploadedData,
        uploadOption: payload.uploadOption,
        upload: {},
        copyPaste: {},
        example: payload.example,
      };
    default:
      return state;
  }
};
