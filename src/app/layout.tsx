import { Toaster } from 'react-hot-toast'
import Nav from './components/Nav'
import Provider from './components/Provider'
import QueryProvider from './components/queryProvider'
import './globals.css'

export const metadata = {
  title: 'Promptopia',
  description: 'Discover and share Prompts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* react query provider */}
        <QueryProvider>
          {/* next auth provider */}
          <Provider>
            <div className='main'>
              <div className='gradient'/>
            </div>
            <main className='app'>
              <Nav/>
              {children}
            </main>
            <Toaster/>
          </Provider>
        </QueryProvider>
      </body>
    </html>
  )
}
