import Navigation from "../../components/Navigation/Navigation";

export default function Layout({ children }) {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
}
