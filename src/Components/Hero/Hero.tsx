const Hero = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[60vh] flex items-center justify-center">{children}</div>
  );
};

export default Hero;
