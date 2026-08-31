export default function Contact() {
  return (
    <section className="bg-primary-container border-y border-outline-variant py-16 md:py-24 w-full overflow-hidden">
      <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left w-full md:w-auto">
          <h2 className="font-display-lg text-3xl md:text-display-lg text-on-surface mb-4">Get in Touch</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto md:mx-0">Have a question about a specific piece or need help styling? Our concierges are ready to assist you.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="material-symbols-outlined text-secondary text-3xl mb-2">call</span>
            <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">Phone / WhatsApp</span>
            <a className="font-body-lg text-body-lg font-bold text-on-surface hover:text-secondary transition-colors" href="tel:+254700000000">+254 700 000 000</a>
          </div>
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="material-symbols-outlined text-secondary text-3xl mb-2">mail</span>
            <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">Email</span>
            <a className="font-body-lg text-body-lg font-bold text-on-surface hover:text-secondary transition-colors" href="mailto:hello@slimsherry.com">hello@slimsherry.com</a>
          </div>
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="material-symbols-outlined text-secondary text-3xl mb-2">photo_camera</span>
            <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">Instagram</span>
            <a className="font-body-lg text-body-lg font-bold text-on-surface hover:text-secondary transition-colors" href="#">@slimsherry.ke</a>
          </div>
        </div>
      </div>
    </section>
  );
}
