
export const ThemeChanger = (value: any) => async (dispatch: any) => {
  dispatch({
    type: "ThemeChanger",
    payload: value,
  });

};
export const AddToCart = (id: string) => async (dispatch: (arg0: { type: string; payload: string; }) => void) => {
  dispatch({
    type: "ADD_TO_CART",
    payload: id
  });
};
export const ProductReduxData = (id: any) => {
  return async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
    dispatch({
      type: "PRODUCT",
      payload: id
    });
  };
}
export const ChangeContainerWrapper = (value: any) => {
  return {
    type: "ChangeContainerWrapper",
    payload: value
  };
};

export const Auth = (value: any) => {
  return {
    type: "Auth",
    payload: value
  };
};


export const PermissionsActor = (value: any) => {
  return {
    type: "PERMISSION-ACTOR",
    payload: value
  };
};



