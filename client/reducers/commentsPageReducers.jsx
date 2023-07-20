export const commentsActions = {
  OPEN_OVERLAY: 'OPEN_OVERLAY',
  EXIT_OVERLAY: 'EXIT_OVERLAY',
  EXPAND_ACCORDION: 'EXPAND_ACCORDION',
  FORM_INPUT: 'FORM_INPUT', // types of form input are title, lang, contentEntry, image file
  SUBMIT_FORM: 'SUBMIT_FORM',
  LOAD_PAGE: 'LOAD_PAGE',
  NEW_TECH_DATA: 'NEW_TECH_DATA',
  NEW_POSTS_DATA: 'NEW_POSTS_DATA',
};

export const commentsPageStateInit = {
  tech: {
    name: '',
    link: '',
    description: '',
    image_url: '',
  },
  form: {
    visible: false,
    title: '',
    language: '',
    editor: '',
    imageFile: null,
  },
  comments: [],
  accordianIndexExpanded: null,
  loading: 'idle',
};

export const commentsPageReducer = (state, action) => {
  switch (action.type) {
    case commentsActions.OPEN_OVERLAY: {
      const form = { ...state.form };
      form.visible = true;
      return { ...state, form };
    }
    case commentsActions.EXIT_OVERLAY: {
      return {
        ...state,
        form: { ...commentsPageStateInit.form },
      };
    }
    case commentsActions.EXPAND_ACCORDION: {
      const accordianIndexExpanded =
        action.payload === state.accordianIndexExpanded ? null : action.payload;
      return { ...state, accordianIndexExpanded };
    }
    case commentsActions.FORM_INPUT: {
      const { formVar, input } = action.payload;
      const newState = { ...state };
      newState.form[formVar] = input;
      return newState;
    }
    case commentsActions.SUBMIT_FORM: {
      return { ...state, loading: 'submit_form' };
    }
    case commentsActions.LOAD_PAGE: {
      return { ...state, loading: 'load_page' };
    }
    case commentsActions.NEW_TECH_DATA: {
      // happens on initial page load
      const tech = action.payload || state.tech;
      return {
        ...state,
        loading: 'idle',
        tech,
        form: { ...commentsPageStateInit.form },
      };
    }
    case commentsActions.NEW_POSTS_DATA: {
      // happens on initial page load AND successful post submission
      const comments = action.payload || state.comments.slice();

      return {
        ...state,
        loading: 'idle',
        comments,
        form: { ...commentsPageStateInit.form },
      };
    }
    default:
      return state;
  }
};
