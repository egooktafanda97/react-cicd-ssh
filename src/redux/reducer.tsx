

import img1 from "../assets/images/ecommerce/png/1.png";
import ecommerceimg1 from "../assets/images/ecommerce/png/1-1.png";
import ecommerceimg2 from "../assets/images/ecommerce/png/1-2.png";
import ecommerceimg3 from "../assets/images/ecommerce/png/1-3.png";
import img2 from "../assets/images/ecommerce/png/2.png";
import img21 from "../assets/images/ecommerce/png/2-1.png";
import img22 from "../assets/images/ecommerce/png/2-2.png";
import img23 from "../assets/images/ecommerce/png/2-3.png";
import img3 from "../assets/images/ecommerce/png/3.png";
import img31 from "../assets/images/ecommerce/png/3-1.png";
import img32 from "../assets/images/ecommerce/png/3-2.png";
import img33 from "../assets/images/ecommerce/png/3-3.png";
import img4 from "../assets/images/ecommerce/png/4.png";
import img41 from "../assets/images/ecommerce/png/4-1.png";
import img42 from "../assets/images/ecommerce/png/4-2.png";
import img43 from "../assets/images/ecommerce/png/4-3.png";
import img5 from "../assets/images/ecommerce/png/5.png";
import img51 from "../assets/images/ecommerce/png/5-1.png";
import img52 from "../assets/images/ecommerce/png/5-2.png";
import img53 from "../assets/images/ecommerce/png/5-3.png";
import img6 from "../assets/images/ecommerce/png/6.png";
import img61 from "../assets/images/ecommerce/png/6-1.png";
import img62 from "../assets/images/ecommerce/png/6-2.png";
import img63 from "../assets/images/ecommerce/png/6-3.png";
import img7 from "../assets/images/ecommerce/png/7.png";
import img71 from "../assets/images/ecommerce/png/7-1.png";
import img72 from "../assets/images/ecommerce/png/7-2.png";
import img73 from "../assets/images/ecommerce/png/7-3.png";
import img8 from "../assets/images/ecommerce/png/8.png";
import img81 from "../assets/images/ecommerce/png/8-1.png";
import img82 from "../assets/images/ecommerce/png/8-2.png";
import img83 from "../assets/images/ecommerce/png/8-3.png";
import img9 from "../assets/images/ecommerce/png/9.png";
import img91 from "../assets/images/ecommerce/png/9-1.png";
import img92 from "../assets/images/ecommerce/png/9-2.png";
import img93 from "../assets/images/ecommerce/png/9-3.png";
import img10 from "../assets/images/ecommerce/png/10.png";
import img101 from "../assets/images/ecommerce/png/10-1.png";
import img102 from "../assets/images/ecommerce/png/10-2.png";
import img103 from "../assets/images/ecommerce/png/10-3.png";
import img11 from "../assets/images/ecommerce/png/11.png";
import img111 from "../assets/images/ecommerce/png/11-1.png";
import img112 from "../assets/images/ecommerce/png/11-2.png";
import img113 from "../assets/images/ecommerce/png/11-3.png";
import img12 from "../assets/images/ecommerce/png/12.png";
import img121 from "../assets/images/ecommerce/png/12-1.png";
import img122 from "../assets/images/ecommerce/png/12-2.png";
import img123 from "../assets/images/ecommerce/png/12-3.png";

