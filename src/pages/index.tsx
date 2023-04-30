import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {
    AuthType,
    SismoConnectButton,
    SismoConnectClientConfig,
    SismoConnectResponse
} from "@sismo-core/sismo-connect-react";

const inter = Inter({ subsets: ['latin'] })

const sismoConnectConfig: SismoConnectClientConfig = {
    appId: "0xd083e52833d6f2843a85a2a1650a789a" //
};

export default function Home() {
  return (
    <>
      <Head>
        <title>sismo-web</title>
        <meta name="description" content="sismo-web" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <SismoConnectButton
            config={sismoConnectConfig} //
            auths={[{authType:AuthType.VAULT}]}
            onResponse={(response: SismoConnectResponse) => {
                console.log(response);
            }}
        />
      </main>
    </>
  )
}
