import "./globals.css";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import { UserProvider } from "./store/UserContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Header />
          {children && <div className="p-6 bg-slate-800">{children}</div>}
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
