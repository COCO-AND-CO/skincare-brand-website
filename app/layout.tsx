import React from "react"
import type { Metadata, Viewport } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { UnlockListener } from "@/components/UnlockListener"
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-dm-sans'
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair'
});

export const metadata: Metadata = {
  title: 'COCO&CO | Pure Handmade Natural Soaps',
  description: 'Discover COCO&CO\'s collection of 100% handmade natural soaps crafted with love and nature. Chemical-free, skin-safe, and made with real ingredients for healthy, glowing skin.',
  keywords: 'natural soap, handmade soap, organic soap, ayurvedic soap, chemical-free soap, skin care, India',
  authors: [{ name: 'COCO&CO' }],
  openGraph: {
    title: 'COCO&CO | Pure Handmade Natural Soaps',
    description: 'Discover 100% handmade natural soaps crafted with love and nature.',
    type: 'website',
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2D4A3E',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <UnlockListener />
        <Analytics />
      </body>
    </html>
  )
}
