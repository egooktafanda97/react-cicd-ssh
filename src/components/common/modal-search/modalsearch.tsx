
import  { FC, useEffect, useState } from "react";
import { MenuItems } from "../sidebar/nav";
import { Link } from "react-router-dom";
import SpkDropdown from "../../../@spk/uielements/spk-dropdown";
import SpkButton from "../../../@spk/uielements/spk-button";

interface ModalsearchProps {}

const Modalsearch: FC<ModalsearchProps> = () => { 
  //Search functionality
  const [_show, setShow] = useState("false");

  const handleClose = () => setShow("false");
  // const handleShow = () => setShow("false");

  const [show1, setShow1] = useState<any>("false");
  const [InputValue, setInputValue] = useState("");
  const [show2, setShow2] = useState<any>("false");
  const [searchcolor, setsearchcolor] = useState("text-dark");
  const [searchval, setsearchval] = useState("Type something");
  const [NavData, setNavData] = useState([]);

  useEffect(() => {
    const clickHandler = (_event:any) => {
      const searchResult = document.querySelector(".search-result");
      if (searchResult) {
        searchResult.classList.add("hidden");
      }
    };

    document.addEventListener("click", clickHandler);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("click", clickHandler);
    };
  }, []);

  const myfunction = (inputvalue: string) => {
    document.querySelector(".search-result")?.classList.remove("hidden");

    const i :any= [];
    const allElement2:any = [];
		MenuItems.forEach((mainLevel:any) => {
			if (mainLevel.children) {
				setShow1(true);
				mainLevel.children.forEach((subLevel:any) => {
					i.push(subLevel);
					if (subLevel.children) {
						subLevel.children.forEach((subLevel1:any) => {
							i.push(subLevel1);
							if (subLevel1.children) {
								subLevel1.children.forEach((subLevel2:any) => {
									i.push(subLevel2);
								});
							}
						});
					}
				});
			}
		});
		for (const allElement of i) {
			if (allElement.title.toLowerCase().includes(inputvalue.toLowerCase())) {
				if (allElement.title.toLowerCase().startsWith(inputvalue.toLowerCase())) {
					setShow2(true);

					// Check if the element has a path and doesn't already exist in allElement2 before pushing
					if (allElement.path && !allElement2.some((el:any) => el.title === allElement.title)) {
						allElement2.push(allElement);
					}
				}
			}
		}

		if (!allElement2.length || inputvalue === "") {
			if (inputvalue === "") {
				setShow2(false);
				setsearchval("Type something");
				setsearchcolor("text-dark");
			}
			if (!allElement2.length) {
				setShow2(false);
				setsearchcolor("text-danger");
				setsearchval("There is no component with this name");
			}
		}
		setNavData(allElement2);

  };

  const tabsData = [
    {id:1, class:"People", icon:"user"},
    {id:2, class:"Pages", icon:"file-text"},
    {id:3, class:"Articales", icon:"align-left"},
    {id:4, class:"Tags", icon:"server"},

  ]

  const [allData, setAllData] = useState(tabsData);

  function handleRemove(id: number) {
      const newList = allData.filter((idx) => idx.id !== id);
      setAllData(newList);
  }
  
  return (
    <div id="search-modal" className="hs-overlay ti-modal hidden mt-[1.75rem]"  onClick={handleClose}>
    <div className="ti-modal-box">
      <div className="ti-modal-content !border !border-defaultborder dark:!border-defaultborder/10 !rounded-[0.5rem]">
        <div className="ti-modal-body">
  
          <div className="input-group border-[2px] border-primary rounded-[0.25rem] w-full flex">
            <a aria-label="anchor" href="#"
              className="input-group-text flex items-center bg-light border-e-[#dee2e6] !py-[0.375rem] !px-[0.75rem] !rounded-none !text-[0.875rem]"
              id="Search-Grid"><i className="fe fe-search header-link-icon text-[0.875rem]"></i></a>
  
            <input type="search" className="form-control border-0 px-2 !text-[0.8rem] w-full focus:ring-transparent"
              placeholder="Search" aria-label="Username"
              defaultValue={InputValue}
              autoComplete="off"
              onChange={(ele) => {
                myfunction(ele.target.value);
                setInputValue(ele.target.value);
              }}/>
  
            <a aria-label="anchor" href="#"  className="!border-e-0 flex items-center input-group-text bg-light !py-[0.375rem] !px-[0.75rem]"  id="voice-search"><i className="fe fe-mic header-link-icon"></i></a>
            <SpkDropdown Icon={true} IconClass="fe fe-more-vertical" arialexpand={false} Linktag={true}  Custommenuclass="absolute !-mt-2 !p-0"
               Linkclass="flex items-center btn btn-light btn-icon !bg-light !py-[0.375rem] !rounded-none !px-[0.75rem] text-[0.95rem] h-[2.413rem] w-[2.313rem]">
               <li><a
                    className="ti-dropdown-item flex text-defaulttextcolor dark:text-defaulttextcolor/70 !py-[0.5rem] !px-[0.9375rem] !text-[0.8125rem] font-medium"
                    href="#">Action</a></li>
                <li><a
                    className="ti-dropdown-item flex text-defaulttextcolor dark:text-defaulttextcolor/70 !py-[0.5rem] !px-[0.9375rem] !text-[0.8125rem] font-medium"
                    href="#">Another action</a></li>
                <li><a
                    className="ti-dropdown-item flex text-defaulttextcolor dark:text-defaulttextcolor/70 !py-[0.5rem] !px-[0.9375rem] !text-[0.8125rem] font-medium"
                    href="#">Something else here</a></li>
                <li>
                  <hr className="dropdown-divider"/>
                </li>
                <li><a
                    className="ti-dropdown-item flex text-defaulttextcolor dark:text-defaulttextcolor/70 !py-[0.5rem] !px-[0.9375rem] !text-[0.8125rem] font-medium"
                    href="#">Separated link</a></li>
            </SpkDropdown>
          </div>
          {show1 ? (
              <div className="box search-result relative z-[9] search-fix  border border-gray-200 dark:border-white/10 mt-1 w-100">
                <div className="box-header">
                  <h6 className="box-title me-2 text-break">
                    Search result of {InputValue}
                  </h6>
                </div>
                <div className="box-body p-2 flex flex-col max-h-[250px] overflow-auto">
                  {show2 ? (
                    NavData.map((e:any) => (
                      <div
                        key={Math.random()}
                        className="ti-list-group gap-x-3.5 text-gray-800 dark:bg-bgdark dark:border-white/10 dark:text-white"
                      >
                        <Link
                          to={`${e.path}/`}
                          className="search-result-item"
                          onClick={() => {
                            setShow1("false")
                            setInputValue("");
                          }}
                        >
                          {e.title}
                        </Link>
                      </div>
                    ))
                  ) : (
                    <b className={`${searchcolor} `}>{searchval}</b>
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          <div className="mt-5">
            <p className="font-normal  text-[#8c9097] dark:text-white/50 text-[0.813rem] dark:text-gray-200 mb-2">Are You Looking For...</p>
  
            {allData.map((idx) => (
            <span  key={Math.random()}  className="search-tags text-[0.75rem] !py-[0rem] !px-[0.55rem] dark:border-defaultborder/10 me-2" ><i className={`fe fe-${idx.icon} me-2`}></i>{idx.class}<Link
            to="#"  onClick={() => handleRemove(idx.id)} className="tag-addon header-remove-btn"><span className="sr-only">Remove badge</span><i className="fe fe-x"></i></Link></span>
                ))}
  
          </div>
  
  
          <div className="my-[1.5rem]">
            <p className="font-normal  text-[#8c9097] dark:text-white/50 text-[0.813rem] mb-2">Recent Search :</p>
  
            <div id="dismiss-alert" role="alert"
              className="!p-2 border dark:border-defaultborder/10 rounded-[0.3125rem] flex items-center text-defaulttextcolor dark:text-defaulttextcolor/70 !mb-2 !text-[0.8125rem] alert">
              <Link to={`${import.meta.env.BASE_URL}pages/notifications/`}><span>Notifications</span></Link>
              <Link aria-label="anchor" className="ms-auto leading-none" to="#" data-hs-remove-element="#dismiss-alert"><i
                  className="fe fe-x !text-[0.8125rem] text-[#8c9097] dark:text-white/50"></i></Link>
            </div>
            <div id="dismiss-alert1" role="alert"
              className="!p-2 border dark:border-defaultborder/10 rounded-[0.3125rem] flex items-center text-defaulttextcolor dark:text-defaulttextcolor/70 !mb-2 !text-[0.8125rem] alert">
              <Link to={`${import.meta.env.BASE_URL}ui-elements/alerts/`}><span>Alerts</span></Link>
              <Link aria-label="anchor" className="ms-auto leading-none" to="#" data-hs-remove-element="#dismiss-alert1"><i
                  className="fe fe-x !text-[0.8125rem] text-[#8c9097] dark:text-white/50"></i></Link>
            </div>
  
            <div id="dismiss-alert2" role="alert"
              className="!p-2 border dark:border-defaultborder/10 rounded-[0.3125rem] flex items-center text-defaulttextcolor dark:text-defaulttextcolor/70 !mb-0 !text-[0.8125rem] alert">
              <Link to={`${import.meta.env.BASE_URL}pages/email/mail-app/`}><span>Mail</span></Link>
              <Link aria-label="anchor" className="ms-auto lh-1" to="#" data-hs-remove-element="#dismiss-alert2"><i
                  className="fe fe-x !text-[0.8125rem] text-[#8c9097] dark:text-white/50"></i></Link>
            </div>
          </div>
        </div>
  
        <div className="ti-modal-footer !py-[1rem] !px-[1.25rem]">
          <div className="inline-flex rounded-md  shadow-sm">
            <SpkButton buttontype="button"
              customClass="ti-btn-group !px-[0.75rem] !py-[0.45rem]  rounded-s-[0.25rem] !rounded-e-none ti-btn-primary !text-[0.75rem] dark:border-white/10">
              Search
            </SpkButton>
            <SpkButton buttontype="button"
              customClass="ti-btn-group  ti-btn-primary-full rounded-e-[0.25rem] dark:border-white/10 !text-[0.75rem] !rounded-s-none !px-[0.75rem] !py-[0.45rem]">
              Clear Recents
            </SpkButton>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Modalsearch;
