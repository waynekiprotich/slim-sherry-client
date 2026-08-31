export default function Footer() {
  return (
    <footer className="bg-surface-container-highest dark:bg-inverse-surface border-t border-outline dark:border-outline-variant w-full bottom-0 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-12 gap-8 max-w-container-max mx-auto">
        <span className="font-headline-md text-2xl md:text-headline-md text-on-surface dark:text-inverse-on-surface font-bold tracking-widest text-center md:text-left">
          SLIM SHERRY
        </span>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 w-full md:w-auto">
          <a className="font-label-sm text-label-sm text-on-surface-variant hover:underline transition-all uppercase" href="#">Instagram</a>
          <a className="font-label-sm text-label-sm text-on-surface-variant hover:underline transition-all uppercase" href="#">WhatsApp</a>
          <a className="font-label-sm text-label-sm text-on-surface-variant hover:underline transition-all uppercase" href="#">Email</a>
          <a className="font-label-sm text-[10px] md:text-label-sm text-on-surface-variant hover:underline transition-all uppercase" href="#">Privacy Policy</a>
        </div>
        <span className="font-body-md text-sm md:text-body-md text-on-surface-variant text-center md:text-right">
          © 2024 SLIM SHERRY. HIGH FASHION CURATION.
        </span>
      </div>
    </footer>
  );
}
