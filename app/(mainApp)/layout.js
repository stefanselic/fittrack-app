import AppNavigation from '../_components/Navigation/AppNavigation';

export default function AppLayout({
  children, // will be a page or nested layout
}) {
  return (
    <>
      <main>{children}</main>
      <AppNavigation />
    </>
  );
}
