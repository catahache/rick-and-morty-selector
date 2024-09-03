import React from 'react';
import "../styles/globals.css";
import { Permanent_Marker, ABeeZee } from 'next/font/google';

const permanentMarker = Permanent_Marker({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-permanent-marker',
});

const abeezee = ABeeZee({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-abeezee',
});

export const metadata = {
  title: 'Rick and Morty App',
  description: 'App to explore Rick and Morty characters and episodes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${permanentMarker.variable} ${abeezee.variable}`}>
      <body className={abeezee.className}>{children}</body>
    </html>
  );
}