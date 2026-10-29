import { useParams, Link } from 'react-router-dom';
import { Star, Package, Users, Heart, MapPin, Clock, Shield } from 'lucide-react';
import { products } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../store/useStore';

export function StorePage() {
  const { slug } = useParams();
  const { user } = useStore();
  
  // Find products by seller
  const storeProducts = products.filter(p => p.sellerId === 's1' || p.seller === 'TechZone Pakistan');
  const store = {
    name: 'TechZone Pakistan',
    description: 'Your trusted source for the latest electronics and gadgets in Pakistan. We offer genuine products with warranty and excellent after-sales service.',
    rating: 4.8,
    productCount: storeProducts.length,
    followers: 5200,
    joinedDate: 'June 2023',
    responseRate: 95,
    shipOnTime: 92,
    location: 'Islamabad, Pakistan',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Store Header */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
        <div className="h-32 bg-gradient-to-r from-orange-500 to-red-500"></div>
        <div className="px-6 pb-6 -mt-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            <div className="w-20 h-20 bg-white rounded-xl shadow-lg flex items-center justify-center text-3xl font-bold text-orange-600 border-4 border-white">
              {store.name[0]}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">{store.name}</h1>
              <p className="text-sm text-gray-500">{store.description}</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700">
              <Heart size={16} /> Follow Store
            </button>
          </div>
          <div className="flex flex-wrap gap-6 mt-4 text-sm">
            <div className="flex items-center gap-1"><Star size={14} className="fill-yellow-400 text-yellow-400" /><span className="font-medium">{store.rating}</span><span className="text-gray-500">Rating</span></div>
            <div className="flex items-center gap-1"><Package size={14} className="text-gray-400" /><span className="font-medium">{store.productCount}</span><span className="text-gray-500">Products</span></div>
            <div className="flex items-center gap-1"><Users size={14} className="text-gray-400" /><span className="font-medium">{store.followers.toLocaleString()}</span><span className="text-gray-500">Followers</span></div>
            <div className="flex items-center gap-1"><Clock size={14} className="text-gray-400" /><span className="text-gray-500">Joined {store.joinedDate}</span></div>
            <div className="flex items-center gap-1"><MapPin size={14} className="text-gray-400" /><span className="text-gray-500">{store.location}</span></div>
          </div>
          <div className="flex gap-4 mt-3">
            <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
              <Shield size={12} /> {store.responseRate}% Response Rate
            </div>
            <div className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
              <Package size={12} /> {store.shipOnTime}% On-Time Shipping
            </div>
          </div>
        </div>
      </div>

      {/* Store Products */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Products ({storeProducts.length})</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {storeProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
