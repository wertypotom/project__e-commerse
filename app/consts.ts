import { FormControlFields, Options } from '@/types/input';
import { NavOptions } from '@/types/navigation';

export const NAV_OPTIONS: NavOptions[] = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
  },
  {
    id: 'listing',
    label: 'All Products',
    path: '/product/listing/all-products',
  },
  {
    id: 'listingMen',
    label: 'Men',
    path: '/product/listing/men',
  },
  {
    id: 'listingWomen',
    label: 'Women',
    path: '/product/listing/women',
  },
  {
    id: 'listingKids',
    label: 'kids',
    path: '/product/listing/kids',
  },
];

export const ADMIN_NAV_OPTIONS: NavOptions[] = [
  {
    id: 'adminListing',
    label: 'Manage All Products',
    path: '/admin-view/all-products',
  },
  {
    id: 'adminNewProduct',
    label: 'Add New Product',
    path: '/admin-view/add-product',
  },
];

export const REGISTRATION_FORM_CONTROLS: FormControlFields[] = [
  {
    id: 'name',
    type: 'text',
    placeholder: 'Enter your name',
    label: 'Name',
    componentType: 'input',
  },
  {
    id: 'email',
    type: 'email',
    placeholder: 'Enter your email',
    label: 'Email',
    componentType: 'input',
  },
  {
    id: 'password',
    type: 'password',
    placeholder: 'Enter your password',
    label: 'Password',
    componentType: 'input',
  },
  {
    id: 'role',
    placeholder: '',
    label: 'Role',
    componentType: 'select',
    options: [
      {
        value: 'admin',
        label: 'Admin',
      },
      {
        value: 'customer',
        label: 'customer',
      },
    ],
  },
];

export const LOGIN_FORM_CONTROLS: FormControlFields[] = [
  {
    id: 'email',
    type: 'email',
    placeholder: 'Enter your email',
    label: 'Email',
    componentType: 'input',
  },
  {
    id: 'password',
    type: 'password',
    placeholder: 'Enter your password',
    label: 'Password',
    componentType: 'input',
  },
];

export const ADMIN_PRODUCT_FORM_CONTROLS: FormControlFields[] = [
  {
    id: 'name',
    type: 'text',
    placeholder: 'Enter name',
    label: 'Name',
    componentType: 'input',
  },
  {
    id: 'price',
    type: 'number',
    placeholder: 'Enter price',
    label: 'Price',
    componentType: 'input',
  },
  {
    id: 'description',
    type: 'text',
    placeholder: 'Enter description',
    label: 'Description',
    componentType: 'input',
  },
  {
    id: 'category',
    placeholder: '',
    label: 'Category',
    componentType: 'select',
    options: [
      {
        value: 'men',
        label: 'Men',
      },
      {
        value: 'women',
        label: 'Women',
      },
      {
        value: 'kids',
        label: 'Kids',
      },
    ],
  },
  {
    id: 'deliveryInfo',
    type: 'text',
    placeholder: 'Enter deliveryInfo',
    label: 'Delivery Info',
    componentType: 'input',
  },
  {
    id: 'onSale',
    placeholder: '',
    label: 'On Sale',
    componentType: 'select',
    options: [
      {
        value: 'yes',
        label: 'Yes',
      },
      {
        value: 'no',
        label: 'No',
      },
    ],
  },
  {
    id: 'priceDrop',
    type: 'number',
    placeholder: 'Enter Price Drop',
    label: 'Price Drop',
    componentType: 'input',
  },
];

export const AVAILABLE_SIZES: Options[] = [
  {
    value: 's',
    label: 'S',
  },
  {
    value: 'm',
    label: 'M',
  },
  {
    value: 'l',
    label: 'L',
  },
];

export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyDnKp1FJBBLFEXZ2DG9rM07UHe3HShN1bo',
  authDomain: 'e-comerce-6df7e.firebaseapp.com',
  projectId: 'e-comerce-6df7e',
  storageBucket: 'e-comerce-6df7e.appspot.com',
  messagingSenderId: '599059974366',
  appId: '1:599059974366:web:7beb539178400dee645a4f',
  measurementId: 'G-L9CWBXFFZE',
};

export const FIREBASE_STORAGE_URL = 'gs://e-comerce-6df7e.appspot.com';
