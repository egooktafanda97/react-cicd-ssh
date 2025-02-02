import img2 from '../../../../assets/images/authentication/2.png';
import img3 from '../../../../assets/images/authentication/3.png';

const Coverdata = [
  { id: 1, src: img2 },
  { id: 2, src: img3 },
  { id: 3, src: img2 },
];

export const CoverSwiper = Coverdata.map((idx) => (
  <div>
    <div className='text-white text-center p-[3rem] pb-[2rem] flex items-center justify-center'>
      <div>
        <div className='mb-[3rem]'>
          <img src={idx.src} className='authentication-image' alt='' />
        </div>
        <h6 className='font-semibold text-[1rem]'>Verify Your Account</h6>
        <p className='font-normal text-[.875rem] opacity-[0.7]'>
          {' '}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa
          eligendi expedita aliquam quaerat nulla voluptas facilis. Porro rem
          voluptates possimus, ad, autem quae culpa architecto, quam labore
          blanditiis at ratione.
        </p>
      </div>
    </div>
  </div>
));

export const SignupSwiper = Coverdata.map((idx) => (
  <div>
    <div className='text-white text-center p-[3rem] pb-[2rem] flex items-center justify-center'>
      <div>
        <div className='mb-[3rem]'>
          <img src={idx.src} className='authentication-image' alt='' />
        </div>
        <h6 className='font-semibold text-[1rem]'>Sign Up</h6>
        <p className='font-normal text-[.875rem] opacity-[0.7]'>
          {' '}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa
          eligendi expedita aliquam quaerat nulla voluptas facilis. Porro rem
          voluptates possimus, ad, autem quae culpa architecto, quam labore
          blanditiis at ratione.
        </p>
      </div>
    </div>
  </div>
));

export const SigninSwiper = Coverdata.map((idx) => (
  <div>
    <div className='text-white text-center p-[3rem] pb-[2rem] flex items-center justify-center'>
      <div>
        <div className='mb-[3rem]'>
          <img src={idx.src} className='authentication-image' alt='' />
        </div>
        <h6 className='font-semibold text-[1rem]'>Sign In</h6>
        <p className='font-normal text-[.875rem] opacity-[0.7]'>
          {' '}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa
          eligendi expedita aliquam quaerat nulla voluptas facilis. Porro rem
          voluptates possimus, ad, autem quae culpa architecto, quam labore
          blanditiis at ratione.
        </p>
      </div>
    </div>
  </div>
));

export const ResetSwiper = Coverdata.map((idx) => (
  <div>
    <div className='text-white text-center p-[3rem] pb-[2rem] flex items-center justify-center'>
      <div>
        <div className='mb-[3rem]'>
          <img src={idx.src} className='authentication-image' alt='' />
        </div>
        <h6 className='font-semibold text-[1rem]'>Reset Password</h6>
        <p className='font-normal text-[.875rem] opacity-[0.7]'>
          {' '}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa
          eligendi expedita aliquam quaerat nulla voluptas facilis. Porro rem
          voluptates possimus, ad, autem quae culpa architecto, quam labore
          blanditiis at ratione.
        </p>
      </div>
    </div>
  </div>
));

export const LockSwiper = Coverdata.map((idx) => (
  <div>
    <div className='text-white text-center p-[3rem] pb-[2rem] flex items-center justify-center'>
      <div>
        <div className='mb-[3rem]'>
          <img src={idx.src} className='authentication-image' alt='' />
        </div>
        <h6 className='font-semibold text-[1rem]'>Lockscreen</h6>
        <p className='font-normal text-[.875rem] opacity-[0.7]'>
          {' '}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa
          eligendi expedita aliquam quaerat nulla voluptas facilis. Porro rem
          voluptates possimus, ad, autem quae culpa architecto, quam labore
          blanditiis at ratione.
        </p>
      </div>
    </div>
  </div>
));

export const CreateSwiper = Coverdata.map((idx) => (
  <div>
    <div className='text-white text-center p-[3rem] pb-[2rem] flex items-center justify-center'>
      <div>
        <div className='mb-[3rem]'>
          <img src={idx.src} className='authentication-image' alt='' />
        </div>
        <h6 className='font-semibold text-[1rem]'>Create Password</h6>
        <p className='font-normal text-[0.875rem] opacity-[0.7]'>
          {' '}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa
          eligendi expedita aliquam quaerat nulla voluptas facilis. Porro rem
          voluptates possimus, ad, autem quae culpa architecto, quam labore
          blanditiis at ratione.
        </p>
      </div>
    </div>
  </div>
));
