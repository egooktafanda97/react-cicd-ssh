import  { Fragment } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

// Create a memoized selector
const selectRelevantState = createSelector(
  (state) => state, // Input selector
  (state:any) => ({
    dir: state.dir,
    class: state.class,
    dataHeaderStyles: state.dataHeaderStyles,
    dataVerticalStyle: state.dataVerticalStyle,
    dataNavLayout: state.dataNavLayout,
    dataMenuStyles: state.dataMenuStyles,
    dataToggled: state.dataToggled,
    dataNavStyle: state.dataNavStyle,
    horStyle: state.horStyle,
    dataPageStyle: state.dataPageStyle,
    dataWidth: state.dataWidth,
    dataMenuPosition: state.dataMenuPosition,
    dataHeaderPosition: state.dataHeaderPosition,
    iconOverlay: state.iconOverlay,
    bgImg: state.bgImg,
    iconText: state.iconText,
    colorPrimaryRgb: state.colorPrimaryRgb,
    colorPrimary: state.colorPrimary,
    darkBg: state.darkBg,
    bodyBg: state.bodyBg,
    inputBorder: state.inputBorder,
    Light: state.Light,
    body: state.body.class, // Select body class dynamically
  })
);

function RootWrapper({ children }:any) {
  // Use the memoized selector
  const local_variable = useSelector(selectRelevantState);

  // Generate dynamic styles as CSS variables
  const customStyles = `
    ${local_variable.colorPrimaryRgb ? `--primary-rgb: ${local_variable.colorPrimaryRgb};` : ""}
    ${local_variable.colorPrimary ? `--primary: ${local_variable.colorPrimary};` : ""}
    ${local_variable.darkBg ? `--dark-bg: ${local_variable.darkBg};` : ""}
    ${local_variable.bodyBg ? `--body-bg: ${local_variable.bodyBg};` : ""}
    ${local_variable.inputBorder ? `--input-border: ${local_variable.inputBorder};` : ""}
    ${local_variable.Light ? `--light: ${local_variable.Light};` : ""}
  `;

  return (
    <Fragment>
      <HelmetProvider>
        <Helmet>
          <html
            dir={local_variable.dir}
            className={local_variable.class}
            data-header-styles={local_variable.dataHeaderStyles}
            data-vertical-style={local_variable.dataVerticalStyle}
            data-nav-layout={local_variable.dataNavLayout}
            data-menu-styles={local_variable.dataMenuStyles}
            data-toggled={local_variable.dataToggled}
            data-nav-style={local_variable.dataNavStyle}
            hor-style={local_variable.horStyle}
            data-page-style={local_variable.dataPageStyle}
            data-width={local_variable.dataWidth}
            data-menu-position={local_variable.dataMenuPosition}
            data-header-position={local_variable.dataHeaderPosition}
            data-icon-overlay={local_variable.iconOverlay}
            bg-img={local_variable.bgImg}
            icon-text={local_variable.iconText}
          />
          <body
            className={`${local_variable.body ? local_variable.body : ""}`}
          />
          <style>{`:root { ${customStyles} }`}</style>
        </Helmet>
        {children}
      </HelmetProvider>
    </Fragment>
  );
}

export default RootWrapper;
