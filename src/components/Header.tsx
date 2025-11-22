const Header = () => {
  return (
    <header
      className="relative top-0 left-0 right-0 z-[100] 
      py-5 bg-gradient-to-b 
    from-black/70 via-black/30 to-transparent"
    >
      <div className="flex justify-between items-center px-10">
        <div className="flex-shrink-0">
          <h1 className="text-xl lg:text-4xl font-bold text-red-600">
            CineFlow
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
