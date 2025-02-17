import { FC, Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SigninSwiper } from '@/components/ui/data/authentication/swipercoverdata';
import SwiperComponent from '@/@spk/spk-packages/swiper-component';
import SpkButton from '@/@spk/uielements/spk-button';
import AxiosService from '@/services/AxiosService';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import CookieUtils from '@/utils/CookieUtils';

import logo from '@/assets/images/logo/e-SAPA 400x128.png';
import { useDispatch } from 'react-redux';

interface CoverProps { }

const fetching: any = new AxiosService({
  headers: {
    'Content-Type': 'application/json',
  },
});

const SignIn: FC<CoverProps> = () => {
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const navigate = useNavigate();



  const searchParams = new URLSearchParams(window.location.search);

  const handleLogin = async () => {
    setLoading(true);
    setErrors({});
    try {
      const post = await fetching.post(
        `${import.meta.env.VITE_BASE_API}/auth`,
        data
      );
      const response: any = post?.data?.data ?? {};
      CookieUtils.setCookie('token', response?.token);
      CookieUtils.setCookie('user', JSON.stringify(response?.user));

      // add in local storage
      localStorage.setItem('token', response?.token);
      localStorage.setItem('user', JSON.stringify(response?.user));

      const redirectTo: string | null = searchParams.get('redirect');
      if (redirectTo) {
        try {
          const redirectUrl = new URL(redirectTo); // Parse URL untuk memvalidasi
          const token = CookieUtils.getCookie('token');

          // Tambahkan token sebagai query parameter
          redirectUrl.searchParams.set('token', token || '');

          // Redirect ke domain berbeda dengan token
          window.location.href = redirectUrl.toString();
        } catch (error) {
          console.error('Invalid redirect URL:', error);
        }
        return;
      }
      if (response?.token === CookieUtils.getCookie('token') || response?.token === localStorage.getItem('token')) {
        const path = `${import.meta.env.VITE_META_BASE_PATH}dashboard`;
        // navigate(path);
        window.location.href = path;
        setLoading(false);
      } else {
        setErrors({ message: 'An error occurred' });
      }
    } catch (apiError: any) {
      setLoading(false);
      const errorResponse = apiError?.data?.data || [];
      if (Array.isArray(errorResponse) && errorResponse.length > 0) {
        const errorMap = errorResponse.reduce((acc: any, error: any) => {
          acc[error.field] = error.message;
          return acc;
        }, {});
        setErrors(errorMap);
      } else {
        setErrors({ message: apiError?.data?.message || 'An error occurred' });
      }
    }
  };

  const hndelOnchangeLogin = (e: any) => {
    const { name, value } = e.target;
    setErrors((prev: any) => ({ ...prev, [name]: '' }));
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Fragment>
      <div className='grid grid-cols-12 authentication mx-0'>
        <div className='xxl:col-span-7 xl:col-span-7 lg:col-span-12 col-span-12 bg-white dark:!bg-bodybg'>
          <div className='grid grid-cols-12 items-center h-full'>
            <div className='xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-2'></div>
            <div className='xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-8 col-span-12'>
              <div className='p-[3rem]'>
                <div className='mb-4'>
                  <Link
                    aria-label='anchor'
                    to={`${import.meta.env.VITE_META_BASE_PATH}dashboards/crm/`}>
                    <img src={logo} alt='logo' className='w-40' />
                  </Link>
                </div>
                <p className='h5 font-semibold mb-2'>Sign In</p>
                <p className='mb-4 text-[#8c9097] dark:text-white/50 opacity-[0.7] font-normal'>
                  Hello!
                </p>

                {/* <div className='text-center my-[3rem] authentication-barrier'>
                  <span>-</span>
                </div> */}
                {errors.message && (
                  <AlertDanger
                    message={errors?.message}
                    onClose={() => setErrors({})}
                  />
                )}
                <div className='grid grid-cols-12 gap-y-4'>
                  <div className='xl:col-span-12 col-span-12 mt-0'>
                    <label
                      htmlFor='signin-username'
                      className='form-label text-default'>
                      User Name
                    </label>
                    <input
                      type='text'
                      name='username'
                      onChange={hndelOnchangeLogin}
                      className={`form-control form-control-lg w-full !rounded-md ${errors?.username
                        ? '!border-danger focus:border-danger focus:ring-danger'
                        : 'focus:!border-primary focus:ring-primary'
                        }`}
                      id='signin-username'
                      placeholder='User name'
                    />
                    {errors?.username && (
                      <p className='text-sm text-red-400 mt-2'>
                        {errors.username}
                      </p>
                    )}
                  </div>

                  <div className='xl:col-span-12 col-span-12'>
                    <label
                      htmlFor='signin-password'
                      className='form-label text-default block'>
                      Password
                      <Link
                        to={`$${import.meta.env.VITE_META_BASE_PATH
                          }authentication/reset-password/reset-cover`}
                        className='ltr:float-right rtl:float-left text-danger'>
                        Forget password?
                      </Link>
                    </label>
                    <div className='input-group'>
                      <input
                        type={passwordShow ? 'text' : 'password'}
                        name='password'
                        onChange={hndelOnchangeLogin}
                        className={`form-control form-control-lg !border-s !rounded-e-none ${errors?.password
                          ? '!border-danger focus:border-danger focus:ring-danger'
                          : ''
                          }`}
                        id='signin-password'
                        placeholder='Password'
                      />

                      <SpkButton
                        Label='button'
                        buttontype='button'
                        variant='light'
                        customClass='ti-btn !rounded-s-none !mb-0'
                        onclickfunc={() => setPasswordShow(!passwordShow)}
                        Id='button-addon2'>
                        <i
                          className={`${passwordShow ? 'ri-eye-line' : 'ri-eye-off-line'
                            } align-middle`}></i>
                      </SpkButton>
                    </div>
                    {errors?.password && (
                      <p className='text-sm text-red-400 mt-2'>
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <div className='xl:col-span-12 col-span-12 grid'>
                    <button
                      onClick={handleLogin}
                      disabled={loading}
                      className='ti-btn ti-btn-lg bg-primary text-white !font-medium dark:border-defaultborder/10'>
                      {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                  </div>
                </div>
                <div className='text-center'>
                  <p className='text-[0.75rem] text-[#8c9097] dark:text-white/50 mt-4'>
                    Don’t have an account?{' '}
                    <Link
                      to={`$${import.meta.env.VITE_META_BASE_PATH
                        }authentication/sign-up/signup-cover`}
                      className='text-primary'>
                      Sign Up
                    </Link>
                  </p>
                </div>
                {/* -- */}
              </div>
            </div>
            <div className='xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-2'></div>
          </div>
        </div>
        <div className='xxl:col-span-5 xl:col-span-5 lg:col-span-5 col-span-12 xl:block hidden px-0'>
          <div className='authentication-cover'>
            <div className='aunthentication-cover-content rounded'>
              <div className='swiper keyboard-control'>
                <SwiperComponent
                  slides={SigninSwiper}
                  spaceBetween={30}
                  navigation={true}
                  centeredSlides={true}
                  autoplay={true}
                  pagination={true}
                  className='mySwiper'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SignIn;

const AlertDanger = ({ message }: any) => {
  return (
    <div
      role='alert'
      className='alert alert-danger alert-dismissible !bg-red-100 dark:!bg-bodybg fade show custom-alert-icon shadow-sm flex items-center'>
      <AiOutlineCloseCircle className='h-5 w-5 text-danger me-2' />
      {/* Icon displayed */}
      <div>
        <p className='m-0 text-danger'>
          {message || 'An error occurred. Please try again.'}
        </p>
      </div>
    </div>
  );
};
