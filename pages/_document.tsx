import { Html, Head, Main, NextScript } from 'next/document'
import { Analytics } from '@vercel/analytics/react';
export default function Document() {
  return (
    <Html lang="en">
      <Head title='e-hook'>
        <title>Multi transfer</title>
        <meta name="title" content="Multi transfer" />
        <meta name="description" content="Transfer multi-token, multi-amount to multi-addresses" />
        <meta name="keywords" content='Ethereum,Token, Crypto, Cryptocurrency, multi-transfer, transfer, hack' />
        <meta name="author" content="Oliver Zhang" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content='Multi transfer' />
        <meta name="twitter:description" content='Transfer multi-token, multi-amount to multi-addresses on multi-chain' />
        <meta name='twitter:image' content='https://e-hook.vercel.app/ethereum_monochromatic.svg' />
        <link rel="icon" href="/logo.svg" />
      </Head>

      <body className='flex flex-col'>
        <Main />
        <NextScript />
        <Analytics />
      </body>
    </Html>
  )
}
