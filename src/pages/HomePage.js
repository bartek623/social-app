import GuestGuard from "../guards/GuestGuard";

function HomePage() {
  return (
    <GuestGuard>
      <div>HomePage</div>
    </GuestGuard>
  );
}

export default HomePage;
