import '../globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { MainNav } from '@/components/main-nav';
import { ModeToggle } from '@/components/mode-toggle';
import { UserNav } from '@/components/user-nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'Moneo',
    template: "%s | Moneo",
  }
}

export default async function TransactionLayout({
  children,
  modal
}: {
  children: React.ReactNode,
  modal: React.ReactNode,
}) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="Moneo" />
      </head>
          <body className={inter.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
                <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <div className="flex h-16 items-center px-8">
                    <MainNav className="mx-6" />
                    <div className="ml-auto flex items-center space-x-4">
                      <ModeToggle />
                      <UserNav />
                    </div>
                  </div>
                </div>
                <main className="container mx-auto p-8 pt-12">
                  {modal}
                  {children}
                </main>
              </div>
            </ThemeProvider>
          </body>
        </html>
  );
}