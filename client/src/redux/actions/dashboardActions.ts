import { UPLOAD_FILE, COPY_PASTE, EXAMPLE_FILE } from '../constants/dashboardConstants';

export function uploadFile(payload: any) {
  return {
    type: UPLOAD_FILE,
    payload,
  };
}

export function copyPasteData(payload: any) {
  return {
    type: COPY_PASTE,
    payload,
  };
}

export function exampleFile(payload: any) {
  return {
    type: EXAMPLE_FILE,
    payload,
  };
}
