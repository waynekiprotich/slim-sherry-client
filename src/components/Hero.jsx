export default function Hero() {
  return (
    <section className="relative w-full h-[500px] md:h-[716px] flex items-center justify-center text-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        data-alt="A highly stylized, editorial photograph of a premium, structured leather handbag resting on a polished marble surface. The lighting is dramatic, high-contrast, casting a soft, warm champagne-gold glow across the bag, highlighting its exquisite craftsmanship and hardware. The background features a pristine, soft blush pearl tone, creating a luxurious and aspirational atmosphere." 
        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAup-Bt2GxMASzErkwGyn9k8QDF5flTuxFgG0LwmSP6IG5X77Rm7HHygyw1CN65bk6I-5rTrb9OB9hp8tiQLoCGy7G5iHBEfbZDOydW-58_MT8IFuU_xeF4va97GzqLr7AUoLAQc1oPqCMPlo4bxSn3fmi5R7uOQVqhCxdT95PyIbRaFccbxxW92-WFPlzDcDjp4J5I13xQZ0EYkHaf6wHcKZ_cDW_adsC6XPcycPXjuADXDE87Nmep')" }}
      >
        <div className="absolute inset-0 bg-primary-container/60 backdrop-blur-[2px]"></div>
      </div>
      <div className="relative z-10 px-6 md:px-margin-desktop max-w-container-max mx-auto flex flex-col items-center gap-4 md:gap-6 w-full">
        <h1 className="font-display-lg text-5xl md:text-display-lg text-on-surface px-4">Slim Sherry</h1>
        <p className="font-headline-md text-2xl md:text-headline-md text-on-surface-variant max-w-2xl px-4">Quality you can feel. Style you can flaunt.</p>
        <p className="font-label-sm text-[10px] md:text-label-sm leading-relaxed text-on-surface-variant tracking-wider uppercase mt-2 md:mt-4 mb-2 max-w-md md:max-w-none px-4">
            Premium Handbags &amp; Accessories · Secure Delivery Across Kenya · 100% Customer Satisfaction
        </p>
        <button className="bg-secondary text-on-secondary font-label-sm text-label-sm uppercase px-8 py-4 min-h-[44px] tracking-widest hover:bg-on-surface/90 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 rounded-none cursor-pointer w-[90%] md:w-auto">
          <span className="material-symbols-outlined text-lg">chat</span>
          Order on WhatsApp
        </button>
      </div>
    </section>
  );
}
