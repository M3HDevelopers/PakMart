import { Link } from 'react-router-dom';
import { Heart, Star, Truck, Shield } from 'lucide-react';
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100"
    >
      <div className="relative">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.discount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded font-medium">-{product.discount}%</span>
          )}
          {product.isNew && (
            <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded font-medium">NEW</span>
          )}
          {product.sponsored && (
            <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded font-medium">Sponsored</span>
          )}
        </div>
        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
          className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-red-50 transition-colors"
        >
          <Heart size={16} className={inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
        </button>
        {/* Free Shipping */}
        {product.freeShipping && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded">
            <Truck size={12} />
            Free Shipping
          </div>
        )}
      </div>
      <div className="p-3">
        <Link to={`/product/${product.slug}`}>
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 hover:text-orange-600 transition-colors min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center gap-1">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
          <span className="text-xs text-gray-400 ml-auto">{product.sold} sold</span>
        </div>
        <div className="mt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-orange-600">Rs. {product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-400 line-through">Rs. {product.originalPrice.toLocaleString()}</span>
            )}
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          {product.verified && (
            <span className="flex items-center gap-0.5 text-xs text-blue-600">
              <Shield size={10} /> Verified
            </span>
          )}
          <span className="text-xs text-gray-400">{product.seller}</span>
        </div>
        <button
          onClick={() => addToCart(product)}
          className="mt-3 w-full py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors opacity-0 group-hover:opacity-100"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
