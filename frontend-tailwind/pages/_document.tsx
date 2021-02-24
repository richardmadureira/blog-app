import Document, { Html, Head, Main, NextScript } from 'next/document'
export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="pt-BR">
                <Head>
                    <link rel="shortcut icon" href="https://192.168.100.43/blog/favicon.png" type="image/png" />
                    <meta name="description" content="Aplicação de Blog construída com NextJS" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}