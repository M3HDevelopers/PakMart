import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { products } from '../data/mockData';

export function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Wishlist ({wishlist.length})</h1>
      {wishlistProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {wishlistProducts.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <Link to={`/product/${product.slug}`}>
                <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover" />
              </Link>
              <div className="p-3">
                <Link to={`/product/${product.slug}`} className="text-sm font-medium line-clamp-2 hover:text-orange-600">{product.name}</Link>
                <p className="text-orange-600 font-bold mt-1">Rs. {product.price.toLocaleString()}</p>
                {product.originalPrice > product.price && <p className="text-xs text-gray-400 line-through">Rs. {product.originalPrice.toLocaleString()}</p>}
                <div className="flex gap-2 mt-3">
                  <button onClick={() => addToCart(product)} className="flex-1 flex items-center justify-center gap-1 py-2 bg-orange-600 text-white text-xs rounded-lg hover:bg-orange-700">
                    <ShoppingCart size={12} /> Add to Cart
                  </button>
                  <button onClick={() => toggleWishlist(product.id)} className="p-2 border border-red-200 text-red-500 rounded-lg hover:bg-red-50">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Heart size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Your Wishlist is Empty</h2>
          <p className="text-gray-500 mb-4">Save your favorite items to buy them later.</p>
          <Link to="/" className="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700">Start Shopping</Link>
        </div>
      )}
    </div>
  );
}
