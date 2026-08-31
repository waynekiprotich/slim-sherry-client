import ProductCard from './ProductCard';

const fadeStyle = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.4s ease-out forwards;
  }
`;
function ProductSkeleton() {
  return (
    <article className="border border-outline-variant bg-surface flex flex-col h-full rounded-none animate-pulse">
      <div className="relative w-full pt-[120%] bg-surface-variant border-b border-outline-variant"></div>
      <div className="p-4 flex flex-col flex-grow gap-2">
        <div className="h-6 bg-surface-variant w-3/4 rounded-sm"></div>
        <div className="h-3 bg-surface-variant w-1/2 rounded-sm mb-4"></div>
        <div className="mt-auto flex flex-col gap-4">
          <div className="h-5 bg-surface-variant w-1/3 rounded-sm"></div>
          <div className="w-full h-[46px] bg-surface-variant rounded-none border border-outline-variant"></div>
        </div>
      </div>
    </article>
  );
}

export default function ProductGrid({ products = [], loading = false }) {
  if (loading) {
    return (
      <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full animate-fade-in">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-gutter-mobile gap-y-12 md:gap-x-gutter-desktop md:gap-y-16">
          {[...Array(4)].map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (!products.length) {
    return (
      <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center w-full">
        <p className="font-body-md text-on-surface-variant">No products found.</p>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full animate-fade-in">
      <style>{fadeStyle}</style>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-gutter-mobile gap-y-12 md:gap-x-gutter-desktop md:gap-y-16">
        {products.map((product, index) => (
          <div key={product.id || product.slug || Math.random()} className="animate-fade-in w-full" style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      {products.length >= 12 && (
        <div className="mt-16 text-center">
          <button className="border-b-2 border-on-surface font-label-sm text-label-sm uppercase pb-1 min-h-[44px] hover:bg-on-surface/90 active:scale-[0.98] transition-all duration-200">Load More Items</button>
        </div>
      )}
    </section>
  );
}
