import React, { Fragment, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import SideBarItems from './SideBarItems';
import eventBus from '../Grid/eventBus';

const SideBar = (props, fabricRef) => {
  const [showSideBar, setShowSideBar] = useState(true);
  const setSideBar = () => {
    eventBus.dispatch('setSideBarValue', { message: '' });
  };

  return (
    <Fragment>
      <div className='flex flex-col items-center justify-center absolute left-0 top-0 h-screen w-[25vw]'>
        {!showSideBar ? (
          <button
            className='flex text-5xl absolute top-5 left-3 text-[#1E1E22] items-center cursor-pointer'
            onClick={() => {
              setShowSideBar((prev) => !prev);
              setSideBar();
            }}
          >
            <FaBars size={40} />
          </button>
        ) : null}
        <div
          className={`sidebar fixed top-0 left-0 w-[20vw] bg-[#f9d63a]	 text-white h-full p-5 ease-in-out duration-100 ${
            showSideBar ? 'translate-x-0' : 'translate-x-[-100%]'
          }`}
        >
          <SideBarItems
            fabricRef={fabricRef}
            showSideBar={showSideBar}
            setShowSideBar={setShowSideBar}
          />
        </div>
      </div>
    </Fragment>
  );
};

const SideBarWithforwardedRef = React.forwardRef(SideBar);
export default SideBarWithforwardedRef;
