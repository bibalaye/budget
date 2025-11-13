import './globals.css';

export const metadata = {
  title: 'Budget Personnel',
  description: 'Gérez votre budget personnel facilement et efficacement',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
