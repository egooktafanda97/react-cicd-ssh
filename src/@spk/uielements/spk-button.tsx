import { Fragment } from 'react'

const SpkButton = ({ children, variant, disabled, customClass, buttontype, Btnstyle, Themevalue, Currentpage, Steppercomplete, Decremenet, Copymarkup, Increment, Togglepassword, Size, Stepperskip, Stepperreset, StepperBack, Stepperfinish, onclickfunc, Steppernext, removeelement, Overlayoptions, Id, Expand, Label, Collapse, Controls, Overlay, Tab, Overlayclose, title }: any) => {
  return (
    <Fragment>
      <button type={buttontype} id={Id} aria-expanded={Expand} className={`ti-btn-${variant} ti-btn-wave ${customClass} ti-btn-${Size}`} disabled={disabled}
        data-hs-tab={Tab}
        onClick={onclickfunc} data-hs-remove-element={removeelement} aria-label={Label} data-hs-collapse={Collapse} aria-controls={Controls} data-hs-overlay={Overlay}
        data-hs-overlay-close={Overlayclose}
        data-hs-overlay-options={Overlayoptions}
        data-hs-stepper-back-btn={StepperBack}
        data-hs-stepper-next-btn={Steppernext}
        data-hs-stepper-finish-btn={Stepperfinish}
        data-hs-stepper-reset-btn={Stepperreset}
        data-hs-stepper-skip-btn={Stepperskip}
        data-hs-stepper-complete-step-btn={Steppercomplete}
        data-hs-toggle-password={Togglepassword}
        data-hs-input-number-decrement={Decremenet}
        data-hs-input-number-increment={Increment}
        data-hs-copy-markup={Copymarkup}
        data-hs-theme-click-value={Themevalue}
        aria-current={Currentpage}
        style={Btnstyle}
        title={title}
      >
        {children}
      </button>
    </Fragment>
  )
}

export default SpkButton

