
import { Fragment, useContext, useEffect } from "react";
import { connect } from "react-redux";
import Themeprimarycolor, * as landingswitcherdata from "../../ui/data/switcherdata/landingswitcherdata";
import { ThemeChanger } from "../../../redux/action";
import store from "../../../redux/store";
import SpkButton from "../../../@spk/uielements/spk-button";
import { Initialload } from "../contextapi";

const Landingswitcher = ({ local_varaiable, ThemeChanger }: any) => {

  const theme: any = useContext(Initialload);

  useEffect(() => {
    landingswitcherdata.LocalStorageBackup1(ThemeChanger, theme.setpageloading)
  }, [])

  useEffect(() => {
    const theme = store.getState();
    ThemeChanger({
      ...theme,
      "dataNavStyle": "menu-click",
      "dataNavLayout": "horizontal",
      "dataMenuStyles": "dark"
    });
    return () => {
      ThemeChanger({
        ...theme,
        "dataNavStyle": "",
        "dataNavLayout": `${localStorage.ynexlayout == "horizontal" ? "horizontal" : "vertical"}`
      });
    };
  }, []);

  return (
    <Fragment>
      <div id="hs-overlay-switcher" className="hs-overlay hidden ti-offcanvas ti-offcanvas-right" tabIndex={-1}>
        <div className="ti-offcanvas-header">
          <h3 className="ti-offcanvas-title">
            Switcher
          </h3>
          <SpkButton buttontype="button"
            customClass="ti-btn flex-shrink-0 p-0 transition-none text-gray-500 hover:text-gray-700 focus:ring-gray-400 focus:ring-offset-white dark:text-white/70 dark:hover:text-white/80 dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
            Overlay="#hs-overlay-switcher">
            <span className="sr-only">Close modal</span>
            <i className="ri-close-circle-line leading-none text-lg"></i>
          </SpkButton>
        </div>
        <div className="ti-offcanvas-body !px-0" id="switcher-body">
          <div className="">
            <div className="">
              <p className="switcher-style-head">Theme Color Mode:</p>
              <div className="grid grid-cols-3 switcher-style">
                <div className="flex items-center">
                  <input type="radio" name="theme-style" className="ti-form-radio" id="switcher-light-theme" checked={local_varaiable.class != "dark"} onChange={_e => { }}
                    onClick={() => landingswitcherdata.Light(ThemeChanger)} />
                  <label htmlFor="switcher-light-theme"
                    className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Light</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="theme-style" className="ti-form-radio" id="switcher-dark-theme" checked={local_varaiable.class == "dark"} onChange={_e => { }}
                    onClick={() => landingswitcherdata.Dark(ThemeChanger)} />
                  <label htmlFor="switcher-dark-theme"
                    className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Dark</label>
                </div>
              </div>
            </div>
            <div>
              <p className="switcher-style-head">Directions:</p>
              <div className="grid grid-cols-3  switcher-style">
                <div className="flex items-center">
                  <input type="radio" name="direction" className="ti-form-radio" id="switcher-ltr" checked={local_varaiable.dir == "ltr"} onChange={_e => { }}
                    onClick={() => { landingswitcherdata.Ltr(ThemeChanger); }} />
                  <label htmlFor="switcher-ltr" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">LTR</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="direction" className="ti-form-radio" id="switcher-rtl" checked={local_varaiable.dir == "rtl"} onChange={_e => { }}
                    onClick={() => { landingswitcherdata.Rtl(ThemeChanger); }} />
                  <label htmlFor="switcher-rtl" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">RTL</label>
                </div>
              </div>
            </div>
            <div className="theme-colors">
              <p className="switcher-style-head">Theme Primary:</p>
              <div className="flex switcher-style space-x-3 rtl:space-x-reverse">
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-primary-1" type="radio" name="theme-primary"
                    id="switcher-primary" defaultChecked onClick={() => landingswitcherdata.primaryColor1(ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-primary-2" type="radio" name="theme-primary"
                    id="switcher-primary1" onClick={() => landingswitcherdata.primaryColor2(ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-primary-3" type="radio" name="theme-primary"
                    id="switcher-primary2" onClick={() => landingswitcherdata.primaryColor3(ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-primary-4" type="radio" name="theme-primary"
                    id="switcher-primary3" onClick={() => landingswitcherdata.primaryColor4(ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-primary-5" type="radio" name="theme-primary"
                    id="switcher-primary4" onClick={() => landingswitcherdata.primaryColor5(ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select ps-0 mt-1 color-primary-light">
                  <div className='theme-container-primary'>
                    <SpkButton customClass="">nano</SpkButton>
                  </div>
                  <div className='pickr-container-primary'>
                    <div className='pickr'>
                      <SpkButton customClass='pcr-button' onclickfunc={(ele: any) => {
                        if (ele.target.querySelector("input")) {
                          ele.target.querySelector("input").click();
                        }
                      }}>
                        <Themeprimarycolor theme={local_varaiable} actionfunction={ThemeChanger} />
                      </SpkButton>

                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="ti-offcanvas-footer sm:flex justify-between">
          <a href="#" id="reset-all" onClick={() => landingswitcherdata.LandingpageReset(ThemeChanger)} className="w-full ti-btn ti-btn-danger-full m-1">Reset</a>
        </div>
      </div>


    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  local_varaiable: state
});

export default connect(mapStateToProps, { ThemeChanger })(Landingswitcher);
