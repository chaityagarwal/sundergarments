import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Layout({ children }) {
  return (
    <main>
      <Header />
      <section className="min-h-screen">{children}</section>
      <Footer />
    </main>
  );
}