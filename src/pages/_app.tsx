import { ThemeProvider } from 'next-themes';
import { CookiesProvider } from 'react-cookie';
import { AppProps } from 'next/app';
import Link from 'next/link';
import { Navigation } from '~/components/Navigation';
import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider storageKey="preferred-theme" attribute="class">
			<CookiesProvider>
				<div>
					<Toaster position="bottom-left" />
				</div>
				<Navigation />
				<div className="container mx-auto px-4 pt-6">
					<Component {...pageProps} />
				</div>
				<footer className="footer footer-center p-4 text-base-content">
					<div>
						<p>
							Copyright © {new Date().getFullYear()} - All right reserved by{' '}
							<Link href="https://twitter.com/benhdev_" target="_blank">
								@benhdev_
							</Link>
						</p>
					</div>
				</footer>
			</CookiesProvider>
		</ThemeProvider>
	);
}

export default App;
