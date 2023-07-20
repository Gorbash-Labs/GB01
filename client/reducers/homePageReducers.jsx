export const homePageActions = {
  SHOW_OVERLAY: 'SHOW_OVERLAY',
  NAME_INPUT: 'NAME_INPUT',
  URL_INPUT: 'URL_INPUT',
  IMAGE_URL_INPUT: 'IMAGE_URL_INPUT',
  DESCRIPTION_INPUT: 'DESCRIPTION_INPUT',
  SUBMIT: 'SUBMIT',
  LOAD: 'LOAD',
  NEW_DATA: 'NEW_DATA',
  EXIT: 'EXIT',
};

export const homePageStateInit = {
  visible: false,
  loading: 'idle',
  apiName: '',
  apiUrl: '',
  apiDescription: '',
  apiImageUrl: '',
  apiData: [],
};

export const homePageReducer = (state, action) => {
  switch (action.type) {
    case homePageActions.SHOW_OVERLAY: {
      return { ...state, visible: true };
    }
    case homePageActions.NAME_INPUT: {
      return { ...state, apiName: action.payload };
    }
    case homePageActions.URL_INPUT: {
      return { ...state, apiUrl: action.payload };
    }
    case homePageActions.IMAGE_URL_INPUT: {
      return { ...state, apiImageUrl: action.payload };
    }
    case homePageActions.DESCRIPTION_INPUT: {
      return { ...state, apiDescription: action.payload };
    }
    case homePageActions.LOAD: {
      return { ...state, loading: 'load' };
    }
    case homePageActions.SUBMIT: {
      return { ...state, loading: 'submit' };
    }
    case homePageActions.NEW_DATA: {
      return { ...state, loading: 'idle', apiData: action.payload };
    }
    case homePageActions.EXIT: {
      return {
        ...state,
        visible: false,
        apiName: '',
        apiUrl: '',
        apiDescription: '',
        apiImageUrl: '',
      };
    }
    default:
      return state;
  }
};
