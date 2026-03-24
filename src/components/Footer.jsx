const Footer = () => {
  return (
    <footer className="bg-base-200 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center">
        <p className="text-2xl font-semibold">Nababi Mart</p>
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;