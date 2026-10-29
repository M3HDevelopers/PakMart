import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Star, Heart, ShoppingCart, Truck, ShieldCheck, RotateCcw, Share2, Minus, Plus, Check, ChevronRight, ThumbsUp } from 'lucide-react';
import { products, mockReviews } from '../data/mockData';
import { useStore } from '../store/useStore';
import { ProductCard } from '../components/ProductCard';
import { motion } from 'framer-motion';

export function ProductDetail() {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);
  const { addToCart, toggleWishlist, isInWishlist, addRecentlyViewed } = useStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
        <Link to="/" className="text-orange-600 hover:underline mt-4 inline-block">Go to Homepage</Link>
      </div>
    );
  }

  addRecentlyViewed(product.id);
  const inWishlist = isInWishlist(product.id);
  const reviews = mockReviews.filter(r => r.productId === product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 5);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-orange-600">Home</Link>
        <ChevronRight size={14} />
        <Link to={`/category/${product.category}`} className="hover:text-orange-600 capitalize">{product.category}</Link>
        <ChevronRight size={14} />
        <span className="text-gray-800 truncate">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative bg-white border border-[var(--color-border)] overflow-hidden aspect-square">
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.discount > 0 && (
              <span className="absolute top-3 left-3 bg-[var(--color-danger)] text-white px-2 py-0.5 text-xs font-semibold">-{product.discount}%</span>
            )}
            <button onClick={() => toggleWishlist(product.id)} className="absolute top-3 right-3 w-8 h-8 bg-white border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-accent)]">
              <Heart size={16} className={inWishlist ? 'fill-[var(--color-danger)] text-[var(--color-danger)]' : 'text-[var(--color-text-muted)]'} />
            </button>
          </div>
          <div className="flex gap-2">
            {product.images.map((img, i) => (
              <button key={i} onClick={() => setSelectedImage(i)} className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${i === selectedImage ? 'border-orange-600' : 'border-gray-200'}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-orange-600 font-medium mb-1">{product.brand}</p>
            <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} />
              ))}
            </div>
            <span className="text-sm text-gray-600">{product.rating.toFixed(1)} ({product.reviewCount} reviews)</span>
            <span className="text-sm text-gray-400">|</span>
            <span className="text-sm text-green-600">{product.sold}+ sold</span>
          </div>

          {/* Price */}
          <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-[var(--color-text)]">Rs. {product.price.toLocaleString()}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-sm text-[var(--color-text-muted)] line-through">Rs. {product.originalPrice.toLocaleString()}</span>
                  <span className="bg-[var(--color-danger)] text-white px-1.5 py-0.5 text-[10px] font-semibold">Save Rs. {(product.originalPrice - product.price).toLocaleString()}</span>
                </>
              )}
            </div>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">Inclusive of all taxes</p>
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2">
            {product.stock > 0 ? (
              <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                <Check size={16} /> In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-red-600 text-sm font-medium">Out of Stock</span>
            )}
          </div>

          {/* Shipping Info */}
          <div className="space-y-3 border-t border-b py-4">
            <div className="flex items-center gap-3">
              <Truck size={20} className="text-gray-500" />
              <div>
                <p className="text-sm font-medium">Free Delivery</p>
                <p className="text-xs text-gray-500">Estimated delivery: 2-4 business days</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw size={20} className="text-gray-500" />
              <div>
                <p className="text-sm font-medium">7 Days Easy Returns</p>
                <p className="text-xs text-gray-500">Change of mind returns available</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck size={20} className="text-[var(--color-text-muted)]" />
              <div>
                <p className="text-sm font-medium">100% Genuine Product</p>
                <p className="text-xs text-gray-500">Verified seller with warranty</p>
              </div>
            </div>
          </div>

          {/* Seller */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
              {product.seller[0]}
            </div>
            <div>
              <Link to={`/seller/store/${product.sellerId}`} className="font-medium text-sm hover:text-orange-600">{product.seller}</Link>
              <p className="text-xs text-gray-500">Positive Seller Rating: 95%</p>
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-[var(--color-border)]">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-[var(--color-bg-tertiary)]"><Minus size={14} /></button>
              <span className="px-4 py-2 text-sm font-medium border-x border-[var(--color-border)]">{quantity}</span>
              <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="px-3 py-2 hover:bg-[var(--color-bg-tertiary)]"><Plus size={14} /></button>
            </div>
            <button onClick={handleAddToCart} disabled={product.stock === 0} className="flex-1 flex items-center justify-center gap-2 bg-[var(--color-accent)] text-white py-2.5 text-sm font-medium hover:bg-[var(--color-accent-hover)] disabled:bg-[var(--color-border)] disabled:text-[var(--color-text-muted)] transition-colors">
              <ShoppingCart size={16} />
              {addedToCart ? 'Added!' : 'Add to Cart'}
            </button>
          </div>
          <Link to="/checkout" className="block w-full text-center bg-[var(--color-text)] text-white py-2.5 text-sm font-medium hover:bg-[var(--color-text-secondary)] transition-colors">
            Buy Now
          </Link>

          {/* Share */}
          <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-orange-600">
            <Share2 size={16} /> Share this product
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10">
        <div className="flex border-b">
          {['description', 'specifications', 'reviews'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-3 text-sm font-medium capitalize border-b-2 transition-colors ${activeTab === tab ? 'border-orange-600 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              {tab} {tab === 'reviews' && `(${product.reviewCount})`}
            </button>
          ))}
        </div>
        <div className="py-6">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
              <h3 className="font-bold text-gray-800 mt-4">Package Contents</h3>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                <li>1x {product.name}</li>
                <li>1x User Manual</li>
                <li>1x Warranty Card</li>
              </ul>
            </div>
          )}
          {activeTab === 'specifications' && (
            <div className="grid sm:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b">
                  <span className="text-gray-500 text-sm">{key}</span>
                  <span className="text-gray-800 text-sm font-medium">{value}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {reviews.length > 0 ? reviews.map(review => (
                <div key={review.id} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-sm font-medium text-orange-600">
                      {review.userName[0]}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{review.userName}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} size={12} className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} />)}</div>
                        {review.verified && <span className="text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded">Verified Purchase</span>}
                      </div>
                    </div>
                    <span className="ml-auto text-xs text-gray-400">{review.createdAt}</span>
                  </div>
                  <h4 className="font-medium text-sm">{review.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{review.comment}</p>
                  <button className="flex items-center gap-1 text-xs text-gray-500 mt-2 hover:text-orange-600">
                    <ThumbsUp size={12} /> Helpful ({review.helpful})
                  </button>
                </div>
              )) : (
                <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {relatedProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