let initialState = {
   lang: "en",
   dir: "ltr",
   class: "light",
   dataMenuStyles: "dark",
   dataNavLayout: "vertical",
   dataHeaderStyles: "light",
   dataVerticalStyle: "overlay",
   dataToggled: "",
   dataNavStyle: "",
   horStyle: "",
   dataPageStyle: "regular",
   dataWidth: "fullwidth",
   dataMenuPosition: "fixed",
   dataHeaderPosition: "fixed",
   loader: "disable",
   iconOverlay: "",
   colorPrimaryRgb: "",
   colorPrimary: "",
   bodyBg: "",
   Light: "",
   darkBg: "",
   inputBorder: "",
   bgImg: "",
   iconText: "",
   body: "",
   permissions: {},
   auth: {
      token: null,
      user: null,
   },
   ecommercedata: [
      {
         id: '1',
         preview: img1,
         title: 'Dapzem & Co',
         description: 'Branded hoodie ethnic style',
         oldpr: '$229',
         newpr: '$1,799',
         offerprice: '$229',
         quantity: 1,
         images: [
            { 'img': img1 },
            { 'img': ecommerceimg1 },
            { 'img': ecommerceimg2 },
            { 'img': ecommerceimg3 }],
      },
      {
         id: '2',
         preview: img2,
         title: 'Denim Winjo',
         description: 'Vintage pure leather Jacket',
         oldpr: '$599',
         newpr: '$2,499',
         offerprice: '$599',
         quantity: 2,
         images: [
            { 'img': img2 },
            { 'img': img21 },
            { 'img': img22 },
            { 'img': img23 }],
         ribbon: '',
      },
      {
         id: '3',
         preview: img3,
         title: 'Jimmy Lolfiger',
         description: 'Unisex jacket for men & women',
         oldpr: '$1,199',
         newpr: '$3,299',
         offerprice: '$1,199',
         quantity: 1,
         images: [
            { 'img': img3 },
            { 'img': img31 },
            { 'img': img32 },
            { 'img': img33 }],
         ribbon: '',
      },
      {
         id: '4',
         preview: img4,
         title: 'Bluberry Co.In',
         description: 'Full sleeve white hoodie',
         oldpr: '$349',
         newpr: '$1,299',
         offerprice: '$349',
         quantity: 1,
         images: [
            { "img": img4 },
            { "img": img41 },
            { "img": img42 },
            { "img": img43 },],
         ribbon: '',
      },
      {
         id: '5',
         preview: img5,
         title: 'Aus Polo Assn',
         description: 'Snow jacket with low pockets',
         oldpr: '$1,899',
         newpr: '$3,799',
         offerprice: '$1,899',
         quantity: 1,
         images: [
            { 'img': img5 },
            { 'img': img51 },
            { 'img': img52 },
            { 'img': img53 }],
      },
      {
         id: '6',
         preview: img6,
         title: 'BMW',
         description: 'Ethnic wear jackets form BMW',
         oldpr: '$1,499',
         newpr: '$2,499',
         offerprice: '$1,499',
         quantity: 1,
         images: [
            { 'img': img6 },
            { 'img': img61 },
            { 'img': img62 },
            { 'img': img63 }],
      },
      {
         id: '7',
         preview: img7,
         title: 'Denim Corporation',
         description: 'Flap pockets denim jackets for men',
         oldpr: '$299',
         newpr: '$399',
         offerprice: '$299',
         quantity: 1,
         images: [
            { 'img': img7 },
            { 'img': img71 },
            { 'img': img72 },
            { 'img': img73 }],
         ribbon: '',
      },
      {
         id: '8',
         preview: img8,
         title: 'Pufa',
         description: 'Ergonic designed full sleeve coat',
         oldpr: '$2,399',
         newpr: '$5,699',
         offerprice: '$2,399',
         quantity: 1,
         images: [
            { 'img': img8 },
            { 'img': img81 },
            { 'img': img82 },
            { 'img': img83 }],
         ribbon: '',
      },
      {
         id: '9',
         preview: img9,
         title: 'Louie Phillippe',
         description: 'Ergonic green colored full sleeve jacket',
         oldpr: '$1,899',
         newpr: '$3,299',
         offerprice: '$1,899',
         quantity: 1,
         images: [
            { 'img': img9 },
            { 'img': img91 },
            { 'img': img92 },
            { 'img': img93 }],
      },

      {
         id: '10',
         preview: img10,
         title: 'Denim Corp',
         description: 'beautiful brown colored snow jacket',
         oldpr: '$2,499',
         newpr: '$4,999',
         offerprice: '$499',
         quantity: 1,
         images: [
            { 'img': img10 },
            { 'img': img101 },
            { 'img': img102 },
            { 'img': img103 }],
      },

      {
         id: '11',
         preview: img11,
         title: 'Garage & Co',
         description: 'Full sleeve sweat shirt',
         oldpr: '$249',
         newpr: '$1,299',
         offerprice: '$249',
         quantity: 1,
         images: [
            { 'img': img11 },
            { 'img': img111 },
            { 'img': img112 },
            { 'img': img113 }],
      },
      {
         id: '12',
         preview: img12,
         title: 'Blueberry & Co',
         description: 'Light colored sweater form blueberry',
         oldpr: '$499',
         newpr: '$799',
         offerprice: '$499',
         quantity: 1,
         images: [
            { 'img': img12 },
            { 'img': img121 },
            { 'img': img122 },
            { 'img': img123 }],
      },
   ],
   conterWrapper: {

   }
};

export default function reducer(state = initialState, action: any) {
   let { type, payload } = action;
   switch (type) {
      case "ThemeChanger":
         state = payload
         return state
         break;
      case "ChangeContainerWrapper":
         state = {
            ...state,
            conterWrapper: payload,
         };
         return state;
         break;
      case "Auth":
         state = {
            ...state,
            auth: payload,
         };
         return state;
         break;
      case "PERMISSION-ACTOR":
         state = {
            ...state,
            permissions: payload,
         };
         return state;
         break;
      default:
         return state;
   }
}

