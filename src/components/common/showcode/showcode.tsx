import React, { useState, useRef } from 'react';
import SpkButton from '../../../@spk/uielements/spk-button';
import { Link } from 'react-router-dom';

const Showcode = ({
  title,
  reactCode,
  dataCode,
  reusableCode,
  children,
  customCardClass,
  customCardHeaderClass,
  customCardBodyClass,
  customCardFooterClass,
}: any) => {
  const [showCode, setShowCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'react' | 'data' | 'reusable'>('react'); // Default to 'react' tab
  const randomValueRef: any = useRef(`reference${Math.ceil(Math.random() * 999)}`);

  const toggleCode = () => {
    setShowCode(!showCode);
  };

  const handleTabChange = (tab: 'react' | 'data' | 'reusable') => {
    setActiveTab(tab);
  };

  const shouldShowDataTab = !!dataCode;
  // const _shouldShowReusableTab = !!reusableCode;

  return (
    <div className={`box ${customCardClass}`}>
      <div className={`box-header justify-content-between ${customCardHeaderClass}`}>
        <div className="box-title" dangerouslySetInnerHTML={{ __html: title }}></div>
        <div className="prism-toggle">
          <SpkButton
            buttontype="button"
            variant="primary"
            customClass="ti-btn !py-1 !px-2 !text-[0.75rem] !font-medium"
            onclickfunc={toggleCode}
          >
            {showCode ? 'Hide Code' : 'Show Code'}
            <i
              className={`${showCode ? 'ri-code-s-slash-line' : 'ri-code-line'} ms-2 align-middle inline-block`}
            ></i>
          </SpkButton>
        </div>
      </div>
      <div
        ref={randomValueRef}
        className={`box-body ${customCardBodyClass}`}
        style={{ display: showCode ? 'none' : 'block' }}
      >
        {React.Children.map(children, (child) => React.cloneElement(child))}
      </div>
      {showCode && (
        <div className={`box-footer !border-t-0 ${customCardFooterClass}`} style={{ display: showCode ? 'block' : 'none' }}>
          {/* Tabs */}
          <nav className="-mb-0.5 flex space-x-6 rtl:space-x-reverse" role='tablist'>
            <Link to="#" 
              id="underline-item-1" data-hs-tab="#underline-1" aria-controls="underline-1"
              className={`hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  dark:text-[#8c9097] dark:text-white/50 hover:text-primary  ${activeTab === 'react' ? 'active' : ''}`}
              onClick={() => handleTabChange('react')}
            >
              React
            </Link>
            {shouldShowDataTab && (
              <Link to="#"
                id="underline-item-2" data-hs-tab="#underline-2" aria-controls="underline-2"
                className={`hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  dark:text-[#8c9097] dark:text-white/50 hover:text-primary ${activeTab === 'data' ? 'active' : ''}`}
                onClick={() => handleTabChange('data')}
              >
                Data
              </Link>
            )}
            {reusableCode && (
              <Link to="#"
                id="underline-item-3" data-hs-tab="#underline-3" aria-controls="underline-3"
                className={`hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  dark:text-[#8c9097] dark:text-white/50 hover:text-primary ${activeTab === 'reusable' ? 'active' : ''}`}
                onClick={() => handleTabChange('reusable')}
              >
                Reusable Code
              </Link>
            )}
          </nav>
          {/* Code display */}
          <pre className="language-html">
            <code className="language-html">
              {activeTab === 'react'
                ? 
                <div id="underline-1" role="tabpanel" aria-labelledby="underline-item-1">
                     {reactCode}
                 </div>
                : activeTab === 'data'
                ? 
                <div id="underline-2" role="tabpanel" aria-labelledby="underline-item-2">
                {dataCode}
                </div>
                : activeTab === 'reusable'
                ? 
                  <div id="underline-3" role="tabpanel" aria-labelledby="underline-item-3">
                  {reusableCode}
                 </div>
                : null}
            </code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default Showcode;
