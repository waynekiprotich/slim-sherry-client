import { Link } from 'react-router-dom';

export default function CategoryFilter({ categories = [], currentCategory = null, resultCount = 0, onFilterClick }) {
  const activeClass = "snap-start whitespace-nowrap font-label-sm text-label-sm uppercase text-secondary border-b-2 border-secondary pb-1 px-1";
  const inactiveClass = "snap-start whitespace-nowrap font-label-sm text-label-sm uppercase text-on-surface-variant hover:text-secondary transition-colors pb-1 px-1";

  return (
    <section className="sticky top-0 z-40 bg-surface border-b border-outline-variant py-4 px-margin-mobile md:px-margin-desktop w-full">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row gap-4 items-center justify-between w-full">
        <div className="w-full md:w-1/3 relative">
          <input className="w-full border border-on-surface bg-transparent py-3 px-4 pl-10 font-label-sm text-label-sm focus:border-secondary focus:ring-0 rounded-none transition-colors duration-250 outline-none" placeholder="Search bags..." type="text"/>
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{ fontVariationSettings: "'wght' 300" }}>search</span>
        </div>
        <div className="w-full md:w-auto flex overflow-x-auto pb-2 md:pb-0 gap-6 no-scrollbar snap-x">
          <Link to="/shop" className={!currentCategory ? activeClass : inactiveClass}>All</Link>
          {categories.map(category => (
            <Link 
              key={category.id} 
              to={`/shop?category=${category.id}`} 
              className={currentCategory == category.id ? activeClass : inactiveClass}
            >
              {category.name}
            </Link>
          ))}
        </div>
        <div className="w-full md:w-auto flex justify-between md:justify-end items-center gap-4">
          <span className="font-label-sm text-label-sm text-on-surface-variant">{resultCount} bag{resultCount !== 1 ? 's' : ''}</span>
          <button onClick={onFilterClick} className="flex items-center justify-center gap-2 border border-on-surface px-4 py-2 min-h-[44px] font-label-sm text-label-sm uppercase hover:bg-on-surface/90 active:scale-[0.98] transition-all duration-200 rounded-none cursor-pointer">
            <span className="material-symbols-outlined text-[18px]">tune</span>
            Filter
          </button>
        </div>
      </div>
    </section>
  );
}
