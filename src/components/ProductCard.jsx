export default function ProductCard({ product }) {
  const { name, price, currency, note, images } = product;
  const image_url = images && images.length > 0 ? images[0].image_url : '';
  const displayPrice = `${currency || 'KES'} ${price}`;
  
  return (
    <article className="group border border-on-surface bg-surface flex flex-col h-full hover:custom-shadow hover:-translate-y-1 transition-all duration-250 rounded-none relative w-full">
      <div className="relative w-full pt-[120%] overflow-hidden bg-surface-container-low border-b border-on-surface">
        <img 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          alt={name}
          src={image_url || 'https://via.placeholder.com/300x400?text=No+Image'}
        />
        <div className="absolute inset-0 bg-on-surface/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <button className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 bg-surface/90 backdrop-blur-sm text-on-surface border border-on-surface font-label-sm text-label-sm uppercase px-6 py-3 min-h-[44px] rounded-none hover:bg-on-surface/90 active:scale-[0.98] transition-all duration-200 cursor-pointer whitespace-nowrap">Quick View</button>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-headline-md text-lg md:text-headline-md text-on-surface mb-1 leading-tight line-clamp-2">{name}</h3>
        <p className="font-label-sm text-[10px] md:text-label-sm text-on-surface-variant uppercase mb-4">{note}</p>
        <div className="mt-auto flex flex-col gap-3 md:gap-4">
          <span className="font-body-lg text-base md:text-body-lg font-bold text-on-surface">{displayPrice}</span>
          <button className="w-full bg-primary-container text-on-surface border border-on-surface font-label-sm text-[10px] md:text-label-sm uppercase py-3 min-h-[44px] hover:bg-on-surface/90 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 rounded-none cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">chat</span>
            <span className="hidden md:inline">Order via WhatsApp</span>
            <span className="md:hidden">Order</span>
          </button>
        </div>
      </div>
    </article>
  );
}
