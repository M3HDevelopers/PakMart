import { Link } from 'react-router-dom';
import { Heart, Star, Truck, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

interface Props {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: Props) {
  const { toggleWishlist, isInWishlist, addToCart } = useStore();
  const inWishlist = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.2 }}
      className="bg-white border border-[var(--color-border)] group relative"
    >
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-44 sm:h-52 object-cover group-hover:scale-[1.02] transition-transform duration-300"
            loading="lazy"
          />
        </Link>
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.discount > 0 && (
            <span className="bg-[#B7D92B] text-[#171717] text-[10px] px-1.5 py-0.5 font-bold tracking-wide">-{product.discount}%</span>
          )}
          {product.isNew && (
            <span className="bg-[#171717] text-[#B7D92B] text-[10px] px-1.5 py-0.5 font-bold tracking-wide">NEW</span>
          )}
          {product.sponsored && (
            <span className="bg-[#737373] text-white text-[10px] px-1.5 py-0.5 font-medium">AD</span>
          )}
        </div>
        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
          className="absolute top-2 right-2 w-7 h-7 bg-white border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-accent)] transition-colors"
          aria-label="Add to wishlist"
        >
          <Heart size={13} className={inWishlist ? 'fill-[var(--color-danger)] text-[var(--color-danger)]' : 'text-[var(--color-text-muted)]'} />
        </button>
        {/* Free Shipping */}
        {product.freeShipping && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-[#171717] text-[#B7D92B] text-[10px] px-1.5 py-0.5 font-bold">
            <Truck size={10} />
            Free Shipping
          </div>
        )}
      </div>
      <div className="p-3">
        <Link to={`/product/${product.slug}`}>
          <h3 className="text-xs font-medium text-[var(--color-text)] line-clamp-2 hover:text-[var(--color-accent)] transition-colors min-h-[2rem] leading-relaxed">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1.5 flex items-center gap-1">
          <div className="flex items-center gap-px">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} className={i < Math.floor(product.rating) ? 'fill-[var(--color-warning)] text-[var(--color-warning)]' : 'text-[var(--color-border)]'} />
            ))}
          </div>
          <span className="text-[10px] text-[var(--color-text-muted)]">({product.reviewCount})</span>
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-sm font-semibold text-[var(--color-text)]">Rs. {product.price.toLocaleString()}</span>
          {product.originalPrice > product.price && (
            <span className="text-[10px] text-[var(--color-text-muted)] line-through">Rs. {product.originalPrice.toLocaleString()}</span>
          )}
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {product.verified && (
              <span className="flex items-center gap-0.5 text-[10px] text-[var(--color-info)]">
                <ShieldCheck size={10} /> Verified
              </span>
            )}
          </div>
          <span className="text-[10px] text-[var(--color-text-muted)]">{product.sold} sold</span>
        </div>
        <button
          onClick={() => addToCart(product)}
          className="mt-2.5 w-full py-2 bg-[#171717] text-[#B7D92B] text-[11px] font-bold hover:bg-[#B7D92B] hover:text-[#171717] transition-colors opacity-0 group-hover:opacity-100"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
