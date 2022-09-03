import Header from "../components/Homepage/Header";
import Main from "../components/Homepage/Main";
import Layout from "../components/UI/Layout";
import GuestGuard from "../guards/GuestGuard";

function HomePage() {
  return (
    <GuestGuard>
      <Layout>
        <Header />
        <Main />
      </Layout>
    </GuestGuard>
  );
}

export default HomePage;
