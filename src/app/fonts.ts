import { Montserrat, Press_Start_2P } from 'next/font/google';
import localFont from 'next/font/local';

export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const pressStart = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-press-start',
});

export const brunson = localFont({
  src: './fonts/Brunson.ttf', 
  display: 'swap',
  variable: '--font-brunson',
});